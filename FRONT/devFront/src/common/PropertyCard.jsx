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
    }
  };

  return (
    <div className="property-view ">
      {Object.keys(property).length > 0 ? (
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
            {user.role!=='admin' && (  <div className="property-contact">
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
            </div>)}
          
          </div>
        </>
      ) : (
        <p>Propiedad fue eliminada</p>
      )}
    </div>
  );
};

export default PropertyCard;
