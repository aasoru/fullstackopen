import ReactDOM from 'react-dom/client';
import App from './App';
import { NotificationContextProvider } from './NotificationContext';

import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <NotificationContextProvider>
    <App />
  </NotificationContextProvider>
);
