import React from 'react'
import Navbar from '../common/Navbar'
import { Route, Routes } from 'react-router'
import PropertiesGrid from './PropertiesGrid'
import PropertyCard from '../common/PropertyCard'

const Home = () => {

  return (
    <div className='w-screen'>
<Navbar/>
<Routes>
<Route path={'/'} element={<PropertiesGrid/>}/>
<Route path={'property/:id'} element={<PropertyCard/>}/>
</Routes>
    </div>
  )
}

export default Home