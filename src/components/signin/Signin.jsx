import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signin.css'; // Create this file to move styles there

const Signin = (props) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { loginHandler, usertype } = props;
    const currentPath = window.location.pathname;
    const targetPath = currentPath.replace('/signin', '/signup');
    const [invalidEmail, setInvalidEmail] = useState("");
    const [wrongPswd, setWrongPswd] = useState("");
    const navigate = useNavigate();
   
    const [details, setDetails] = useState({
        "email": "",
        "password": ""
    });
    const [errors, setErrors] = useState({
        "email": "",
        "password": ""
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
        setErrors(newErrors);
        return valid;
    };

    const submithandler = (e) => {
        e.preventDefault();
        const valid = formValidation(details);
        if (valid) {
            if (usertype) {
                axios.post(`${apiUrl}${usertype}/login`, details)
                    .then((res) => {
                        const token = res.data;
                        loginHandler(token);
                        navigate(`/${usertype}/home`);
                    })
                    .catch((err) => {
                        if (err.response.status === 401) {
                            setWrongPswd(err.response.data);
                        }
                        if (err.response.status === 404) {
                            setInvalidEmail(err.response.data);
                        }
                    });
            }
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
                            <label htmlFor="email">Email</label>
                            <input
                                className='form-control'
                                type="text"
                                name="email"
                                id="email"
                                onChange={onChangeHandler}
                            />
                            {errors.email && <p className='error-text'>{errors.email}</p>}
                            {invalidEmail && <p className='error-text'>{invalidEmail}</p>}
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
