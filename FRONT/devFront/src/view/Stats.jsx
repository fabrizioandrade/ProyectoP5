import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Stats = () => {
const [numOfUsers, setNumOfUsers] = useState(null);const [numOfProperties, setnumOfProperties] = useState(null);
const [forRent, setforRent] = useState(null);
const [forSale, setforSale] = useState(null);
const [numOfAppointments, setnumOfAppointments] = useState(null)
const [numOfFavorites, setnumOfFavorites] = useState(null)


const fetchData=async()=>{
try {
    const loggedUsers=await axios.get("http://localhost:3000/api/users/admin", {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
        credentials: 'include',
      })
      const favorites=await axios.get('http://localhost:3000/api/favorites/admin/all', {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
  })

  const appointments=await axios.get("http://localhost:3000/api/appointments/admin/all", {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
    credentials: 'include',
  })
  
    const properties=await axios.get("http://localhost:3000/api/properties/")

  setnumOfFavorites(favorites.data.length)
setnumOfAppointments(appointments.data.length)
    setforRent((properties.data.filter((data)=>data.statusType==='for_rent')).length)
    setforSale((properties.data.filter((data)=>data.statusType==='for_sale')).length)
    setnumOfProperties(properties.data.length)
    setNumOfUsers(loggedUsers.data.length)
} catch (error) {
    console.log(error);
}
}

    useEffect(()=>{
        fetchData()
    },[])
  return (
<div className=" pt-28 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <ul className=" text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400"  role="tablist">
        
        <li className="w-full">
            <p  type="text" role="tab" aria-controls="faq" aria-selected="false" className="inline-block w-full p-4 rounded-tr-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600">Estadisticas</p>
        </li>
    </ul>
    <div  className="border-t border-gray-200 dark:border-gray-600">
        <div className=" p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"  role="tabpanel" aria-labelledby="stats-tab">
            <dl className="grid grid-cols-2 gap-8 p-4 mx-auto text-gray-900 sm:grid-cols-3 xl:grid-cols-6 dark:text-white sm:p-8">
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{numOfUsers}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">{numOfUsers!=1?(`Usuarios registrados`):('Usuario registrado')}</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{numOfProperties}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">Publicaciones</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{forSale}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">{forSale!=1?(`Casas en venta`):(`Casa en venta`)}</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{forRent}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">{forRent!=1?(`Casas en renta`):(`Casa en renta`)}</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{numOfAppointments}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">{numOfAppointments!=1?(`Citas confirmadas`):(`Cita confirmada`)}</dd>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <dt className="mb-2 text-3xl font-extrabold">{numOfFavorites}</dt>
                    <dd className="text-gray-500 dark:text-gray-400">{numOfFavorites!=1?(`Propiedades en favoritos`):(`Propiedad en favoritos`)}</dd>
                </div>
        
            </dl>
        </div>
    </div>
</div>  )
}

export default Stats