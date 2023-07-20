import React from 'react'
import '../styles/grid.css'
import { useSelector } from 'react-redux'
import '../styles/properties.css'
import { Link } from 'react-router-dom'
const PropertiesGrid = () => {
    const properties=useSelector((state)=>state.properties)
  return (
    <div className="w-screen h-screen overflow-y-auto">
<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
{properties.map((property,index)=>(

<Link to={`property/${property.id}`}><div key={index} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <a href="#">
      <img src={property.imgURL[0]} alt="Property" className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <span className="text-blue-400 mr-3 uppercase text-xs">{property.statusType}</span>
        <p className="text-lg font-bold text-blue-600 truncate block capitalize">{property.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-blue-700 cursor-auto my-3">USD{property.price}</p>
          <div className="flex justify-between ml-5">
                    <p className="text-sm text-blue-500">
                    {(Math.floor(Math.random()*2))+` amb ${property.descriptionData.beds} dorm. ${property.descriptionData.baths} baño ${property.descriptionData.garage==='true'?`1 coch.`:`0 coch.`}` }</p>
                  </div>
       
        </div>
      </div>
    </a>
  </div></Link>))}

</section> </div>)
}

export default PropertiesGrid