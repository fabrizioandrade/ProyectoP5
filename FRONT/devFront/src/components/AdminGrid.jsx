import React from 'react'
import '../styles/grid.css'
import { useSelector } from 'react-redux'
import '../styles/properties.css'
import { Link, useParams } from 'react-router-dom'
import computer from '../../public/assets/computer.png'

const AdminGrid = () => {
    const data=useSelector((state)=>state.adminData)
    console.log('data',data);
   const optionData=useSelector((state)=>state.option)
   console.log('optiondata',optionData);
  return (
    <div className="w-screen h-screen ">
            <h1 className="text-black text-3xl font-bold mt-10 ml-5 ">{optionData==='Propiedades'?(`Nuestras propiedades`):(`Nuestros usuarios`)}</h1>
<section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 p-0">
{data.map((dataObject,index)=>(

<Link key={index} ><div  className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
      <img src={dataObject.imgURL?dataObject.imgURL[0]:computer} alt="Property" className="h-80 w-72 object-cover rounded-t-xl" />
      <div className="px-4 py-3 w-72">
        <span className="text-blue-400 mr-3 uppercase text-xs">{dataObject.type==='property'?(`ID propiedad: ${dataObject.id}`):(`ID usuario: ${dataObject.id}`)}</span>
        <p className="text-lg font-bold text-blue-600 truncate block capitalize">{dataObject.name}</p>
        <div className="flex items-center">
          <p className="text-lg font-semibold text-blue-700 cursor-auto my-3">{dataObject.type==='property'?(`USD${dataObject.price}`):(`Email: ${dataObject.email}`)}</p>
        
       
        </div>
      </div>
  </div></Link>
  ))}

</section> </div>)
}

export default AdminGrid