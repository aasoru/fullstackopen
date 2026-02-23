import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../UserContext';
import NotificationContext from '../NotificationContext';

import blogService from '../services/blogs';
import loginService from '../services/login';

import LoginForm from './LoginForm';
import Togglable from './Togglable';

const Home = () => {
  const { user, userDispatch } = useContext(UserContext);
  const { notificationDispatch } = useContext(NotificationContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <div>
      <Link to="/">blogs</Link> | <Link to="/users">users</Link> |{' '}
      {user === null ? (
        loginForm()
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Home;
