import axios from 'axios';
import { setProperties } from '../state/properties';
import { UserinitialState, setUser } from '../state/user';

export const fetchData=async(typeProperty, dispatch)=>{
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
}

export const fetchUserData = (dispatch) => {
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
        console.error('Error de servidor', error);
      });
  };

 export const handleLogout = (dispatch,navigate) => {
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
