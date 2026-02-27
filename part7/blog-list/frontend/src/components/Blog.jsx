import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import UserContext from '../UserContext';

import blogService from '../services/blogs';

const Blog = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const [newComment, setNewComment] = useState('');

  const { data: blog, isLoading } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getById(id),
    retry: false,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: blogService.destroy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: ({ id, comment }) => blogService.addComment(id, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
    },
  });

  if (isLoading) return <div>loading...</div>;
  if (!blog) return null;

  const handleLike = () => {
    updateMutation.mutate({
      id: blog.id,
      updatedBlog: {
        ...blog,
        likes: blog.likes + 1,
      },
    });
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title}?`))
      deleteMutation.mutate(blog.id);
  };

  const handleComment = (e) => {
    e.preventDefault();

    commentMutation.mutate({
      id: blog.id,
      comment: newComment,
    });

    setNewComment('');
  };

  return (
    <div>
      <div className="card">
        <div class="card-body">
          <h2 class="card-title">{blog.title}</h2>

          <div class="card-link">
            <a href={blog.url} target="_blank" rel="noreferrer">
              {blog.url}
            </a>
          </div>

          <p>
            {blog.likes} likes
            <button className="btn btn-primary" onClick={handleLike}>
              like
            </button>
          </p>

          <p>added by {blog.user?.name}</p>

          {blog.user?.id === user?.id && (
            <button className="btn btn-danger" onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div class="card-body">
          <h3>comments</h3>

          <form onSubmit={handleComment}>
            <input
              className="form-control"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              add comment
            </button>
          </form>

          <ul class="list-group">
            {blog.comments?.map((comment, index) => (
              <li key={index} class="list-group-item">
                {comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Blog;
