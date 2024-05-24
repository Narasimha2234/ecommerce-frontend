import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import img from "./logo.avif";
import "./ViewProduct.css"
const ViewProduct = () => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const location = useLocation();
    const product = location.state.productDetails;
    const usertype = localStorage.getItem("usertype");
    const customerId = localStorage.getItem(`${usertype}Id`); 
    const navigate=useNavigate();
    const addToCart = async () => {
        if (usertype === "customer") {
            try {
                const response = await axios.post(`${apiUrl}cart/add`, {
                    customerId: customerId,
                    productId: product.id,
                    quantity: 1
                });
                if (response.status === 200) {
                    
                    navigate("/customer/cart")
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
                alert("Failed to add product to cart");
            }
        }
    };

    const handleButtonClick = (existingProductDetails) => {
        if (usertype === "customer") {
            addToCart();
        } else if (usertype === "seller") {
          if(existingProductDetails===product){
            navigate(`/${usertype}/addproduct`,{state:{existingProduct:existingProductDetails}})
          }
          if(existingProductDetails===product.id){
            axios.delete(`${apiUrl}products/deleteProduct/${customerId}/${existingProductDetails}`)  
                  .then((res)=>{
             
                     navigate(`/seller/home`)
                   })
                   .catch((error)=>window.alert("this product is in customers cart can not delete it"))    
          }
        }
    };

    return (


    <div className='view'>
        <div className="view-container">
            <div className=" left-side">
                <img  src={`data:image/jpeg;base64,${product.image}`} alt={product.name}  className='image'/>
                <div className="buttons">
                    <button className={`${usertype==="customer"?"add-to-cart":"update"}`}onClick={()=>handleButtonClick(product)}>{usertype === "customer" ? "add to cart" : "update"}</button>
                    {usertype==="seller"&&(<button className="delete" onClick={()=>handleButtonClick(product.id)}>Delete</button>)}
                </div>
            </div> 
            <div className="product-details">
                <h1>{product.brandname} {product.productname}</h1>
                <p className='assured-container ms-1'>
                    <img src={img} alt="" className='assured-img'/>
                        <span className='assured-badge'>Assured</span>
                    </p>
                    <p class=''>Free delivery</p>
                    <p className=''>{product.description}</p>                   
                <table class='table table-borderless'>
                    <tbody>
                        <h6 className='ms-2'>details</h6>
                        <tr>
                            <th scope='row'>Name</th>
                            <td>{product.productname}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Brand Name</th>
                            <td>{product.brandname}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Category</th>
                            <td>{product.category}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Quantity</th>
                            <td>{product.quantity}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Status</th>
                            <td>{product.status}</td>
                        </tr>
                        <tr>
                            <th scope='row'>Price</th>
                            <td className='product-price'>{product.price}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </div>

    );
}

export default ViewProduct;