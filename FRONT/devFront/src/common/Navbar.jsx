import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UserinitialState, setUser } from '../state/user';
import { useNavigate } from 'react-router';

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
<div>
{user.name && (
        <>
          <p>Bienvenido {user.name}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      )}
    </div>
  )
}

export default Navbar