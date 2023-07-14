import {  useSelector } from 'react-redux';
import './App.css'
import AuthWrapper from './common/AuthWrapper'
import Navbar from './common/Navbar';
import { Login } from './components/Login'
import Register from './components/Register'
import { Route, Routes, useNavigate } from "react-router";
import { useEffect } from 'react';

function App() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();


  return (
    <div>

      <Routes>
        {user.name?<Route path="/inicio" element={<Navbar />} />:<Route path="/" element={<AuthWrapper />} />}
        
      </Routes>
    </div>
  );
}

export default App
