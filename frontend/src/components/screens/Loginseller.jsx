import React, { useRef, useState, useEffect} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useHistory,} from "react-router";
import {useDispatch} from "react-redux";
import axios from 'axios';

import './login.css';
import students from '../../images/students.png';
import navlogo from '../../images/nav-logo.png';
import {loginsecond} from "../../Redux/LoginSecondRedux";

const Loginseller = ({history}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const registerHandler = async (e) => {
        e.preventDefault();

        dispatch(loginsecond({
            email: email,
            password: password,
            loggedIn: true,
        }));

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };


        try {
            const {data} = await axios.post(
                "/user/login",
                {

                    email,
                    password,
                },
                config
            );

            localStorage.setItem("authToken", data.token);

            history.push("/login");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

   

    return (
         <>
            <div className="image-col">
                <img src={students} alt="Welcome To Gude"/>
            </div>
            <div className="form-col">
                {error && <span className="error">{error}</span>}
                <form onSubmit={registerHandler}>
                    <img src={navlogo} alt="Welcome Gude"/>
                    <h2>Welcome Back to Gude Marketplace</h2>
                    <p>Don't have an account?<i><Link className='link' to="/registerseller"> Register</Link></i></p> 
                    <br/>
                    
                    <label>Email Address</label><br/>
                    <input 
                        type="email" 
                        name="email" 
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    /><br/><br/>
                    <label> Passoword </label><br/>
                    <input 
                        type="password" 
                        name="password" 
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <br />
                    <br />
                    <span><Link className="form-link" to="/forgot">Forgot Password?</Link></span><br/><br/>
                    <button className="login-btn" type="submit" value="submit">Login</button>
                </form>
            </div>
        </>
    )

}

export default Loginseller;