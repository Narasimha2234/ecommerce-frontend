import React, { useEffect, useState } from 'react'
import Product from './Product';
import axios from 'axios';

const SmartWatch = () => {
  const[products,setProducts]=useState([])
  useEffect(()=>{
    axios.get(`http://localhost:8080/products/get/smartwatch`)
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

export default SmartWatch