import React, { Fragment, useEffect, useState } from "react";
import "../styles/favorites.css";
import axios from "axios";
import { useSelector } from "react-redux";
const Favorites = () => {
  const user = useSelector((state) => state.user);
  const [favProperties, setfavProperties] = useState([]);
 

  useEffect(() => {
    if (user.id) {
      axios
        .get(`http://localhost:3000/api/favorites/${user.id}`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        })
        .then((response) => {
          setfavProperties(response.data.validFavorites);
        })
        .catch((err) => console.log(err));
    }
  }, [user.id]);

  const removeFavorite = async(propertyId) => {
    console.log("id de propiedad", propertyId);
    try {
      await axios
      .delete(
        `http://localhost:3000/api/favorites/remove/${user.id}`, {
          data: { id: propertyId }, // Send the 'id' in the request body
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      )

      const response = await  axios
      .get(`http://localhost:3000/api/favorites/${user.id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      setfavProperties(response.data.validFavorites)
    } catch (error) {
      console.error("no se elimino de favoritos", error);
      
    }
    
        // setfavProperties((prevFavProperties) => {
        //   const updatedFavProperties = prevFavProperties.validFavorites.filter((property) => property.id !== propertyId);
        //   return { ...prevFavProperties, validFavorites: updatedFavProperties };
    
  };

  return (
    <div className="flex flex-col md:flex-row px-10 overflow-y-auto w-screen h-screen pt-20">
      <div className="w-full flex flex-col h-fit gap-4 p-4 ">
        <p className="text-dark-900 text-xl font-extrabold flex">Favoritos</p>
        {favProperties?.map((property, index) => (
          <Fragment key={index}>
            <div className="flex flex-col p-4 text-lg font-semibold shadow-md border rounded-sm">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <div className="flex flex-row gap-6 items-center">
                  <div className="w-28 h-28">
                    <img className="w-full h-full" src={property.imgURL?.[0]} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-lg text-gray-800 font-semibold">
                      {property.name}
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
                        {`${property.descriptionData.beds} ${
                          property.descriptionData.beds === 1
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
                        {`${property.descriptionData.baths} ${
                          property.descriptionData.baths === 1
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
                        {property.descriptionData.garage
                          ? "1 cochera"
                          : "Sin cochera"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="self-center text-center">
                  <p className="text-gray-800 font-normal">
                    USD{property.price}
                  </p>
                </div>
                <div className="self-center">
                
                  <button  onClick={() => removeFavorite(property.id)}
                  
                  >
                    <svg
                      width="24px"
                      height="24px"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                        fill="#1C274C"
                        className="heart-filled"
                      />
                      <path
                        d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                        stroke="#1C274C"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="heart-outline"
                      />
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

export default Favorites;
