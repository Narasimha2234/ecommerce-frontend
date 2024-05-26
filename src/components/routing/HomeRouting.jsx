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






const HomeRouting = (props) => {
  const{usertype}=props
  const [search,setSearch]=useState("")
  
  const navigate=useNavigate()
 
  const logingHandler=(token)=>{
    
    localStorage.setItem(`${usertype}IsLoggedIn`,token)
    const decodedToken=jwtDecode(token)
    localStorage.setItem(`${usertype}Id`,decodedToken.id)
  }
  
  const handleSearch=(value)=>{
    setSearch(value)
  }

 
  useEffect(() => {
    const token=localStorage.getItem(`${usertype}IsLoggedIn`)
    
    if(token){
      const decodedToken=jwtDecode(token)
      const currentTime=Date.now()/1000
     
      if(usertype){
        localStorage.setItem(`${usertype}Id`,decodedToken.id)
      }
      if(decodedToken.exp<currentTime){
        localStorage.removeItem(`${usertype}IsLoggedIn`)
        navigate(`/${usertype}/signin`)
        
      }//else{
      //   navigate(`/${usertype}/home`,{replace:true})
        
      // }
      
    }
    else{
      navigate(`/${usertype}/signin`)
    }
     
   }, [usertype]);
  
  
  
 const isLoggedIN=localStorage.getItem(`${usertype}IsLoggedIn`)

  return (
    <div className=''>
       <Nav   isLoggedIN={isLoggedIN}  usertype={usertype} handleSearch={handleSearch}/>
       
        
        <Routes>
          <Route path='signup' element={<Signup usertype={usertype}/>}></Route>
          <Route path='signin'  element={<Signin usertype={usertype} loginHandler={logingHandler}/>}></Route>
          <Route path='home' element={<Home search={search} />}>  </Route>
          <Route path='addproduct' element={<AddNewProduct />}></Route>
          <Route path='cart' element={<Cart/>}></Route>
          <Route path='viewproduct' element={<ViewProduct/>}></Route>
          <Route path='/' element={<Navigate to={`/${usertype}/home`} replace />} />   
             
         </Routes>
    </div>
  )
}

export default HomeRouting