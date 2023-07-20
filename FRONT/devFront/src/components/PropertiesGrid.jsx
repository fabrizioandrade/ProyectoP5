import React from 'react'
import '../styles/grid.css'
import { useSelector } from 'react-redux'
import '../styles/properties.css'
const PropertiesGrid = () => {
    const properties=useSelector((state)=>state.properties)
console.log(properties);
  return (
    <div className="w-screen h-screen overflow-y-auto">
<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
{properties.map((property,index)=>(

<div key={index} className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
    <a href="#">
      <img src={property.imgURL[0]} alt="Property" className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <span className="text-gray-400 mr-3 uppercase text-xs">{property.statusType}</span>
        <p className="text-lg font-bold text-black truncate block capitalize">{property.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-black cursor-auto my-3">{property.price}</p>
          <div className="flex justify-between ml-5">
                    <p className="text-sm text-gray-500">
                    {(Math.floor(Math.random()*2))+` amb ${property.descriptionData.beds} dorm. ${property.descriptionData.baths} baño ${property.descriptionData.garage==='true'?`1 coch.`:`0 coch.`}` }</p>
                  </div>
       
        </div>
      </div>
    </a>
  </div>))}

</section> </div>)
}

export default PropertiesGrid