import React, { useEffect, useState } from "react";
import "../styles/card.css";
import { useParams } from "react-router";
import axios from "axios";

const PropertyCard = () => {
  const { id } = useParams();
  const [property, setProperty] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/properties/${id}`)
      .then((response) => {
        setProperty(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

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
              <h1 className="property-title">{property.category.charAt(0).toUpperCase() + property.category.slice(1)} {property.statusType === "for_sale" ? "en venta" : "en renta"} en {property.city}</h1>
              <h2 className="property-price">USD {property.price}</h2>
              <p className="property-description mb-3 font-normal text-gray-700 dark:text-gray-400">{property.description}</p>
              <ul className="property-features">
                {property.descriptionData ? (
                  <>
                    <li>{`${property.descriptionData.beds} ${
                      property.descriptionData.beds === 1 ? "dormitorio" : "dormitorios"
                    }`}</li>
                    <li>{`${property.descriptionData.baths} ${
                      property.descriptionData.baths === 1 ? "baño" : "baños"
                    }`}</li>
                    <li>{property.descriptionData.garage ? "Garaje" : "Sin garaje"}</li>
                  </>
                ) : null}
              </ul>
            </div>
            <div className="property-contact">
              <button className="property-contact-button inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Contactar al vendedor <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg></button>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PropertyCard;
