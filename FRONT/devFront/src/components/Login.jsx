import React, { useState } from "react";
import logo from "../../public/assets/logo.png";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setUser } from "../state/user";
import axios from "axios";

export const Login = ({ toggleAuthComponent }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const buttonName = e.nativeEvent.submitter.name;
    console.log(buttonName);
    if (buttonName === "signInButton") {
      axios
        .post(
          "http://localhost:3000/api/users/login",
          {
            email,
            password,
          },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
            credentials: "include",
          }
        )
        .then((loginResponse) => {
          // Verificar el token después del inicio de sesión exitoso
          axios
            .get("http://localhost:3000/api/users/me", {
              withCredentials: true,
              credentials: "include",
            })
            .then((tokenVerifyResponse) => {
              dispatch(setUser(tokenVerifyResponse.data));
              alert(
                `Inicio de sesión exitoso:Bienvenido ${tokenVerifyResponse.data.name} `
              );

              // Mover la navegación a la página principal aquí
              navigate("/home");
            })
            .catch((error) => {
              if (error.response && error.response.status === 403) {
                // El token no es válido
                alert("El token no es válido. Inicia sesión nuevamente.");
              } else {
                alert(`Error en la verificación del token: ${error}`);
              }
            });
        })
        .catch((error) => {
          if (error.response && error.response.data) {
            alert(error.response.data.message);
          } else {
            alert("Ocurrió un error al procesar la solicitud.");
          }
        });
    } else if (buttonName === "loginWithGoogleButton") {
   handleLoginWithGoogle()
    }
  };

  const handleLoginWithGoogle = () => {
    window.location.href = "http://localhost:3000/api/users/auth/google";
  };
  return (
    <div>
      <section className="bg-trasparent dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
            DevHouse
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    onChange={handleEmail}
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    onChange={handlePassword}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5"></div>
                    <div className="ml-3 text-sm">
                      <button
                        onClick={() => navigate("/home")}
                        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-blue-700 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                      >
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Guest
                        </span>
                      </button>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  name="signInButton"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  or
                </p>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  <button
                    type="submit"
                    name="loginWithGoogleButton"
                    className="w-full py-2.5 flex items-center justify-center rounded-lg text-sm font-medium text-slate-700 bg-white hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150 dark:bg-gray-900 dark:text-white dark:hover:bg-opacity-0 dark:hover:border-transparent dark:focus:border-transparent dark:focus:ring-4 dark:focus:ring-blue-500 dark:focus:outline-none"
                  >
                    <img
                      className="w-6 h-6 mr-2"
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      loading="lazy"
                      alt="google logo"
                    />
                    <span>Login with Google</span>
                  </button>
                  Don’t have an account yet?{" "}
                  <button
                    onClick={toggleAuthComponent}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
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
