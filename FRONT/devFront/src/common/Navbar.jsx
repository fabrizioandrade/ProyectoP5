import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserinitialState, setUser } from '../state/user';
import { useNavigate } from 'react-router';
import '../styles/navbar.css'
const Navbar = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
const navigate=useNavigate()
    useEffect(() => {
        axios
          .get("http://localhost:3000/api/users/me", {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "include",
          })
          .then((user) => {
            dispatch(setUser(user.data));
          })
          .catch((error) => {
            // console.error("Error de servidor");
          });
      }, []);

      const handleLogout = () => {
        axios
          .post("http://localhost:3000/api/users/logout", null, {
            withCredentials: true,
            credentials: "include",
          })
          .then(() => {
            dispatch(setUser(UserinitialState));
            navigate('/')
          });
      };

  return (
<nav className="navbar bg-red-500 p-4">
  <div className="container mx-auto flex justify-between items-center">
    <div className="text-black transparent-text font-bold">HOD.</div>
    <div className="space-x-4">
      <button className="text-white hover:text-gray-200">En venta</button>
      <button className="text-white hover:text-gray-200">En alquiler</button>
      <button className="text-white hover:text-gray-200">Favoritos</button>
      <button className="text-white hover:text-gray-200">Mi perfil</button>
      <button className="text-white hover:text-gray-200">Contacto</button>
    </div>
  </div>
</nav>

  )
}

export default Navbar