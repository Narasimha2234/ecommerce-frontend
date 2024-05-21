import React, { useEffect} from 'react'
import { Routes,Route, useNavigate} from 'react-router-dom'
import Signup from '../signup/Signup'
import Signin from '../signin/Signin'
import Nav from '../Nav/Nav'
import AddNewProduct from '../home/AddNewProduct'
import Cart from '../cart/Cart'
import Mobiles from '../home/Mobiles';
import Laptops from '../home/Laptops';
import Tablets from '../home/Tablets';
import SmartWatch from '../home/SmartWatch';
import Tvs from '../home/Tvs';
import Home from '../home/Home'
import ViewProduct from './../home/ViewProduct';
import { jwtDecode } from 'jwt-decode';






const HomeRouting = (props) => {
  const{usertype}=props
  
  const navigate=useNavigate()
 
  const logingHandler=(token)=>{
    
    localStorage.setItem(`${usertype}IsLoggedIn`,token)
    const decodedToken=jwtDecode(token)
    localStorage.setItem(`${usertype}Id`,decodedToken.id)
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
        
        
      }else{
        navigate("home")
        
      }
      
    }
    else{
      navigate("signin")
    }
     
   }, [usertype]);
  
  
  
 const isLoggedIN=localStorage.getItem(`${usertype}IsLoggedIn`)

  return (
    <div className='nav-below'>
       <Nav   isLoggedIN={isLoggedIN}  usertype={usertype}/>
       
        
        <Routes>
      
        
          <Route path='signup' element={<Signup usertype={usertype}/>}></Route>
          <Route path='signin'  element={<Signin usertype={usertype} loginHandler={logingHandler}/>}></Route>
          <Route path='home' element={<Home  />}>  </Route>
          <Route path='addproduct' element={<AddNewProduct />}></Route>
          <Route path='cart' element={<Cart/>}></Route>
          <Route path='mobiles' element={<Mobiles/>}></Route>
          <Route path='laptops' element={<Laptops/>}></Route>
          <Route path='tablets' element={<Tablets/>}></Route>
          <Route path='smartwatches' element={<SmartWatch/>}></Route>
          <Route path='tvs' element={<Tvs/>}></Route>
          <Route path='viewproduct' element={<ViewProduct/>}></Route>
              
             
         </Routes>
    </div>
  )
}

export default HomeRouting