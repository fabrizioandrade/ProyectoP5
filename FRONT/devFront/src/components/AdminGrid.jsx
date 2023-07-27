import React, { Fragment } from 'react'
import '../styles/grid.css'
import { useSelector } from 'react-redux'
import '../styles/properties.css'
import { Link } from 'react-router-dom'
const PropertiesGrid = () => {
    const properties=useSelector((state)=>state.properties)
  return (
    <div className="w-screen h-screen ">
            <h1 className="text-black text-3xl font-bold mt-10 ml-5 ">Nuestras Propiedades</h1>
<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 p-0">
{properties.map((property,index)=>(

<Link key={index} to={`property/${property.id}`}><div  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={property.imgURL[0]} alt="Property" className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <span className="text-blue-400 mr-3 uppercase text-xs">{property.statusType}</span>
        <p className="text-lg font-bold text-blue-600 truncate block capitalize">{property.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-blue-700 cursor-auto my-3">USD{property.price}</p>
        
       
        </div>
      </div>
  </div></Link>
  ))}

</section> </div>)
}

export default PropertiesGrid