import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeProduct.css'; 

const HomeProduct = (props) => {
    const { product, usertype } = props;
    const isLoggedin = localStorage.getItem(`${usertype}IsLoggedIn`);
    const navigate = useNavigate();

    const handleClick = (productDetails) => {
        if (!isLoggedin || !usertype) {
            window.alert("Please login or register");
        } else {
            navigate(`/${usertype}/viewproduct`, { state: { productDetails: productDetails } });
        }
    };

    return (
        <div className='product-card' onClick={() => handleClick(product)}>
            <div className='product-image-container'>
                <img src={`data:image/jpeg;base64,${product.image}`} alt="product" className='product-image' />
            </div>
            <div className='product-info'>
                <h5>{product.productname}</h5>
                <h6 className='product-price'>Price &#8377; {product.price}</h6>
            </div>
        </div>
    );
}

export default HomeProduct;
