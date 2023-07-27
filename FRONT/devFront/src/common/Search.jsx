import React, { useEffect, useState } from "react";
import { setProperties } from "../state/properties";
import { useDispatch } from "react-redux";
import axios from "axios";

const Search = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredSearch, setFilteredSearch] = useState(null);
    const [selectedOption, setSelectedOption] = useState("Propiedades");
    const dispatch = useDispatch();

  
    function toggleDropdown() {
      setDropdownVisible(!dropdownVisible);
    }
  
    function handleMenuItemClick() {
      setSelectedOption((prevOption) =>
        prevOption === "Usuarios" ? "Propiedades" : "Usuarios"
      );
      toggleDropdown();
    }



const fetchSearch=async()=>{
    try {
      console.log('llegue aca');
      console.log(selectedOption);
        if(selectedOption==='Propiedades'){
          console.log('estoy en el if');
            let url="http://localhost:3000/api/properties"
            if (filteredSearch){
              url=`http://localhost:3000/api/properties/search/${filteredSearch}`
            }
            const response = await axios.get(url);
            console.log('response',response);
            const sortedProperties= response.data.sort((a, b) => a.id - b.id);
            dispatch(setProperties(sortedProperties));
        }
        else if(selectedOption==='Usuarios'){

        }
        
    } catch (error) {
        
    }
}
  const handleSearch = (e) => {
    setFilteredSearch(e.target.value);
  };

  useEffect(() => {
    fetchSearch();
  }, [filteredSearch]);

    return (
      <div className="relative  md:h-96 w-full">
        <div
          className="absolute top-0 right-0 bottom-0 left-0 z-0 bg-cover bg-center opacity-1"
          style={{
            opacity: "1",
            backgroundImage: `url(https://tpc.googlesyndication.com/simgad/1331746288206344314?)`
          }}
        ></div>
        <form className="flex justify-center items-center w-full max-w-md mx-auto">
          <div className="relative mt-20">
            <button
              id="dropdown-button"
              onClick={toggleDropdown}
              className={`flex-shrink-0 z-10 relative inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 ${
                dropdownVisible ? "rounded-tl-lg rounded-tr-lg" : "rounded-lg"
              }`}
              type="button"
            >
              {selectedOption}
              <svg
                className={`w-2.5 h-2.5 ml-2.5 ${
                  dropdownVisible ? "transform rotate-180" : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {dropdownVisible && (
        <div
          id="dropdown"
          className={`bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute top-full left-0 right-0 dark:bg-gray-700`}
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
            <li>
              <button
                type="button"
                onClick={handleMenuItemClick}
                className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                {selectedOption === "Usuarios" ? "Propiedades" : "Usuarios"}
              </button>
            </li>
          </ul>
        </div>
      )}
          </div>
          <div className="relative w-full">
            <input 
            onChange={handleSearch}
              type="search"
              id="search-dropdown"
              className="mt-20 p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Buscar propiedades y usuarios"
              required
            />
          </div>
        </form>
      </div>
    );
};

export default Search;