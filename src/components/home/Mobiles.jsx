import React, { useEffect, useState } from 'react'
import Product from './Product';
import axios from 'axios';

const Mobiles = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const[products,setProducts]=useState([])
  useEffect(()=>{
    axios.get(`${apiUrl}products/get/mobiles`)
    .then((res)=>{
      setProducts(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])
 
  return (
    <div>
     {products.map((each)=>{
      return(
        <Product product={each} key={each.id}/>
      )
     })}
    </div>
  )
}

export default Mobiles