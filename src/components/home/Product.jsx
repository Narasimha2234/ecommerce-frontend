import React, { useState } from 'react'
import img from"./logo.avif"
import { useNavigate } from 'react-router-dom'

const Product = ({product}) => {
  const usertype=localStorage.getItem("usertype")
  const [hover,setHover]=useState(false)
  const navigate=useNavigate()
  
  const handleClick=(productDetails)=>{
    
    navigate(`/${usertype}/viewproduct`, { state: { productDetails: productDetails } })
  }
    
    const onHoverHandler=(status)=>{
      setHover(status)
    }
  return (
    <div  className=' w-75 m-auto h-100 mt-5 d-flex onhover-on-home-product'onMouseOver={()=>onHoverHandler(true)} onMouseLeave={()=>onHoverHandler(false)} onClick={()=>handleClick(product)}>
       
        <div className=' w-25 h-100 '>
           <div  className='h-50 w-50 mt-2 mb-3 ms-5  product-img'> <img src={`data:image/jpeg;base64,${product.image}`} alt=""/></div>
        </div>
        <div className='h-100 w-75 d-flex' >
            
                <div className=' w-75  mt-1 '>
                    
                       
                            <ul className='text-secondary'>
                            <h3 className={` text-capitalize ${hover?"text-primary ":"text-dark"}`}>{product.productname}</h3>
                            <li >{product.brandname}</li>
                            <li >{product.category}</li>
                            <li >{product.description}</li>
                            <li >{product.quantity}</li>
                            <li >{product.status}</li>
                        </ul>
                          
                   
                </div>
                <div className=' w-25'> 
                     
                        
                        <div className='mt-3  ms-4'>
                          <h3 ><h3 className='text-danger pe-2 text-capitalize'> price</h3>&#8377; {product.price}</h3>
                          <p className='assured-container' ><img src={img} alt="" className='assured-img ' /><span className='assured-badge'>Assured</span></p>
                          <p className='text-secondary'>free delivey</p>
                        </div>
                      
                </div>
        </div>

    </div>
  )
}

export default Product