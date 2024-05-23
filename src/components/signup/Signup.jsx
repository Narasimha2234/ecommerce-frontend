import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import axios from 'axios';
import './signup.css'; // Create this file to move styles there

const Signup = (props) => {
    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    const { usertype } = props;
    const [errorMessage, setErrorMessage] = useState("");
    const currentPath = window.location.pathname;
    const targetPath = currentPath.replace('/signup', '/signin');
    const navigate = useNavigate();

    const [details, setDetails] = useState({
        email: "",
        name: "",
        password: ""
    });

    const [errors, setErrors] = useState({
        email: "",
        name: "",
        password: ""
    });

    const formValidation = (details) => {
        let valid = true;
        let newErrors = {};
        if (details.email === "") {
            valid = false;
            newErrors.email = "Enter a valid email";
        }
        if (details.name === "") {
            valid = false;
            newErrors.name = "Enter a valid name";
        }
        if (details.password === "") {
            valid = false;
            newErrors.password = "Enter a valid password";
        }
        setErrors(newErrors);
        return valid;
    };

    const onsubmithandler = (e) => {
        e.preventDefault();
        const valid = formValidation(details);
        if (valid) {
            if (usertype) {
                axios.post(`${apiUrl}${usertype}/register`, details)
                    .then((res) => {
                        navigate(targetPath);
                    })
                    .catch((error) => {
                        setErrorMessage(error.response.data);
                    });
            }
        }
    };

    return (
        <div className="signup-container">
            <div className='signup-box'>
                <div className='signup-header'>
                    <h1>{usertype} Register</h1>
                </div>
                <div className='signup-form'>
                    <form onSubmit={onsubmithandler}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                className='form-control'
                                type="text"
                                name="email"
                                id="email"
                                onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })}
                            />
                            {errors.email && <p className='error-text'>{errors.email}</p>}
                            {errorMessage && <p className='error-text'>{errorMessage}</p>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="name">Name</label>
                            <input
                                className='form-control'
                                type="text"
                                name="name"
                                id="name"
                                onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })}
                            />
                            {errors.name && <p className='error-text'>{errors.name}</p>}
                        </div>
                        <div className='form-group'>
                            <label htmlFor="password">Password</label>
                            <input
                                className='form-control'
                                type="password"
                                name="password"
                                id="password"
                                onChange={(e) => setDetails({ ...details, [e.target.name]: e.target.value })}
                            />
                            {errors.password && <p className='error-text'>{errors.password}</p>}
                        </div>
                        <div className='form-group'>
                            <button className='btn-signup'>Register</button>
                        </div>
                        <div className='signin-link'>
                            <p>Already have an account? <Link to={targetPath}>Sign in here</Link></p>
                        </div>
                        <div className='social-signin'>
                            <div className='google-signin'>
                                <FcGoogle size={20} /> Sign in by Google
                            </div>
                            <div className='facebook-signin'>
                                <FaFacebook size={20} /> Sign in by Facebook
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
