import React, { useEffect, useState } from 'react'
import HomeProduct from './HomeProduct'
import axios from 'axios'
import { MutatingDots } from 'react-loader-spinner'

const DefaultHome = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const[products,setProducts]=useState([])
  const [loading, setLoading] = useState(true);
  
    useEffect(()=>{
      setLoading(true);    
        axios.get(`${apiUrl}products/getallproducts`)
        .then((res)=>{
          setLoading(false);
          setProducts(res.data)
        })
        .catch((error)=>{console.log(error)
          setLoading(false);
        })
      
      
    },[])
   if(loading){
    return(
      <div className=" mt-5 pt-3 d-flex justify-content-center">
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
    <div className='d-flex flex-wrap nav-below mt-2 '>
      
      {products.map((each)=>{
        return(
            <HomeProduct product={each}  key={each.id}/>
        )
        
      })}
      
    </div>
  )
}

export default DefaultHome