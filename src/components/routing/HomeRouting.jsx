import React, { useEffect, useState,useRef} from 'react'
import { Routes,Route, useNavigate, Navigate} from 'react-router-dom'
import Signup from '../signup/Signup'
import Signin from '../signin/Signin'
import Nav from '../Nav/Nav'
import AddNewProduct from '../home/AddNewProduct'
import Cart from '../cart/Cart'
import Home from '../home/Home'
import ViewProduct from './../home/ViewProduct';
import { jwtDecode } from 'jwt-decode';
import DefaultHome from '../home/DefaultHome'






const HomeRouting = () => {
  const [search,setSearch]=useState("")
  
  const navigate=useNavigate()
 
  const logingHandler=(token)=>{
    
    localStorage.setItem(`IsLoggedIn`,token)
    const decodedToken=jwtDecode(token)
    localStorage.setItem(`Id`,decodedToken.id)
    localStorage.setItem("userRole",decodedToken.role)
  }
  
  const handleSearch=(value)=>{
    setSearch(value)
  }

 
  useEffect(() => {
    const token=localStorage.getItem(`IsLoggedIn`)
    
    if(token){
      const decodedToken=jwtDecode(token)
      const currentTime=Date.now()/1000
      localStorage.setItem(`Id`,decodedToken.id)
      if(decodedToken.exp<currentTime){
        localStorage.removeItem(`IsLoggedIn`)
        navigate(`/`)
        
      }else{
         navigate(`/home`)
        
       }
      
    }
    else{
      navigate(`/`)
    }
     
   }, []);
  
  
  
 const isLoggedIN=localStorage.getItem(`IsLoggedIn`)

  return (
    <div className=''>
       <Nav   isLoggedIN={isLoggedIN}   handleSearch={handleSearch}/>
       
        
        <Routes>
           <Route path='/' element={<DefaultHome/>} />
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/signin'  element={<Signin  loginHandler={logingHandler}/>}></Route>
          <Route path='/home' element={<Home search={search} />}>  </Route>
          <Route path='/addproduct' element={<AddNewProduct />}></Route>
          <Route path='/cart' element={<Cart/>}></Route>
          <Route path='/viewproduct' element={<ViewProduct/>}></Route>
             
             
         </Routes>
    </div>
  )
}

export default HomeRouting