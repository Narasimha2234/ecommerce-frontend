import React, { useEffect, useState } from 'react'
import image from "../Nav/logo.avif"
import {Link, useNavigate} from "react-router-dom"


 import "./home.css"

const Nav = (props) => {
  const navigate=useNavigate()
 
    const{handleRoleChange,handleSearch,isLoggedIN,usertype}=props
    const[activeButton,setActiveButton]=useState("all products")
    const [totalQuantity, setTotalQuantity] = useState(localStorage.getItem('cart') || 0);

    useEffect(() => {
      const handleStorageChange = () => {
        setTotalQuantity(localStorage.getItem('cart') || 0);
      };
      window.addEventListener('cartUpdated', handleStorageChange);
      window.addEventListener('storage', handleStorageChange);
      return () => {
        window.removeEventListener('cartUpdated', handleStorageChange);
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
    const trackActiveButton=(active)=>{
        setActiveButton(active)
    }
    const logoutHandler=(usertype)=>{
         localStorage.removeItem(`${usertype}IsLoggedIn`)
         localStorage.removeItem(`${usertype}Id`)
         navigate(`/`,{replace:true})
         
        
    }
     
    
  return (
    
        <nav class="navbar navbar-fix ">
        <div class="container-fluid ">
            <img class="navbar-brand ms-5 img" src={image} alt=""></img> <h3 className='me-5 pe-4'>𝘰𝘯𝘭𝘪𝘯𝘦 𝘴𝘩𝘰𝘱𝘱𝘪𝘯𝘨</h3>
           {usertype && isLoggedIN &&( <input type="text" className='form-control border-2 w-50 ms-5 ' placeholder="search" name="" id=""  onChange={(e)=>handleSearch(e.target.value)}/>)}
            <form class="d-flex" role="search">
              {!usertype &&(
                  <div>
                    <Link to={"/customer"} class="btn btn-outline-success"  onClick={() => handleRoleChange("customer")} >customer</Link>
                     <Link to={"/seller"} class="btn btn-outline-success ms-5 me-3"  onClick={() => handleRoleChange("seller")} >seller</Link>
                  </div>
              )}
              {usertype && !isLoggedIN &&(
                 <div>
                  <Link to={`/${usertype}/signup`} class="btn btn-outline-success" type="submit">SignUp</Link>
                  <Link to={`/${usertype}/signin`} class="btn btn-outline-success ms-5 " type="submit">SignIn</Link>
                 </div>
              )}
              {usertype && isLoggedIN &&(
                 <div>
            
                  
                  <Link to={`/${usertype}/home`} class={`btn btn-outline-success me-3 ms-5  ${activeButton==="all products"?"active":""}`}  onClick={()=>trackActiveButton("all products")} >Home</Link>
                  {usertype==="seller" &&(<Link to={`/${usertype}/addproduct`} class={`btn btn-outline-success me-3 ${activeButton==="add"?"active":""}`}  onClick={()=>trackActiveButton("add")} >Add+</Link>)}
                  {usertype==="customer"&&(<Link to={`/${usertype}/cart`} class={`btn btn-outline-success me-3 ${activeButton==="cart"?"active":""}`}  onClick={()=>trackActiveButton("cart")}>Cart {totalQuantity} </Link>)}
                  <button  class="btn btn-outline-success " onClick={()=>logoutHandler(usertype)}>LogOut</button>
                 </div>
              )}
              
            
            
            </form>    
        </div>
        </nav>
       
       
    
  )
}

export default Nav