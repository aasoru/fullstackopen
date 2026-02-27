import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import UserContext from '../UserContext';
import NotificationContext from '../NotificationContext';

import blogService from '../services/blogs';

import BlogForm from './BlogForm';

import Togglable from './Togglable';

const Home = () => {
  const { user } = useContext(UserContext);
  const { notificationDispatch } = useContext(NotificationContext);

  const blogFormRef = useRef();

  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (returnedBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
      });
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
      blogFormRef.current.toggleVisibility();
    },
  });

  const addBlog = (blogObject) => newBlogMutation.mutate(blogObject);

  const blogForm = () => (
    <Togglable
      showButtonLabel="new blog"
      hideButtonLabel="cancel"
      ref={blogFormRef}
    >
      <div className="card">
        <BlogForm createBlog={addBlog} />
      </div>
    </Togglable>
  );

  if (isLoading) return <div>loading data...</div>;

  return (
    <>
      {user && <>{blogForm()}</>}

      <h2>blogs</h2>
      <div class="container text-center">
        {blogs.map((blog) => (
          <div className="blog card">
            <div className="card-body">
              <span className="blogTitle card-title">
                <Link to={`/blogs/${blog.id}`}>
                  <span className="blogTitle">{blog.title}</span>{' '}
                  <span className="blogAuthor">{blog.author}</span>
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
