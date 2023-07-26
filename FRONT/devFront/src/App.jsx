import './App.css'
import AuthWrapper from './common/AuthWrapper'
import { Route, Routes, useLocation } from "react-router";
import Navbar from './components/Navbar';
import PropertiesGrid from './components/PropertiesGrid';
import PropertyCard from './common/PropertyCard';
import CustomerView from './view/CustomerView';
import Favorites from './components/Favorites';
import AdminNavbar from './components/AdminNavbar';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Stats from './view/Stats';

function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user); 
  const [isUserVerified, setIsUserVerified] = useState(false);

  useEffect(() => {
    if (user.role === 'admin') {
      setIsUserVerified(true);
    }
    else{
      setIsUserVerified(false)
    }
  }, [user]);
  const showNavbar = location.pathname !== '/' 
  return (
    <div className='w-screen'>
 {showNavbar && (isUserVerified? <AdminNavbar />:<Navbar/>)}
      <Routes>
      <Route path={'/home'} element={user.role?<Stats/>:<PropertiesGrid/>}/>
      <Route path={'/home/property/:id'} element={<PropertyCard/>}/>
      <Route path={'/home/me/profile'} element={user.email? <CustomerView/>:<AuthWrapper/>}/>
     
        <Route path="/" element={<AuthWrapper />} /> 
      
        <Route path="/home/favorites" element={user.email?<Favorites />:<AuthWrapper/>} /> 

      </Routes>
    </div>
  );
}

export default App
