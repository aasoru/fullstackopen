import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import UserContext from '../UserContext';

import blogService from '../services/blogs';

const Blog = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);

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

  console.log(blog);
  console.log(user);

  return (
    <div>
      <h2>{blog.title}</h2>

      <p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </p>

      <p>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </p>

      <p>added by {blog.user?.name}</p>

      {blog.user?.id === user?.id && (
        <button onClick={handleDelete}>delete</button>
      )}
    </div>
  );
};

export default Blog;
