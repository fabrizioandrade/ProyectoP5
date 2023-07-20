import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UserinitialState, setUser } from '../state/user';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { setProperties } from '../state/properties';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [typeProperty, setTypeProperty] = useState(null);

  const fetchData = async () => {
    try {
      let url = "http://localhost:3000/api/properties/";

      if (typeProperty) {
        url = `http://localhost:3000/api/properties/status/${typeProperty}`;
      }

      const response = await axios.get(url);
      const sortedProperties= response.data.sort((a, b) => a.id - b.id);
      dispatch(setProperties(sortedProperties));
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [typeProperty]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users/me', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include',
      })
      .then((user) => {
        dispatch(setUser(user.data));
      })
      .catch((error) => {
        console.error('Error de servidor',error);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post('http://localhost:3000/api/users/logout', null, {
        withCredentials: true,
        credentials: 'include',
      })
      .then(() => {
        dispatch(setUser(UserinitialState));
        navigate('/');
      });
  };


  return (
    <nav className="navbar bg-red-500 p-4 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/home'}><div className="text-black transparent-text font-bold">HOD.</div></Link>
        <div className="space-x-4">
        <button onClick={()=>setTypeProperty(null)} className="text-white hover:text-gray-200">Descubre</button>
          <button onClick={()=>setTypeProperty('for_sale')}     className="text-white   focus:ring ">En venta</button>
          
          <button onClick={()=>setTypeProperty('for_rent')}  className="text-white hover:text-gray-200">En alquiler</button>
          {user.name ? (
            <>
              <button className="text-white hover:text-gray-200">Favoritos</button>
              <div className="relative inline-block text-left">
                <button
                  onClick={()=>setIsDropdownOpen(!isDropdownOpen)}
                  className="text-white hover:text-gray-200"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen ? 'true' : 'false'}
                >
                  Mi perfil
                </button>
                <div
                  className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${
                    isDropdownOpen ? 'block' : 'hidden'
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                    Ver perfil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    role="menuitem"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link to="/">
              <button className="text-white hover:text-gray-200">Iniciar sesión</button>
            </Link>
          )}
          <button className="text-white hover:text-gray-200">Contacto</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
