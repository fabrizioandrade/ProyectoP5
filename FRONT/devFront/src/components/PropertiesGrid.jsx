import React, { Fragment, useEffect } from "react";
import "../styles/grid.css";
import { useSelector, useDispatch } from "react-redux";
import "../styles/properties.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { setFavorites } from "../state/favorites";
import CustomerSearch from "../common/CustomerSearch";
import { setProperties } from "../state/properties";

const PropertiesGrid = () => {
  const properties = useSelector((state) => state.properties);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const fetchData = async () => {
    try {
      let url = "http://localhost:3000/api/properties/";
      const response = await axios.get(url);
      const sortedProperties = response.data.sort((a, b) => a.id - b.id);
      dispatch(setProperties(sortedProperties));
    } catch (error) {
      console.log("Error al obtener los productos:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const addToFavorite = async (propertyId) => {
    try {
      if (!user || !user.id) {
        alert("Inicia sesion para continuar");
        return;
      }

      const response = await axios.post(
        `http://localhost:3000/api/favorites/add/${user.id}`,
        { propertyId },
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      const response2 = await  axios
      .get(`http://localhost:3000/api/favorites/${user.id}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        credentials: "include",
      })
      dispatch(setFavorites(response2.data.validFavorites))
      console.log(favorites);
      alert(response.data.message);
    } catch (error) {
      console.log("ocurrio un error al agregar a favoritos", error);
      alert(error.response.data.error);
    }
  };
  
  const removeFromFavorite = async(propertyId) => {
    try {
      await axios
      .delete(
        `http://localhost:3000/api/favorites/remove/${user.id}`, {
          data: { id: propertyId }, 
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
      dispatch(setFavorites(response.data.validFavorites))
    } catch (error) {
      console.error("no se elimino de favoritos", error);
      
    }
  };

  return (
    <div className="w-screen h-screen ">
      <CustomerSearch />
      <h1 className="text-black text-3xl font-bold mt-10 ml-5 ">
        Nuestras recomendaciones para vos
      </h1>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 p-0">
        {properties?.map((property, index) => (
          <Fragment key={index}>
            <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl shadow-red-700">
              <Link to={`property/${property.id}`}>
                {" "}
                <img
                  src={property.imgURL[0]}
                  alt="Property"
                  className="h-80 w-72 object-cover rounded-t-xl"
                />
              </Link>
              <div className="px-4 py-3 w-72">
                <p className="border-b border-indigo-300 flex gap-2 text-blue-400 mr-3 uppercase text-xs">
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="mt-0.5">{`${property.city}, ${property.country}`}</span>
                </p>
                <p className="text-lg font-bold text-blue-600 truncate block capitalize border-b border-indigo-300">
                  {property.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-blue-700 cursor-auto my-3 border-r border-indigo-500 p-2">
                    USD{property.price}
                  </p>
                  <div className="flex ml-5 p-2">
                    {favorites?.some(object=>object.id===property.id) ? (
                      <button
                        onClick={() => removeFromFavorite(property.id)}
                        className="border border-gray-800 "
                      >
                      <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M476 801l-181 95q-18 10-36.5 4.5T229 879t-7-36l34-202q2-12-1.5-24T242 596L95 453q-15-14-15.5-33.5T91 385t32-18l203-30q12-2 22-9t16-18l90-184q10-18 28-25t36 0 28 25l90 184q6 11 16 18t22 9l203 30q20 3 32 18t11.5 34.5T905 453L758 596q-8 9-12 21t-2 24l34 202q4 20-7 36t-29.5 21.5T705 896l-181-95q-11-6-24-6t-24 6z"/></svg>
                      </button>                    ) : (
                      <button
                        onClick={() => addToFavorite(property.id)}
                        className="border border-gray-800 "
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 32 32"
                          version="1.1"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
                        >
                          <g
                            id="Page-1"
                            stroke="none"
                            strokeWidth="1"
                            fill="none"
                            fillRule="evenodd"
                            sketch:type="MSPage"
                          >
                            <g
                              id="Icon-Set"
                              sketch:type="MSLayerGroup"
                              transform="translate(-152.000000, -879.000000)"
                              fill="#000000"
                            >
                              <path
                                d="M168,903.21 L160.571,907.375 L161.989,898.971 L155.594,892.442 L164.245,891.317 L168,883.313 L171.722,891.317 L180.344,892.54 L174.011,899.002 L175.335,907.406 L168,903.21 L168,903.21 Z M184,891.244 L172.962,889.56 L168,879 L163.038,889.56 L152,891.244 L159.985,899.42 L158.095,911 L168,905.53 L177.905,911 L176.015,899.42 L184,891.244 L184,891.244 Z"
                                id="start-favorite"
                                sketch:type="MSShapeGroup"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between ml-5 ">
                    <p className="border-l border-indigo-500 p-2 text-sm text-blue-500">
                      {` ${property.descriptionData.beds} dorm. ${
                        property.descriptionData.baths
                      } baño ${
                        property.descriptionData.garage === "true"
                          ? `1 coch.`
                          : `0 coch.`
                      }`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        ))}
      </section>{" "}
    </div>
  );
};

export default PropertiesGrid;
