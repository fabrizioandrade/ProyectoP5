import React from 'react'
import Navbar from '../common/Navbar'
import { Route, Routes } from 'react-router'
import PropertiesGrid from './PropertiesGrid'

const Home = () => {

  return (
    <div className='w-screen'>
<Navbar/>
< PropertiesGrid/>

    </div>
  )
}

export default Home