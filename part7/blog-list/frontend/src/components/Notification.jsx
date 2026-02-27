import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const Notification = () => {
  const { notification } = useContext(NotificationContext);

  if (!notification) return null;

  return <div className="alert alert-primary my-2">{notification}</div>;
};

export default Notification;
