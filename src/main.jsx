import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Header/Navbar';
import Login from './pages/Login';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';

const App = () => {

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
