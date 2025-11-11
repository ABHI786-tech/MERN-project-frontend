import React from 'react';
import './index.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login'
import RegisterPage from './pages/register'
import Navbar from './pages/navbar'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Forgetpassword from "./pages/forgetPassword"
import ResetPassword from "./pages/resetPassword";
import ProtectedLayout from "./layout/ProtectedLayout"
import AddEmployee from "./pages/AddEmployee"
import Dashboard from "./pages/dashboard"
import AllEmployee from "./pages/AllEmployee"
import UpdateEmployee from "./pages/updateEmployee"
import Footer from "./pages/footer"



function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path='/' element={<Dashboard />} />
          <Route path='/addemployee' element={<AddEmployee />} />
          <Route path='/allemployee' element={<AllEmployee />} />
          <Route path='/updateemployee/:id' element={<UpdateEmployee />} />

        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/forgetpassword' element={<Forgetpassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        theme="colored"

      />
      <Footer />
    </div>
  )
}

export default App;
