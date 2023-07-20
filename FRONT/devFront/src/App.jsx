import {  useSelector } from 'react-redux';
import './App.css'
import AuthWrapper from './common/AuthWrapper'
import { Route, Routes } from "react-router";
import Home from './components/Home';

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<AuthWrapper />} /> 
      </Routes>
    </div>
  );
}

export default App
