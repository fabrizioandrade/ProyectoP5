import './App.css'
import AuthWrapper from './common/AuthWrapper'
import { Login } from './components/Login'
import Register from './components/Register'
import { Route, Routes } from "react-router";

function App() {

  return (
<div > 
<AuthWrapper/> 
{/* <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/login"} element={<Login />} />
</Routes> */}
</div>
  )
}

export default App
