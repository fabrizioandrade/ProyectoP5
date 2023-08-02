import React, { useState } from 'react'
import foto from '../../public/assets/ravi-avaala-2d4lAQAlbDA-unsplash.jpg'
import Register from '../components/Register'
import { Login } from '../components/Login'
const AuthWrapper = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuthComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div
    className="bg-cover "
    style={{ backgroundImage: `url(${foto})` }}
  >
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="col-span-2  flex items-center justify-center ">
          {showLogin ? (
            <Login toggleAuthComponent={toggleAuthComponent} />
          ) : (
            <Register toggleAuthComponent={toggleAuthComponent} />
          )}
        </div>
      </div>
    </div>
  </div>
  )
}

export default AuthWrapper