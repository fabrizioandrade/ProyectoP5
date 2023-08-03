import React, { useEffect, useState } from "react";
import "../styles/card.css";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { getCurrentDate, getMaxDate } from "../utils/formatDate.utils";

const PropertyCard = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});
  const user = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [contentDisabled, setContentDisabled] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setContentDisabled(true);
    const requestData = {
      propertyId: id,
      appointmentDate: selectedDate,
    };

    if (!user || !user.id) {
      const wantToLogin = window.confirm(
        "¿Deseas iniciar sesión para continuar?"
      );
      if (wantToLogin) {
        navigate("/");
        return;
      }
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:3000/api/appointments/create/${user.id}`,
        requestData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      );

      if (response.status == 201) {
        alert(response.data.message);
        navigate("/home");
      }
    } catch (error) {
      alert(error.response.data.error);
    } finally {
      setIsLoading(false);
      setContentDisabled(false);
    }
  };

  return (
    <div className="property-view ">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-indicator">
            <div role="status">
              <svg
                aria-hidden="true"
                class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      )}
      {contentDisabled ? (
        <div className="disabled-content"></div>
      ) : Object.keys(property).length > 0 ? (
        <>
          <div className="property-image">
            <img
              src={property.imgURL}
              alt="Imagen de la propiedad"
              className="rounded-t-lg"
            />
          </div>
          <div className="property-details-container">
            <div className="property-details">
              <h1 className="property-title">
                {property.category.charAt(0).toUpperCase() +
                  property.category.slice(1)}{" "}
                {property.statusType === "for_sale" ? "en venta" : "en renta"}{" "}
                en {property.city}
              </h1>
              <h2 className="property-price">USD {property.price}</h2>
              <p className="property-description mb-3 font-normal text-gray-700 dark:text-gray-400">
                {property.description}
              </p>
              <ul className="property-features">
                {property.descriptionData ? (
                  <>
                    <li>{`${property.descriptionData.beds} ${
                      property.descriptionData.beds === 1
                        ? "dormitorio"
                        : "dormitorios"
                    }`}</li>
                    <li>{`${property.descriptionData.baths} ${
                      property.descriptionData.baths === 1 ? "baño" : "baños"
                    }`}</li>
                    <li>
                      {property.descriptionData.garage
                        ? "Garaje"
                        : "Sin garaje"}
                    </li>
                  </>
                ) : null}
              </ul>
            </div>
            {user.role !== "admin" && (
              <div className="property-contact">
                <form onSubmit={handleSubmit}>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={getCurrentDate()}
                    max={getMaxDate()}
                  />
                  <button
                    type="submit"
                    className="property-contact-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Solicitar cita
                  </button>
                </form>
              </div>
            )}
          </div>
        </>
      ) : (
        <p>No se encontro la propiedad</p>
      )}
    </div>
  );
};

export default PropertyCard;
