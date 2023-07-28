import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAdminData } from "../state/adminData";
import { setSelectedOption } from "../state/selectedOption";
import AdminGrid from "../components/AdminGrid";
const Search = () => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredSearch, setFilteredSearch] = useState(null);
    const selectedOption = useSelector((state) => state.option);
    const dispatch = useDispatch();

  
    function toggleDropdown() {
      setDropdownVisible(!dropdownVisible);
    }
  
    function handleMenuItemClick() {
      const newSelectedOption =
      selectedOption === "Usuarios" ? "Propiedades" : "Usuarios";
    dispatch(setSelectedOption(newSelectedOption));
      toggleDropdown();
      
    }



const fetchData=async()=>{
    try {
      const option=selectedOption==='Propiedades'?`properties`:`users`
      const adminRequest=option===`users`? true: false
      const dataType=option==='properties'?'property':'user'
      console.log('datatype',dataType);
      let url=option===`properties`?`http://localhost:3000/api/${option}`:`http://localhost:3000/api/${option}/admin`
      if(filteredSearch){
        url=`http://localhost:3000/api/${option}/search/${filteredSearch}`
      }
if(adminRequest){
  const response=await axios.get(url,{
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
  })
  const sortedData=response.data.sort((a,b)=>a.id-b.id)
      const data=sortedData.map(object=>({...object,type:dataType}))
      dispatch(setAdminData(data))
}
else{
  const response=await axios.get(url)
  const sortedData=response.data.sort((a,b)=>a.id-b.id)
      const data=sortedData.map(object=>({...object,type:dataType}))
      dispatch(setAdminData(data))
}
      
        
    } catch (error) {
        console.log('ocurrio un error',error);
    }
}
  const handleSearch = (e) => {
    setFilteredSearch(e.target.value);
  };

  useEffect(() => {
    fetchData();
  }, [filteredSearch,selectedOption]);



    return (
      <>
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
      <AdminGrid fetchData={fetchData}/>
      </>
    );
};

export default Search;