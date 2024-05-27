import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css'; // Create this file to move styles there

const Signin = (props) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { loginHandler} = props;
    const currentPath = window.location.pathname;
    const targetPath = currentPath.replace('/signin', '/signup');
    const [invalidEmailorrole, setInvalidEmailorrole] = useState("");
    const [wrongPswd, setWrongPswd] = useState("");
    const navigate = useNavigate();
   
    const [details, setDetails] = useState({
        "email": "",
        "password": "",
        "role":""
    });
    const [errors, setErrors] = useState({
        "email": "",
        "password": "",
        "role":""
    });

    const formValidation = (details) => {
        let valid = true;
        const newErrors = {};
        if (!details.email) {
            valid = false;
            newErrors.email = "Enter a valid email";
        }
        if (!details.password) {
            valid = false;
            newErrors.password = "Enter a valid password";
        }
        if(!details.role){
            valid=false;
            newErrors.role="select any one role"
        }
        setErrors(newErrors);
        return valid;
    };

    const submithandler = (e) => {
        e.preventDefault();
        
        const valid = formValidation(details);
        
        if (valid) {
            
                axios.post(`${apiUrl}login`, details)
                    .then((res) => {
                        const token = res.data;
                       
                        loginHandler(token);
                        navigate(`/home`);
                    })
                    .catch((err) => {
                        
                        if (err.response.status === 401) {
                            setWrongPswd(err.response.data);
                        }
                       
                        if (err.response.status === 404) {
                            setInvalidEmailorrole(err.response.data);
                        }
                    });
            
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setDetails({ ...details, [name]: value });
    };

    return (
        <div className="signin-container">
            <div className='signin-box'>
                <div className='signin-header'>
                    <h1>{props.usertype} Login</h1>
                </div>
                <div className='signin-form'>
                    <form onSubmit={submithandler}>
                    <div className="form-group">
                            <label htmlFor="email">Role</label>
                           <select name="role" onChange={onChangeHandler} className='role-selector'>
                            <option selected disabled></option>
                            <option>CUSTOMER</option>
                            <option>SELLER</option>
                           </select>
                            {errors.role && <p className='error-text'>{errors.role}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className='form-control'
                                type="text"
                                name="email"
                                id="email"
                                onChange={onChangeHandler}
                            />
                            {errors.email && <p className='error-text'>{errors.email}</p>}
                           
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input
                                className='form-control'
                                type="password"
                                name="password"
                                id="password"
                                onChange={onChangeHandler}
                            />
                            {errors.password && <p className='error-text'>{errors.password}</p>}
                            {wrongPswd && <p className='error-text'>{wrongPswd}</p>}
                        </div>
                        <div className='form-group'>
                            <button className='btn-signin'>Sign in</button>
                        </div>
                        {invalidEmailorrole && <p className='error-text'>{invalidEmailorrole}</p>}
                        <div className='signup-link'>
                            <p>Don't have an account? <Link to={targetPath}>Sign up here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
