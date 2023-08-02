import React, { Fragment } from 'react'
import '../styles/grid.css'
import { useSelector,useDispatch } from 'react-redux'
import '../styles/properties.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { setFavorites } from "../state/favorites";

const PropertiesGrid = () => {
    const properties=useSelector((state)=>state.properties)
    const user=useSelector((state)=>state.user)
    const dispatch = useDispatch();
    const favorites=useSelector((state)=>state.favorites)

const addToFavorite=async(propertyId)=>{
try {

  if (!user || !user.id) {
    alert("Inicia sesion para continuar")
    return;
  }

  const response = await axios.post(`http://localhost:3000/api/favorites/add/${user.id}`, { propertyId },{
    withCredentials: true,
    credentials: 'include',
  });
  dispatch(setFavorites(response.data.validFavorites))

  alert(response.data.message);
} catch (error) {
 console.log('ocurrio un error al agregar a favoritos',error); 
 alert(error.response.data.error)
}
}

  return (
    <div className="w-screen h-screen ">
            <h1 className="text-black text-3xl font-bold mt-10 ml-5 ">Nuestras recomendaciones para vos</h1>
<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5 p-0">
{properties.map((property,index)=>(
<Fragment key={index}>
<div  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl shadow-blue-700">
<Link  to={`property/${property.id}`}> <img src={property.imgURL[0]} alt="Property" className="h-80 w-72 object-cover rounded-t-xl" /></Link>
      <div className="px-4 py-3 w-72">
        <span className="text-blue-400 mr-3 uppercase text-xs">{property.statusType}</span>
        <p className="text-lg font-bold text-blue-600 truncate block capitalize">{property.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-blue-700 cursor-auto my-3">USD{property.price}</p>
          <div className="flex ml-10">
                    <button onClick={()=>addToFavorite(property.id)} className="border border-gray-800">
                      
                    <svg width="20px" height="20px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
  
    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-152.000000, -879.000000)" fill="#000000">
            <path d="M168,903.21 L160.571,907.375 L161.989,898.971 L155.594,892.442 L164.245,891.317 L168,883.313 L171.722,891.317 L180.344,892.54 L174.011,899.002 L175.335,907.406 L168,903.21 L168,903.21 Z M184,891.244 L172.962,889.56 L168,879 L163.038,889.56 L152,891.244 L159.985,899.42 L158.095,911 L168,905.53 L177.905,911 L176.015,899.42 L184,891.244 L184,891.244 Z" id="start-favorite" sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>
                    </button>
                    </div>
          <div className="flex justify-between ml-5">
                    <p className="text-sm text-blue-500">
                    {` ${property.descriptionData.beds} dorm. ${property.descriptionData.baths} baño ${property.descriptionData.garage==='true'?`1 coch.`:`0 coch.`}` }</p>
                  </div>
       
        </div>
      </div>
  </div></Fragment>
  ))}

</section> </div>)
}

export default PropertiesGrid