import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'


const AddNewProduct = () => {
    const navigate=useNavigate();
    const usertype=localStorage.getItem("usertye")
    const userId=localStorage.getItem(`sellerId`)
    const location=useLocation()
    
    const existingProduct = location.state?.existingProduct || {};
    
    const operation = existingProduct.id ? "updateProduct" : "saveProduct";

   
    const [imagePreview, setImagePreview] = useState(existingProduct?.image ? `data:image/jpeg;base64,${existingProduct.image}` : null);
    const[productDetails,setProductDetails]=useState({
        "brandname":"",
        "category":"",
        "description":"",
        "image":null,
        "price":0.0,
        "productname":"",
        "quantity":0,
        "status":""    
    })
    const[errors,setErrors]=useState({
    "productname":"",
    "description":"",
    "image":"",
    "category":"",
    "price":"",
    "status":"",
    "brandname":"",
    "quantity":""
    })
    useEffect(() => {
        if (existingProduct?.image) {
            setImagePreview( `data:image/jpeg;base64,${existingProduct.image}`);
        }
    }, [existingProduct?.image]);
    const onChamgeHandler=(e)=>{
        const{name,value}=e.target
        setProductDetails({...productDetails,[name]:value})
    }
    const onImageChamgeHandler = (e) => {
        const imageFile = e.target.files[0]; 
        setProductDetails({ ...productDetails, image: imageFile });
        setImagePreview(URL.createObjectURL(imageFile));
      };
    const submitHandler=(e)=>{
        e.preventDefault()
        
         const valid=formvalidation(productDetails)
        
          if (valid && operation==="saveProduct"){
           
           
                // const formData = new FormData();
                // Object.keys(productDetails).forEach(key => {        //short code
                //     formData.append(key, productDetails[key]);
                // });
                const formData = new FormData();
                formData.append('brandname', productDetails.brandname);
                formData.append('category', productDetails.category);
                formData.append('description', productDetails.description);
                formData.append('image', productDetails.image); 
                formData.append('price', productDetails.price);
                formData.append('productname', productDetails.productname);
                formData.append('quantity', productDetails.quantity);
                formData.append('status', productDetails.status); 
               axios.post(`http://localhost:8080/products/saveProduct/${userId}`,formData, {
                headers: {
                  'Content-Type': 'multipart/form-data', 
                },
              })
               .then((res)=>{
                console.log(res.data);
                navigate("/seller/home")
               })
               .catch((error)=>console.log(error.data))
            
         }else if(operation==="updateProduct"){
            const formData = new FormData();                              
                Object.keys(productDetails).forEach(key => {              
                                           
                     formData.append(key, productDetails[key]);             
                 });                                                                
                 axios.put(`http://localhost:8080/products/updateProduct/${userId}/${existingProduct.id}`,formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data', 
                    },
                  })  
                  .then((res)=>{
                    console.log(res.data);
                    navigate(`/seller/viewproduct`, { state: { productDetails: res.data } })
                   })
                   .catch((error)=>console.log(error.data))                                                           
               
               
         }
          
    }
       

    const formvalidation=(productDetails)=>{
        let valid=true
        let newErrors ={}
        if(!productDetails.productname){
            valid=false
            newErrors.productname="invalid product name"
         }
        
         if(!productDetails.description){
            valid=false
            newErrors.description="invalid description"
         }
         if (!productDetails.image && !existingProduct?.image) {
            valid = false;
            newErrors.image = "Please upload product image";
        }
         if(!productDetails.category){
            valid=false
            newErrors.category="select any one option"
         }
         if(!productDetails.price){
            valid=false
            newErrors.price="enter price"
         }
         if(!productDetails.status){
            valid=false
            newErrors.status="select any one option"
         }
         if(!productDetails.brandname){
            valid=false
            newErrors.brandname="invalid brand name"
         }
         if(!productDetails.quantity){
            valid=false
            newErrors.quantity="enter products quantuty"
         }

         setErrors(newErrors)
         return valid

    }
    
  return (
    <div className='mt-5'>
        <form action="" onSubmit={submitHandler} className=''>
            <table className='w-50 m-auto ' >
                 <tr>
                    <td><label htmlFor="productname" className='form-label '>Product Name</label></td>
                    <td className='pb-2'>
                       <div className='form-group'>
                       <input type="text" name="productname"   id="productname" className={`form-control text-center  ${errors.productname?"error-placeholed":""}`}  onChange={onChamgeHandler}  placeholder={existingProduct.productname?existingProduct.productname:errors.productname?`${errors.productname}`:"enter product name"}   />
                       
                       </div>
                    </td>
                </tr>
                            
                <tr >
                    <td><label htmlFor="description" className='form-label'>Description</label></td>
                    <td className='pb-2'><input type="text"   name="description" id="description"  className={`form-control text-center  ${errors.description?"error-placeholed":""}`}  onChange={onChamgeHandler}  placeholder={existingProduct.description?existingProduct.description:errors.description?`${errors.description}`:"enter product description"}/></td>
                </tr>
                <tr >
                    <td><label htmlFor="image" className='form-label'>image</label></td>
                    <td className='pb-2'>
                    {imagePreview&&(
                                <div>
                                    <img src={imagePreview} alt="Existing product" style={{ width: '50px', height: '50px' }} />
                                </div>
                    )}    
                        <input type="file" required  name="image" id="image" className='form-control'  onChange={onImageChamgeHandler} /></td>
                </tr>
                <tr >
                    <td><label className='form-label' htmlFor="category">category</label></td>
                    <td className='pb-2'>
                            <select name="category" id="category" className={`form-control text-center  ${errors.category?"text-danger":""}`}  onChange={onChamgeHandler} >
                                <option value={`${existingProduct.category?existingProduct.category:errors.category?`${errors.category}`:"disabled hidden"}`}>{existingProduct.category?existingProduct.category:errors.category?errors.category:""}</option>
                                <option value="mobiles">mobiles</option>
                                <option value="laptops">laptops</option>
                                <option value="smartwatch">smartwatch</option>
                                <option value="tablets">tablets</option>
                                <option value="tv">tv</option>
                                <option value="clothes">clothes</option>
                                
                                 </select>
                                
                    </td>
                </tr>
                <tr >
                    <td><label htmlFor="price" className='form-label'>price</label></td>
                    <td className='pb-2'><input type="number"  name="price" id="price" className={`form-control text-center  ${errors.price?"error-placeholed":""}`}  onChange={onChamgeHandler}  placeholder={existingProduct.price?existingProduct.price:errors.price?`${errors.price}`:"enter product price"}/></td>
                </tr>
                <tr >
                    <td><label htmlFor="status" className='form-label'>status</label></td>
                    <td className='pb-2'>
                    <select name="status" id="status"  className={`form-control text-center  ${errors.status?"text-danger":""}`}  onChange={onChamgeHandler} >
                                <option value={`${existingProduct.status?existingProduct.status:errors.status?`${errors.status}`:"disabled hidden"}`} >{existingProduct.status?existingProduct.status:errors.status?errors.status:""}</option>
                                <option value="in stock">in stock</option>
                                <option value="out of stock">out of stock</option>
                                <option value="only few left">only few left</option>
                                </select>
                    </td>
                </tr>
                <tr >
                    <td><label htmlFor="brandname" className='form-label'>brand name</label></td>
                    <td className='pb-2'><input type="text"  name="brandname" id="brandname"className={`form-control text-center  ${errors.brandname?"error-placeholed":""}`}  onChange={onChamgeHandler}  placeholder={existingProduct.brandname?existingProduct.brandname:errors.brandname?`${errors.brandname}`:"enter brand name"}/></td>
                </tr>
                <tr >
                    <td><label htmlFor="quantity" className='form-label'>stock quantity</label></td>
                    <td className='pb-2'><input type="number"  name="quantity" id="quantity" className={`form-control text-center  ${errors.quantity?"error-placeholed":""}`}  onChange={onChamgeHandler}  placeholder={existingProduct.quantity?existingProduct.quantity:errors.quantity?`${errors.quantity}`:"enter products quantity"}/></td>
                </tr>
                <tr >
                    <td colspan="2" className='pt-4'><button type="submit"  className='btn btn-primary w-100 text-capitalize text-center '>{existingProduct.id?"update product":"add new product"}</button></td>
                </tr>
            </table>
        </form>
    </div>
  )
}

export default AddNewProduct