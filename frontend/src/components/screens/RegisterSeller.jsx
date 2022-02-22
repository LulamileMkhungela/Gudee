import React from 'react';
import {useRef} from "react";
import {Link, Redirect} from 'react-router-dom'
import loginimg from '../../images/photoun.jpg';
import navlogo from '../../images/nav-logo.png';
import './Registration.css'
import axios from 'axios'

import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification';


import {useState, useEffect} from 'react'


import {useHistory} from "react-router";

const RegistrationSeller = ({history}) => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };


        try {
            const {data} = await axios.post(
                "/user/register",
                {
                    firstname,
                    lastname,
                    email,
                    password,
                },
                config
            )
            setSuccess(data.data);


            //localStorage.setItem("authToken", data.token);

            //history.push("/login");
        } catch (error) {
            setError(error.response.data.error);

            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
    };

    return (
        <>
            <div className="image-col">
                <img src={loginimg} alt="Welcome To Gude"/>
            </div>
            <div className="form-col">
                {error && <span className="error">{error}</span>}
                <form onSubmit={registerHandler}>
                    <img src={navlogo} alt="Welcome Gude"/>
                    <h2>Join Gude Marketplace</h2>
                    <p>Already have an account? <i><Link to="/login">Login</Link></i></p> <br/>
                    <button 
                        className="facebook-btn" 
                        type="button" onClick={facebook}
                    ><i className="fa fa-facebook"></i>
                    Register with facebook</button>
                    <br/><br/>
                    <div className="input-spacing">
                        <input 
                            className="input-design"
                            type="text" 
                            name='firstname' 
                            required
                            placeholder="Enter your first name"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                        />
                        <br />
                        <br />
                        <input 
                            className="input-design"
                            type="text" 
                            name='lastname' 
                            required
                            placeholder="Enter your last name"
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                        />
                    </div>
                    <br/>
                    <input 
                        type="email" 
                        name="email" 
                        required
                        placeholder="Enter your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <input 
                        type="password" 
                        name="password" 
                        required
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <br />
                    <button className="login-btn" type="submit" value="submit">Register</button>
                </form>
            </div>
        </>
    )

}

export default RegistrationSeller;