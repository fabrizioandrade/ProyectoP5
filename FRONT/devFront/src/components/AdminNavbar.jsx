import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import userLogo from '../../public/assets/user.png' 
import axios from 'axios';
import { UserinitialState, setUser } from '../state/user';

const AdminNavbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();




  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  
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
    <nav className="navbar bg-blue-500 p-4 fixed top-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to={'/home'}>
          <div className="text-black transparent-text font-bold">HOD.</div>
        </Link>
        <div className="space-x-4"   onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}>
          <button
          
            onClick={handleDropdownToggle}
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            type="button"
          >
            <img
              className="w-8 h-8 rounded-full"
              src={userLogo}
              alt="user photo"
            />
          </button>

          <div
            className={`${
              isDropdownOpen ? 'block' : 'hidden'
            } z-10 absolute top-12 right-4 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            role="menu"
            aria-labelledby="dropdownAvatar"
          >
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>{user.name}</div>
              <div className="font-medium truncate">{user.email}</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownAvatar"
            >
              <li>
                
                <button
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                   <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 3.33782C15.5291 2.48697 13.8214 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22C17.5228 22 22 17.5228 22 12C22 10.1786 21.513 8.47087 20.6622 7" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
                 <span className='ml-2'style={{ whiteSpace: "nowrap" }}> Avisos contactados</span> 
                </button>
              </li>
              <li>
                <button
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22 22L2 22" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M4 22V9.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M20 9.5V13.5M20 22V17.5" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round"/>
<path d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z" stroke="#1C274C" stroke-width="1.5"/>
</svg>
                 <span className='ml-2'style={{ whiteSpace: "nowrap" }}>Publicar</span> 
                </button>
              </li>
              <li>
                <button
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 19.5L20 21M11 21H5.6C5.03995 21 4.75992 21 4.54601 20.891C4.35785 20.7951 4.20487 20.6422 4.10899 20.454C4 20.2401 4 19.9601 4 19.4V17.6841C4 17.0485 4 16.7306 4.04798 16.4656C4.27087 15.2344 5.23442 14.2709 6.46558 14.048C6.5425 14.0341 6.6237 14.0242 6.71575 14.0172C6.94079 14 7.05331 13.9914 7.20361 14.0026C7.35983 14.0143 7.4472 14.0297 7.59797 14.0722C7.74302 14.1131 8.00429 14.2315 8.52682 14.4682C9.13692 14.7446 9.8015 14.9218 10.5 14.9795M19 17.5C19 18.8807 17.8807 20 16.5 20C15.1193 20 14 18.8807 14 17.5C14 16.1193 15.1193 15 16.5 15C17.8807 15 19 16.1193 19 17.5ZM15 7C15 9.20914 13.2091 11 11 11C8.79086 11 7 9.20914 7 7C7 4.79086 8.79086 3 11 3C13.2091 3 15 4.79086 15 7Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                 <span className='ml-2'style={{ whiteSpace: "nowrap" }}> Busquedas </span> 
                </button>
              </li>
            </ul>
            <div className="py-2">
              <button onClick={handleLogout}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >
                 <span className='ml-2'style={{ whiteSpace: "nowrap" }}> Cerrar sesion</span> 
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
