import React, { useEffect, useState } from 'react'
import HomeProduct from './HomeProduct'
import axios from 'axios'
import { MutatingDots } from 'react-loader-spinner'
import Product from './Product'
import { Link } from 'react-router-dom'

const Home = ({search}) => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const userRole=localStorage.getItem("userRole")
  const userId=localStorage.getItem(`Id`)
  const[products,setProducts]=useState([])
 
  const [loading, setLoading] = useState(true);
    useEffect(()=>{
      setLoading(true);
      if(userRole==="SELLER" && userId){
        
        axios.get(`${apiUrl}products/getproducts/${userId}`)
    .then((res)=>{
      setLoading(false);
      setProducts(res.data)
    })
    .catch((error)=>{console.log(error)
      setLoading(false);
    })
      }
      if(userRole==="CUSTOMER"   && userId){
        axios.get(`${apiUrl}products/getallproducts`)
        .then((res)=>{
          setLoading(false);
          setProducts(res.data)
        })
        .catch((error)=>{console.log(error)
          setLoading(false);
        })
      } 
    },[])
    
    const searchProducts = search
    ? products.filter((product) => 
        product.productname.toLowerCase().includes(search.toLowerCase()) ||
        product.brandname.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      )
    : [];
      
    
    
   if(loading){
    return(
      <div className=" mt-5 pt-4 d-flex justify-content-center ">
        <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        secondaryColor="#4fa94d"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        /></div>
    )
   }
  return(
    <div className='d-flex flex-wrap ms-5 mt-3 nav-below'>
      
      {
        search? searchProducts.map((product)=>{
            return(
              <Product product={product} key={product.id}/>
            )
        }): products.length===0 && userRole==="SELLER"?
       <div className=' w-100  mt-5 d-flex justify-content-center align-content-center text-danger'> <h4>you dont have products click  <Link to='/addproduct'  className='text-decoration-none'>here </Link>to add</h4></div>
        :
        products.map((each)=>{
          return(
              <HomeProduct product={each} userRole={userRole} key={each.id}/>
          )
          
        })
      }
      
    </div>
  )
}

export default Home