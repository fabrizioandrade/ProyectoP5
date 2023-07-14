import React ,{useState} from 'react';
import logo from '../assets/logo.png'
import { setUser } from '../state/user';
import {useDispatch,useSelector} from 'react-redux'
import { Navigate, useNavigate } from 'react-router';
import axios from 'axios';
const Register = ({toggleAuthComponent}) => {
const user=useSelector((state)=>state.user)
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmedPassword,setConfirmedPasword] = useState("");
const [phone, setPhone] = useState("");
const [isAdminCode, setIsAdminCode] = useState(false);
const [adminCode, setAdminCode] = useState('');
const navigate=useNavigate()


const namePattern = /^[a-zA-Z\s]+$/; // Solo letras y espacios
const phonePattern = /^\d+$/; 
const handleAdminCode = (e) => {
    setAdminCode(e.target.value);
  };


const handleAdminCodeToggle = () => {
    setIsAdminCode(!isAdminCode);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmedPassword) {
      axios
        .post("http://localhost:3000/api/users/register", {
          name: name,
          password: password,
          email: email,
          phone: phone,
          code: adminCode,
        })
        .then((res) => {
          const { success, message } = res.data;
          if (success) {
            alert(message);
            navigate("/login");
          } else {
            alert(message);
          }
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } else {
      alert("Las contraseñas no coinciden");
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <section className="bg-transparent dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            devHouse
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Registrarse
              </h1>
              <form className="space-y-1 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    name="name"
                    id="name"
                    className="input-field"
                    placeholder="username"
                    required
                    pattern={namePattern.source}
                    title="Por favor ingresa un nombre válido"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    name="email"
                    id="email"
                    className="input-field"
                    placeholder="name@company.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    onChange={(e) => setConfirmedPasword(e.target.value)}
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="input-field"
                    required
                  />
                </div>
                {password !== confirmedPassword && <p>Las contraseñas no coinciden</p>}
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Phone
                  </label>
                  <input
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                    name="phone"
                    id="phone"
                    className="input-field"
                    placeholder="phone number"
                    required
                    pattern={phonePattern.source}
                    title="Por favor ingresa un número válido"
                  />
                </div>
                <div>
                  <label htmlFor="admin-code">Do you have an admin code?</label>
                  <input type="checkbox" id="admin-code" checked={isAdminCode} onChange={handleAdminCodeToggle} />
                </div>
                {isAdminCode && (
                  <div>
                    <label htmlFor="admin-code-input">Admin Code:</label>
                    <input type="text" id="admin-code-input" value={adminCode} onChange={handleAdminCode} required />
                  </div>
                )}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                      I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <button onClick={toggleAuthComponent} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    Login here
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
