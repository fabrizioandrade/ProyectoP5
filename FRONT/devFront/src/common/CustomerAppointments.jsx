import React, { Fragment, useEffect, useState } from "react";
import "../styles/favorites.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAppointments } from "../state/appointments";
import { useNavigate } from "react-router";
const CustomerAppointments = () => {
  const user = useSelector((state) => state.user);
  const appointments=useSelector((state)=>state.appointments)
  const dispatch = useDispatch();

 const navigate=useNavigate()

  useEffect(() => {
    if (user.id) {
      axios
        .get(`http://localhost:3000/api/appointments//get/all/by/${user.id}`,{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          console.log(response);
          dispatch(setAppointments(response.data))
        })
        .catch((err) => console.log(err));
    }
  }, [user.id]);

  const removeAppointment = async(appointmentId) => {
    try {
      await axios
      .delete(
        `http://localhost:3000/api/appointments/one/${user.id}/${appointmentId}`,{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      )

      const response = await  axios
      .get(`http://localhost:3000/api/appointments/get/all/by/${user.id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      dispatch(setAppointments(response.data))
    } catch (error) {
      console.error("no se elimino de favoritos", error);
      
    }
  };

  const deleteAll=async()=>{
    try {
      await axios
      .delete(
        `http://localhost:3000/api/appointments/all/${user.id}`,{
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      )

      const response = await  axios
      .get(`http://localhost:3000/api/appointments/get/all/by/${user.id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      dispatch(setAppointments(response.data))
    } catch (error) {
      console.error("no se elimino de favoritos", error);
      
    }
  }

  return (
    <div className="flex flex-col md:flex-row px-10 overflow-y-auto w-screen h-screen pt-20">
      <div className="w-full flex flex-col h-fit gap-4 p-4 ">
        <p className="text-dark-900 text-xl font-extrabold flex">Citas</p>
        {appointments?.length>0?(   <button onClick={()=>deleteAll()} class="flex items-center bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md">
	<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
	  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
	</svg>

	Borrar todas las citas
  </button>):(<button className="flex bg-red-600" style={{marginRight:"600px"}} onClick={()=>navigate('/home')}>Agendar citas</button>)}
     
        {appointments?.map((appointment, index) => (
          <Fragment key={index}>
            <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <div className="flex flex-row gap-6 items-center">
                  <div className="w-28 h-28">
                    <img className="w-full h-full" src={appointment.property.imgURL?.[0]} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg text-gray-800 font-semibold">
                      {appointment.property.name}
                    </p>

                    <div className="flex items-center gap-1  ">
                      {" "}
                      {/* Contenedor del SVG y el span */}
                      <svg
                        fill="#000000"
                        width="15px"
                        height="15px"
                        viewBox="0 0 512 512"
                        id="Layer_1"
                        enableBackground="new 0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g>
                          <path d="m496 320c0-15.581 0-282.497 0-296 0-8.836-7.163-16-16-16s-16 7.164-16 16v16h-416v-16c0-8.836-7.164-16-16-16s-16 7.164-16 16v296c-8.836 0-16 7.164-16 16v152c0 8.836 7.164 16 16 16h56c6.061 0 11.601-3.424 14.311-8.845l19.578-39.155h300.223l19.578 39.155c2.71 5.421 8.25 8.845 14.311 8.845h56c8.837 0 16-7.164 16-16v-152c-.001-8.836-7.164-16-16.001-16zm-32-91.833c-11.449-7.679-25.209-12.167-40-12.167h-56v-32c0-35.29-28.71-64-64-64h-96c-35.29 0-64 28.71-64 64v32h-56c-14.791 0-28.551 4.488-40 12.167v-156.167h416zm-128-12.167h-160v-32c0-17.645 14.355-32 32-32h96c17.645 0 32 14.355 32 32zm-288 72c0-22.056 17.944-40 40-40h336c22.056 0 40 17.944 40 40v32h-416zm432 184h-30.111l-19.578-39.155c-2.71-5.421-8.25-8.845-14.311-8.845h-320c-6.061 0-11.601 3.424-14.311 8.845l-19.578 39.155h-30.111v-120h448z" />
                        </g>
                      </svg>
                      <span className="text-xs text-gray-600 font-semibold">
                        {`${appointment.property.descriptionData.beds} ${
                          appointment.property.descriptionData.beds === 1
                            ? "dormitorio"
                            : "dormitorios"
                        }`}{" "}
                      </span>
                      <svg
                        fill="#000000"
                        height="15px"
                        width="15px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xmlSpace="preserve"
                      >
                        <g>
                          <g>
                            <path
                              d="M256,0c-9.217,0-16.696,7.473-16.696,16.696v478.609c0,9.223,7.479,16.696,16.696,16.696
			c9.217,0,16.696-7.473,16.696-16.696V16.696C272.696,7.473,265.217,0,256,0z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M105.739,44.522c-36.826,0-66.783,29.956-66.783,66.783c0,36.826,29.956,66.783,66.783,66.783
			s66.783-29.956,66.783-66.783C172.522,74.478,142.565,44.522,105.739,44.522z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M406.261,44.522c-36.826,0-66.783,29.956-66.783,66.783c0,36.826,29.956,66.783,66.783,66.783
			s66.783-29.956,66.783-66.783C473.043,74.478,443.087,44.522,406.261,44.522z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M202.935,218.664c-3.109-4.501-8.239-7.186-13.717-7.186H22.261c-5.478,0-10.608,2.685-13.717,7.185
			c-3.12,4.5-3.837,10.244-1.913,15.374l49.022,130.729v63.755c0,27.619,22.468,50.087,50.087,50.087s50.087-22.468,50.087-50.087
			v-63.755l49.022-130.728C206.772,228.909,206.054,223.163,202.935,218.664z"
                            />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path
                              d="M505.37,355.875l-50.087-133.565c-2.445-6.516-8.674-10.831-15.63-10.831H372.87c-6.957,0-13.185,4.315-15.63,10.831
			l-50.087,133.565c-1.924,5.13-1.207,10.876,1.913,15.374c3.109,4.501,8.239,7.186,13.717,7.186h33.391v50.087
			c0,27.619,22.468,50.087,50.087,50.087s50.087-22.468,50.087-50.087v-50.087h33.391c5.478,0,10.608-2.685,13.717-7.185
			C506.576,366.75,507.293,361.006,505.37,355.875z"
                            />
                          </g>
                        </g>
                      </svg>
                      <span className="text-xs text-gray-600 font-semibold">
                        {`${appointment.property.descriptionData.baths} ${
                          appointment.property.descriptionData.baths === 1
                            ? "baño"
                            : "baños"
                        }`}{" "}
                      </span>
                      <svg
                        fill="#000000"
                        width="15px"
                        height="15px"
                        viewBox="0 0 24 24"
                        id="garage-car"
                        data-name="Flat Line"
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon flat-line"
                      >
                        <path
                          id="secondary"
                          d="M16,15l-.81-3.24a1,1,0,0,0-1-.76H9.78a1,1,0,0,0-1,.76L8,15Z"
                          style={{
                            fill: "rgb(44, 169, 188)",
                            strokeWidth: "2",
                          }}
                        ></path>
                        <path
                          id="primary"
                          d="M16,15l-.81-3.24a1,1,0,0,0-1-.76H9.78a1,1,0,0,0-1,.76L8,15Zm1,1a1,1,0,0,0-1-1H8a1,1,0,0,0-1,1v3H17Zm-7,4V19H8v1a1,1,0,0,0,1,1H9A1,1,0,0,0,10,20Zm5,1h0a1,1,0,0,0,1-1V19H14v1A1,1,0,0,0,15,21Z"
                          style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                          }}
                        ></path>
                        <path
                          id="primary-2"
                          data-name="primary"
                          d="M3,21V7.65a1,1,0,0,1,.59-.91L12,3l8.41,3.74a1,1,0,0,1,.59.91V21"
                          style={{
                            fill: "none",
                            stroke: "rgb(0, 0, 0)",
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            strokeWidth: "2",
                          }}
                        ></path>
                      </svg>
                      <span className="text-xs text-gray-600 font-semibold">
                        {appointment.property.descriptionData.garage
                          ? "1 cochera"
                          : "Sin cochera"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-center text-center">
                  <p className="text-gray-800 font-normal">
                    Fecha: {appointment.date}
                  </p>
                </div>
                <div className="self-center">
                
                  <button  onClick={()=>removeAppointment(appointment.id)}
                  
                  >
                   <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M14 10V17M10 10V17" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default CustomerAppointments;
