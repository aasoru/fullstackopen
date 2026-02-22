import { useContext, useEffect, useState, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import UserContext from '../UserContext';
import NotificationContext from '../NotificationContext';

import Blog from './Blog';
import blogService from '../services/blogs';
import loginService from '../services/login';

import BlogForm from './BlogForm';
import LoginForm from './LoginForm';

import Togglable from './Togglable';

const Home = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { notificationDispatch } = useContext(NotificationContext);

  const blogFormRef = useRef();

  const queryClient = useQueryClient();

  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      userDispatch({ type: 'LOGIN', payload: user });
      setUsername('');
      setPassword('');

      // TOKEN
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (exception) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: 'Wrong username or password',
      });

      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' });
      }, 5000);
    }
  };

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

  const updateBlogMutation = useMutation({
    mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const likeBlog = (e, blog) => {
    e.preventDefault();

    updateBlogMutation.mutate({
      id: blog.id,
      updatedBlog: {
        ...blog,
        likes: blog.likes + 1,
      },
    });
  };

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.destroy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const deleteBlog = (e, blog) => {
    e.preventDefault();

    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlogMutation.mutate(blog.id);
    }
    return;
  };

  const loginForm = () => (
    <Togglable showButtonLabel="login" hideButtonLabel="cancel">
      <h2>Log in to application</h2>
      <LoginForm
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        username={username}
        password={password}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable
      showButtonLabel="new blog"
      hideButtonLabel="cancel"
      ref={blogFormRef}
    >
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  if (isLoading) return <div>loading data...</div>;

  return (
    <>
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div>
            <p>
              {user.name} logged-in{' '}
              <button
                onClick={() => {
                  userDispatch({ type: 'LOGOUT' });
                  window.localStorage.removeItem('loggedBlogappUser');
                  blogService.setToken(user.token);
                }}
              >
                logout
              </button>
            </p>
            {blogForm()}
          </div>
        </>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          handleLike={likeBlog}
          handleDelete={deleteBlog}
        />
      ))}
    </>
  );
};

export default Home;
