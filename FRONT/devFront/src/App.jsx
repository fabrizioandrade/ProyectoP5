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
import AdminCustomerView from './view/AdminCustomerView';
import UpdateUser from './common/UpdateUser';
import ProperitesForSale from './components/ProperitesForSale';
import PropertiesForRent from './components/PropertiesForRent';


function App() {
  const location = useLocation();
  const user = useSelector((state) => state.user); 
  const [isUserVerified, setIsUserVerified] = useState(false);
  const showNavbar = location.pathname !== '/' && location.pathname !== '/update'
  useEffect(() => {
    if (user.role === 'admin') {
      setIsUserVerified(true);
    }
    else{
      setIsUserVerified(false)
    }
  }, [user]);
 
  useEffect(() => {
    if (location.pathname === "/home") {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);



  return (
    <div className=''>
 {showNavbar && (isUserVerified? <AdminNavbar />:<Navbar/>)}
      <Routes>
      <Route path={'/home'} element={user.role==='admin'?<Stats/>:<PropertiesGrid />}/>
      <Route path={'/home/property/:id'} element={<PropertyCard/>}/>
      <Route path={'/home/me/profile'} element={user.email? <CustomerView/>:<AuthWrapper/>}/>
      <Route path={'/home/forSale'} element={<ProperitesForSale />}/>
      <Route path={'/home/forRent'} element={<PropertiesForRent/>}/>

        <Route path="/" element={<AuthWrapper />} /> 
      <Route path='/update' element={<UpdateUser/>}/>
        <Route path="/home/favorites" element={user.email?<Favorites />:<AuthWrapper/>} /> 
{user.role==='admin' && (
<>
<Route path='/home/user/:id' element={<AdminCustomerView/>}/>
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
