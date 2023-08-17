import React from 'react'
import ReactDOM from 'react-dom/client'
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Header/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import { useAtom } from 'jotai';
import { authAtom } from './atoms/authAtoms';
import Cookies from 'js-cookie';

const App = () => {

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  }

  const [userInfo, setUserInfo] = useAtom(authAtom);

  useEffect(() => {
    const userInfoCookie = Cookies.get('userInfoCookie')
    if (userInfoCookie) {
      const userInfo = JSON.parse(userInfoCookie)
      setUserInfo({
        isLoggedIn: true,
        token: userInfo.token,
        userId: userInfo.userId,
        username: userInfo.username
      });
    }
  }, []);

  return(
  <React.StrictMode>
    <Router>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:userId" element={<PublicProfile />} />
        </Routes>
    </Router>
  </React.StrictMode>
);
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
export default App
