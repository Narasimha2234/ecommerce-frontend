import React, { useEffect, useState } from 'react'
import image from "../Nav/download.png"
import {Link, useNavigate} from "react-router-dom"


 import "../Nav/home.css"

const Nav = (props) => {
  const navigate=useNavigate()
 
    const{handleRoleChange,isLoggedIN,usertype}=props
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
         navigate(`/${usertype}/signin`)
         window.history.replaceState(null, '', '/signin');
        
    }
     
    
  return (
    
        <nav class="navbar navbar-fix bg-body-secondary">
        <div class="container-fluid">
            <img class="navbar-brand ms-5 img" src={image} alt=""></img>
            <form class="d-flex" role="search">
              {!usertype &&(
                  <div>
                    <Link to={"/customer"} class="btn btn-outline-success"  onClick={() => handleRoleChange("customer")} >customer</Link>
                     <Link to={"/seller"} class="btn btn-outline-success ms-5 me-3"  onClick={() => handleRoleChange("seller")} >seller</Link>
                  </div>
              )}
              {usertype==="seller" && !isLoggedIN &&(
                 <div>
                  <Link to={"/seller/signup"} class="btn btn-outline-success" type="submit">SignUp</Link>
                  <Link to={"/seller/signin"} class="btn btn-outline-success ms-5 " type="submit">SignIn</Link>
                 </div>
              )}
              {usertype==="seller" && isLoggedIN &&(
                 <div>
                  <Link to={"/seller/mobiles"} class={`btn btn-outline-success me-5 ${activeButton==="mobiles"?"active":""}`} onClick={()=>trackActiveButton("mobiles")} >Mobiles</Link>
                 <Link to={"/seller/tablets"} class={`btn btn-outline-success me-5 ${activeButton==="tablets"?"active":""}`}  onClick={()=>trackActiveButton("tablets")} >Tablets</Link>
                  <Link to={"/seller/laptops"} class={`btn btn-outline-success me-5 ${activeButton==="laptops"?"active":""}`}  onClick={()=>trackActiveButton("laptops")} >Laptops</Link>
                 <Link to={"/seller/smartwatches"} class={`btn btn-outline-success me-5 ${activeButton==="smartwatches"?"active":""}`}  onClick={()=>trackActiveButton("smartwatches")} >Smart Watches</Link>
                  <Link to={"/seller/tvs"} class={`btn btn-outline-success me-5 ${activeButton==="tvs"?"active":""}`}  onClick={()=>trackActiveButton("tvs")} >TV's</Link>
                  <Link to={"/seller/home"} class={`btn btn-outline-success me-5 ${activeButton==="all products"?"active":""}`}  onClick={()=>trackActiveButton("all products")} >Home</Link>
                  <Link to={"/seller/addproduct"} class={`btn btn-outline-success me-5 ${activeButton==="add"?"active":""}`}  onClick={()=>trackActiveButton("add")} >Add+</Link>
                  <button  class="btn btn-outline-success ms-5" onClick={()=>logoutHandler(usertype)}>LogOut</button>
                 </div>
              )}
              {usertype==="customer" &&!isLoggedIN&&(
                <div>
                  <Link to={"/customer/signup"} class="btn btn-outline-success" type="submit" >SignUp</Link>
                  <Link to={"/customer/signin"} class="btn btn-outline-success ms-5 " type="submit">SignIn</Link>
                </div>
              )}
              {usertype==="customer" && isLoggedIN&&(
                <div>
                  <Link to={"/customer/mobiles"} class={`btn btn-outline-success me-5 ${activeButton==="mobiles"?"active":""}`} onClick={()=>trackActiveButton("mobiles")} >Mobiles</Link>
                 <Link to={"/customer/tablets"} class={`btn btn-outline-success me-5 ${activeButton==="tablets"?"active":""}`}  onClick={()=>trackActiveButton("tablets")}>Tablets</Link>
                  <Link to={"/customer/laptops"} class={`btn btn-outline-success me-5 ${activeButton==="laptops"?"active":""}`}  onClick={()=>trackActiveButton("laptops")}>Laptops</Link>
                 <Link to={"/customer/smartwatches"} class={`btn btn-outline-success me-5 ${activeButton==="smartwatches"?"active":""}`}  onClick={()=>trackActiveButton("smartwatches")}>Smart Watches</Link>
                  <Link to={"/customer/tvs"} class={`btn btn-outline-success me-5 ${activeButton==="tvs"?"active":""}`}  onClick={()=>trackActiveButton("tvs")}>TV's</Link>
                  <Link to={"/customer/home"} class={`btn btn-outline-success me-5 ${activeButton==="all products"?"active":""}`}  onClick={()=>trackActiveButton("all products")} >Home</Link>
                   <Link to={"/customer/cart"} class={`btn btn-outline-success me-5 ${activeButton==="cart"?"active":""}`}  onClick={()=>trackActiveButton("cart")}>Cart {totalQuantity} </Link>
                   <button  class="btn btn-outline-success ms-5" onClick={()=>logoutHandler(usertype)} >LogOut</button>
                </div>
              )}
            
            
            </form>    
        </div>
        </nav>
       
       
    
  )
}

export default Nav