import React, { useState } from 'react'
import foto from '../assets/ravi-avaala-2d4lAQAlbDA-unsplash.jpg'
import Register from '../components/Register'
import { Login } from '../components/Login'
const AuthWrapper = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div
    className="bg-cover bg-center min-h-screen w-screen flex items-center"
    style={{ backgroundImage: `url(${foto})` }}
  >
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          {showLogin ? (
            <Login toggleAuthComponent={toggleAuthComponent} />
          ) : (
            <Register toggleAuthComponent={toggleAuthComponent} />
          )}
        </div>
        <div className="col-span-1">
       
        </div>
      </div>
    </div>
  </div>
  )
}

export default AuthWrapper