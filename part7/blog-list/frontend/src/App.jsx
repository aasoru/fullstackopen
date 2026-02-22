import { Routes, Route, Link } from 'react-router-dom';

import Users from './components/Users';

import Notification from './components/Notification';

import Home from './components/Home';

const App = () => {
  return (
    <div>
      <div>
        <Link to="/">home</Link> | <Link to="/users">users</Link>
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  );
};

export default App;
