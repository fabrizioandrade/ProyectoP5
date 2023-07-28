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
import Search from './common/Search';
import AddProperty from './components/AddProperty';
import Appointments from './components/Appointments';


function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user); 
  const [isUserVerified, setIsUserVerified] = useState(false);
  const showNavbar = location.pathname !== '/' 

  useEffect(() => {
    if (user.role === 'admin') {
      setIsUserVerified(true);
    }
    else{
      setIsUserVerified(false)
    }
  }, [user]);


  return (
    <div className=''>
 {showNavbar && (isUserVerified? <AdminNavbar />:<Navbar/>)}
      <Routes>
      <Route path={'/home'} element={user.role==='admin'?<Stats/>:<PropertiesGrid/>}/>
      <Route path={'/home/property/:id'} element={<PropertyCard/>}/>
      <Route path={'/home/me/profile'} element={user.email? <CustomerView/>:<AuthWrapper/>}/>
     
        <Route path="/" element={<AuthWrapper />} /> 
      
        <Route path="/home/favorites" element={user.email?<Favorites />:<AuthWrapper/>} /> 
{user.role==='admin' && (
<>
<Route path='/home/search' element={<Search/>}/>
<Route path='home/admin/addProperty' element={<AddProperty/>}/>
<Route path='home/admin/appointments' element={<Appointments/>}/>
</>
) }



      </Routes>
    </div>
  );
}

export default App
