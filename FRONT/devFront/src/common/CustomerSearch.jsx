import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setProperties } from "../state/properties";
const CustomerSearch = () => {
  const [filteredSearch, setFilteredSearch] = useState(null);
  const dispatch = useDispatch();

 

  const fetchData = async () => {
    try {
      let url= `http://localhost:3000/api/properties`
      if (filteredSearch) {
        url = `http://localhost:3000/api/properties/search/${filteredSearch}`;
      }
      const response = await axios.get(url);
      const sortedProperties = response.data.sort((a, b) => a.id - b.id);

      dispatch(setProperties(sortedProperties));
   
    } catch (error) {
      console.log("ocurrio un error", error);
    }
  };
  const handleSearch = (e) => {
    setFilteredSearch(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [filteredSearch]);

  return (
    <>
      <div className="relative  md:h-96 w-full">
        <div
          className="absolute top-0 right-0 bottom-0 left-0  bg-cover bg-center "
          style={{
            backgroundImage: `url("https://tpc.googlesyndication.com/simgad/15930325027794167517?)` , filter: "brightness(0.8)",
          }}
        ></div>
        <form className="flex flex-col justify-center items-center mx-auto  ">
          <h1 className="z-10 text-4xl text-white pt-20">Encontrá tu hogar</h1>
          <div className="relative flex bottom-16">
          <div className="relative mt-20">
            <button
              id="dropdown-button"
              className={`flex-shrink-0 z-10 relative inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}
              type="button"
            >
Propiedades            
</button>
          </div>
          <div className="relative ">
            <input
              onChange={handleSearch}
              type="search"
              id="search-dropdown"
              className="mt-20 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Ingresa nombre"
              required
            />
          </div>
          </div>
        </form>
        </div>
    </>
  );
};

export default CustomerSearch;