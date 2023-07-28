import axios from "axios";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [hasGarage, setHasGarage] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(null);
  const [baths, setBaths] = useState(null);
  const [status, setStatus] = useState(true);
  const [statusType, setstatusType] = useState('');
  const [beds, setBeds] = useState(null);
  const [imgURL, setImgURL] = useState([""]);
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [country, setcountry] = useState("");

  const navigate = useNavigate();

  const handleGarageCheckboxChange = (event) => {
    setHasGarage(event.target.checked);
  };
  const handleImgURLChange = (index, value) => {
    setImgURL((prevImgURLs) => {
      const updatedImgURLs = [...prevImgURLs];
      updatedImgURLs[index] = value;
      return updatedImgURLs;
    });
  };

  const handleAddImgURL = () => {
    setImgURL((prevImgURLs) => [...prevImgURLs, ""]);
  };

  const handleRemoveImgURL = (index) => {
    setImgURL((prevImgURLs) => {
      const updatedImgURLs = [...prevImgURLs];
      updatedImgURLs.splice(index, 1);
      return updatedImgURLs;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const bathsInt = baths !== null ? parseInt(baths, 10) : null;
    const bedsInt = beds !== null ? parseInt(beds, 10) : null;
    const priceInt = price !== null ? parseInt(price, 10) : null;

    const productData = {
      name: name,
      description: description,
      descriptionData: {baths:`${bathsInt}`,beds:`${bedsInt}`,garage:`${hasGarage}`},
      category: category,
      status: status,
      statusType:statusType,
      price:priceInt,
      imgURL:imgURL,
      neighborhood:neighborhood,
      city:city,
      country:country
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/properties",
        productData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          credentials: "include",
        }
      );

      alert("Propiedad creada ");
      navigate(`/home/search`);
    } catch (error) {
      console.log("se produjo un error al crear la propiedad", error);
    }
  };

  return (
    <>
    <h1>Crear propiedad</h1>
    <form onSubmit={handleSubmit}> 
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  pattern="^[^\d]+$"
                  required
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                maxlength="20" minlength="5"
                rows={2}
                  required
                  name="description"
                  id="description"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Pais
              </label>
              <div className="mt-2">
                <select
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Argentina</option>
                  <option>Chile</option>
                  <option>Brasil</option>
                  <option>Estados Unidos</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="neighborhood"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Neighborhood
              </label>
              <div className="mt-2">
                <input
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                  required
                  type="text"
                  name="neighborhood"
                  id="neighborhood"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <div className="mt-2">
                <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                  required
                  type="text"
                  name="city"
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  type="number"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3 flex items-center">
              <label
                htmlFor="descriptionData.garage"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Garage
              </label>
              <div className="mt-2">
                <input
                  type="checkbox"
                  name="descriptionData.garage"
                  id="garage"
                  checked={hasGarage}
                  onChange={handleGarageCheckboxChange}
                  className="w-4 h-5 ml-2 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="descriptionData.baths"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Baths
              </label>
              <div className="mt-2">
                <input
                  value={baths}
                  onChange={(e) => setBaths(e.target.value)}
                  required
                  type="number"
                  name="descriptionData.baths"
                  id="baths"
                  min="0"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="descriptionData.beds"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Beds
              </label>
              <div className="mt-2">
                <input
                  required
                  type="number"
                  name="descriptionData.beds"
                  id="beds"
                  min="0"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onInput={(event) => {
                    event.target.value = event.target.value.replace(
                      /[^0-9]/g,
                      ""
                    );
                  }}
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                  required
                  type="text"
                  name="category"
                  id="category"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="statusType"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Status Type
              </label>
              <div className="mt-2">
                <input
                value={statusType}
                onChange={(e) => setstatusType(e.target.value)}
                  required
                  type="text"
                  name="statusType"
                  id="statusType"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="imgURL"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              {imgURL.map((img,index)=>(
                <Fragment key={index}>
                <div className="mt-2">
                <input
                  value={img}

                onChange={(e)=>handleImgURLChange(index, e.target.value)}
                  type="text"
                  name="imgURL"
                  id="imgURL"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {index !== 0 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImgURL(index)}
                  className=" rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Eliminar
                </button>
              )}
              </div>
              </Fragment>
              ))}
               <button
            type="button"
            onClick={handleAddImgURL}
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Agregar URL
          </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6 mr-10">
        <button
          type="button"
          className="text-sm font-semibold"
          onClick={() => navigate("/home/search")}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
    </>
  );
};

export default AddProperty;
