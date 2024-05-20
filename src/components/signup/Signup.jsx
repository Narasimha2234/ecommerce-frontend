import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import axios from 'axios';
import  './../../App.css';



const Signup = (props) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const {usertype}=props
    const [errorMessage,setErrorMessage]=useState("")
    const currentPath = window.location.pathname;
    const targetPath = currentPath.replace('/signup', '/signin');
    const navigate=useNavigate()
    const[details,setDetails]=useState({
        "email":"",
        "name":"",
        "password":""
     })
     const[errors,setErrors]=useState({
        "email":"",
        "name":"",
        "password":""
       })
       const formValidation=(details)=>{
        let valid=true
       let  newErrors={}
       if(details.email===""){
        valid=false
        newErrors.email="enter valid email"
       }
       if(details.name===""){
        valid=false
        newErrors.name="enter valid name"
       }
       if(details.password===""){
        valid=false
        newErrors.password="enter valid password"
       }
       setErrors(newErrors)
       return valid
       }
       console.log(details);
     const onsubmithandler=(e)=>{
        e.preventDefault()
        const valid=formValidation(details)
        if(valid){
          if(usertype){
            axios.post(`${apiUrl}${usertype}/register`,details)
            .then((res)=>{
               
               navigate(targetPath)
                
            })
            .catch((error)=>{
               setErrorMessage(error.response.data)
            })
          }
         
        }
     }
     
 
   
  return (
    <div >
        <div className='border rounded-2  h-50 w-50 mt-5  m-auto  bg-form'>
            <div  className='mt-5'>
                <h1 className=' w-50 m-auto text-danger text-capitalize '>{usertype} Register</h1>
            </div>
            <div className='w-50 m-auto mt-3'>
                <form action="" onSubmit={onsubmithandler}>
                    <div>
                        <label htmlFor="emali" className='form-lable'>Email</label>
                        <input className='form-controll w-50 ms-5 rounded border-1 input-bg'
                                type="text" 
                                name="email" 
                                id="email" 
                                onChange={(e)=>setDetails({...details,[e.target.name]:e.target.value})} />
                        {errors.email &&<p className='form-text text-danger ms-5 ps-5'>{errors.email}</p>}
                        {errorMessage &&<p className='form-text text-danger ms-5 ps-5'>{errorMessage}</p>}
                    </div>
                    <div className='mt-3'>
                         <label htmlFor="name" className='form-lable'>Name</label>
                        <input className='form-controll w-50 ms-5 rounded border-1 input-bg' 
                                type="text" 
                                name="name" 
                                id="name"
                                onChange={(e)=>setDetails({...details,[e.target.name]:e.target.value})} />
                        {errors.name &&<p className='form-text text-danger ms-5 ps-5'>{errors.name}</p>}
                    </div>
                    <div className='mt-3'>
                         <label htmlFor="password" className='form-lable'>Password</label>
                          <input className='form-controll w-50 ms-4 rounded border-1 input-bg' 
                                 type="password" 
                                 name="password" 
                                 id="password"
                                 onChange={(e)=>setDetails({...details,[e.target.name]:e.target.value})} />
                           {errors.password &&<p className='form-text text-danger ms-5 ps-5'>{errors.password}</p>}      
                    </div>
                    <div className='mt-3'>
                            <button className='btn border-primary bg-primary w-75'> register</button>
                    </div>
                    <div className='mt-3'>
                        <div>
                            <p className='ms-3'>already have an account <Link to={targetPath}  className='text-decoration-none'>sign in here</Link></p>
                        </div>
                    </div>
                    <div className='mt-3'>
                            <div className=' w-75  bg-primary  rounded p-2 ps-5'> <FcGoogle size={20} color='red'/> sign in by google</div>        
                    </div>
                    <div className='mt-3 mb-5'>
                            <div className=' w-75 bg-primary rounded p-2  ps-5'> <FaFacebook size={20} color="yellow"/> sign in by facebook</div>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}


export default Signup