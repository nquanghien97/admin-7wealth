import './App.css'
import { NotificationProvider } from './context/NotificationContext'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    document.title = "7Wealth Admin"
  }, []);

  return (
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  )
}

export default App
