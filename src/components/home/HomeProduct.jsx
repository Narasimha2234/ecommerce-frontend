import React from 'react'
import { useNavigate } from 'react-router-dom'

const HomeProduct = (props) => {
    const{product,usertype}=props
    const isLoggedin=localStorage.getItem(`${usertype}IsLoggedIn`)
    const navigate=useNavigate()
    
    const handleClick=(productDetails)=>{
      if(!isLoggedin){
        window.alert("login or register ")
      }else{
        
        navigate(`/${usertype}/viewproduct`, { state: { productDetails: productDetails } })
      }
    }
  return (
    <div  className='border  h-50 home-product-width ps-2 ms-5 mt-3 bg-body-tertiary' onClick={()=>handleClick(product)}>
        <div className='h-25'>
            <img src={`data:image/jpeg;base64,${product.image}`} alt="product" className=' onhover border-2 m-3'/>
            
        </div>
        <div>
           <h5 className='ms-5'>{product.productname} </h5>
           <h6 className='text-primary ms-5'> Price &#8377; {product.price}</h6>
        </div>
        
    </div>
  )
}

export default HomeProduct