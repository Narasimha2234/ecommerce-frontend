import React, { useState } from 'react'
import {Link,useNavigate} from"react-router-dom"
import axios from 'axios'

const Signin = (props) => {
    const {loginHandler,usertype}=props
    const currentPath = window.location.pathname;
    const targetPath = currentPath.replace('/signin','/signup');
    const [invalidEmail,setInvalidEmail]=useState("")
    const [wrongPswd,setWrongPswd]=useState("")
    const navigate=useNavigate()
    console.log(invalidEmail);
    const[details,setDetails]=useState({
        "email":"",
        "password":""
    })
    const[errors,setErrors]=useState({
        "email":"",
        "password":""
    })
    
    const formValidation=(details)=>{
        let valid=true
        const newErrors={}
        if(!details.email){
            valid=false
            newErrors.email="enter valid email"
        }
        if(!details.password){
            valid=false
            newErrors.password="enter valid password"
        }
        setErrors(newErrors)
        return valid
    }
    const submithandler=(e)=>{
        e.preventDefault()
       
        const valid=formValidation(details)
        
        if(valid){
       if(usertype){
        axios.post(`http://localhost:8080/${usertype}/login`,details)
        .then((res)=>{
           
            const token=res.data

             loginHandler(token)
             navigate(`/${usertype}/home`)
        })
        .catch((err) => {
           
           if(err.response.status===401){
            setWrongPswd(err.response.data)
           }
           if(err.response.status===404){
            setInvalidEmail(err.response.data)
           }
        });
       
      }
   
       }
    }
   const onChangeHandler=(e)=>{
    const{name,value}=e.target
    setDetails({...details,[name]:value})
   }
  
  return (
    <div >
        <div className='border rounded-2   h-50 w-50 mt-5  m-auto  bg-form'>
            <div  className='mt-5'>
                <h1 className=' w-50 m-auto text-danger '>{props.usertype} Login</h1>
            </div>
            <div className='w-50 m-auto mt-3'>
                <form action="" onSubmit={submithandler}>
                    <div>
                        <label htmlFor="email" className='form-lable'>Email</label>
                        <input  className='form-controll w-50 ms-5 rounded border-1 input-bg' 
                                type="text" 
                                name="email" 
                                id="email" 
                                onChange={onChangeHandler}/>
                         {errors.email &&<p className='form-text text-danger ms-5 ps-5'>{errors.email}</p>}  
                         {invalidEmail &&<p className='form-text text-danger ms-5 ps-5' >{invalidEmail}</p>}      
                    </div>
                   
                    <div className='mt-3'>
                         <label htmlFor="password" className='form-lable'>Password</label>
                            <input  className='form-controll w-50 ms-4 rounded border-1 input-bg' 
                                    type="text" 
                                    name="password" 
                                    id="password"
                                    onChange={onChangeHandler} />
                             {errors.password &&<p className='form-text text-danger ms-5 ps-5'>{errors.password}</p>} 
                             {wrongPswd &&<p className='form-text text-danger ms-5 ps-5' >{wrongPswd} </p>}       
                    </div>
                    <div className='mt-3'>
                            <button className='btn border-primary bg-primary w-75'> Sign in</button>
                    </div>
                    <div className='mt-3 mb-5'>
                        <div>
                            <p className='ms-3'>don't have an account <Link to={targetPath} className='text-decoration-none'>signup here</Link></p>
                        </div>
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
  )
}

export default Signin