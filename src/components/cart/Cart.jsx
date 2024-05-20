import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDeleteOutline } from "react-icons/md";
import { LineWave } from 'react-loader-spinner'

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const customerId = localStorage.getItem("customerId");
  const [totalCart, setTotalCart] = useState({quantity: 0, totalPrice: 0});
  const[purchase,setPurchase]=useState("")
  useEffect(() => {
    if (customerId) {
      setLoading(true);
      axios.get(`http://localhost:8080/cart/${customerId}`)
        .then(response => {
          setCart(response.data);
          fetchCartDetails(response.data.cartId);
        })
        .catch(error => {
          console.error('Error fetching cart data:', error);
          setLoading(false);
        });
    }
  }, [customerId]);
  
  
  const fetchCartDetails = (cartId) => {
    axios.get(`http://localhost:8080/cart/details/${cartId}`)
      .then(response => {
        setCart(prevCart => ({
          ...prevCart,
          cartDetails: response.data
        }));
        setLoading(false);
        calculateTotal(response.data);
      })
      .catch(error => {
        console.error('Error fetching cart details:', error);
        setLoading(false);
      });
  };

  const increaseQuantity = (cartDetailId) => {
    const detail = cart.cartDetails.find(detail => detail.cartDetailId === cartDetailId);
    if (detail && detail.productId) {
      setLoading(true);
      axios.put(`http://localhost:8080/cart/update`, {
        cartId: cart.cartId,
        productId: detail.productId,
        quantity: detail.quantity + 1
      })
      .then(response => {
        fetchCartDetails(cart.cartId); 
      })
      .catch(error => {
        console.error('Error updating quantity:', error);
        setLoading(false);
      });
    } else {
      console.error('Product or detail not found');
    }
  };
  
  const decreaseQuantity = (cartDetailId) => {
    const detail = cart.cartDetails.find(detail => detail.cartDetailId === cartDetailId);
    if (detail && detail.productId) {
      setLoading(true);
      if (detail.quantity > 1) {
        axios.put(`http://localhost:8080/cart/update`, {
          cartId: cart.cartId,
          productId: detail.productId,
          quantity: detail.quantity - 1
        })
        .then(response => {
          fetchCartDetails(cart.cartId); 
        })
        .catch(error => {
          console.error('Error updating quantity:', error);
          setLoading(false);
        });
      } else {
        console.error('Quantity cannot be less than 1');
        setLoading(false);
      }
    } else {
      console.error('Product or detail not found');
    }
  };
  
  const deleteCartItem = (cartDetailId) => {
    setLoading(true);
    axios.delete(`http://localhost:8080/cart/delete/${cartDetailId}`)
      .then(response => {
        fetchCartDetails(cart.cartId); 
      })
      .catch(error => {
        console.error('Error deleting cart item:', error);
        setLoading(false);
      });
  };
  
  const calculateTotal = (cartDetails) => {
    if (cartDetails) {
      const totalQuantity = cartDetails.reduce((total, detail) => total + detail.quantity, 0);
      const totalPrice = cartDetails.reduce((total, detail) => total + (detail.productPrice * detail.quantity), 0).toFixed(2);
      setTotalCart({ quantity: totalQuantity, totalPrice: totalPrice });
      localStorage.setItem("cart", totalQuantity);
      const event = new Event('cartUpdated');
      window.dispatchEvent(event);
    }
  };

  if (loading) {
    return <div className=" mt-5 pt-5 d-flex justify-content-center ">
      <LineWave
    visible={true}
    height="100"
    width="100"
    color="#4fa94d"
    ariaLabel="line-wave-loading"
    wrapperStyle={{}}
    wrapperClass=""
    firstLineColor=""
    middleLineColor=""
    lastLineColor=""
    /></div>;
  }

  if (!cart || !cart.cartDetails || cart.cartDetails.length === 0) {
    return <div className="table table-striped mt-5 pt-5 text-center">No items in cart.</div>;
  }

  return (
    <div className='mt-5'>
      <table className="table table-striped ">
      <tbody>
        {cart.cartDetails.map((detail, index) => (
          <tr key={detail.cartDetailId}>
            <th scope="row" className="align-middle">{index + 1}</th>
            <td>
              <img
                src={`data:image/jpeg;base64,${detail.productImage}`}
                alt={detail.productName}
                style={{ width: '50px', height: '50px' }}
              />
            </td>
            <td className="align-middle">{detail.productName}</td>
            <td className="align-middle">
              <button className='border-0 bg-color' onClick={() => decreaseQuantity(detail.cartDetailId)}>-</button>
              {detail.quantity}
              <button className='border-0 bg-color' onClick={() => increaseQuantity(detail.cartDetailId)}>+</button>
            </td>
            <td className="align-middle">${(detail.productPrice * detail.quantity).toFixed(2)}</td>
            <td className="align-middle">
              <button className='border-0 bg-color' onClick={() => deleteCartItem(detail.cartDetailId)}><MdOutlineDeleteOutline size={24}/></button>
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4" className="align-middle">Total:</td>
          <td className="align-middle">${totalCart.totalPrice}</td>
          
        </tr>
      </tfoot>
      
    </table>
    <div className='text-center'><button className=' p-2 btn btn-primary text-uppercase ' onClick={()=>setPurchase("thanks for shopping")}>place order</button></div>
        <div className='text-center text-capitalize pt-2 text-danger'><p>{purchase}</p></div>
    </div>
  );
};

export default Cart;
