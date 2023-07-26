import './App.css'
import AuthWrapper from './common/AuthWrapper'
import { Route, Routes, useLocation } from "react-router";
import Navbar from './components/Navbar';
import PropertiesGrid from './components/PropertiesGrid';
import PropertyCard from './common/PropertyCard';
import CustomerView from './view/CustomerView';
import Favorites from './components/Favorites';

function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  return (
    <div className='w-screen'>
 {showNavbar && <Navbar />}
      <Routes>
      <Route path={'/home'} element={<PropertiesGrid/>}/>
      <Route path={'/home/property/:id'} element={<PropertyCard/>}/>
      <Route path={'/home/me/profile'} element={<CustomerView/>}/>
        <Route path="/" element={<AuthWrapper />} /> 
      
        <Route path="/home/favorites" element={<Favorites />} /> 

      </Routes>
    </div>
  );
}

export default App
