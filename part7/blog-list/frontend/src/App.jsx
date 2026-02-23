import { useEffect, useContext } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import UserContext from './UserContext';
import blogService from './services/blogs';

import Menu from './components/Menu';
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';

import Notification from './components/Notification';

import Home from './components/Home';

const App = () => {
  const { userDispatch } = useContext(UserContext);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: 'LOGIN', payload: user });
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      <Menu />

      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default App;
