import React from 'react'
import Navbar from '../common/Navbar'
import { Route, Routes } from 'react-router'
import PropertiesGrid from './PropertiesGrid'
import PropertyCard from '../common/PropertyCard'
import CustomerView from '../view/CustomerView'

const Home = () => {

  return (
    <div className='w-screen'>
<Navbar/>
<Routes>
<Route path={'/'} element={<PropertiesGrid/>}/>
<Route path={'property/:id'} element={<PropertyCard/>}/>
<Route path={'me/profile'} element={<CustomerView/>}/>

</Routes>
    </div>
  )
}

export default Home