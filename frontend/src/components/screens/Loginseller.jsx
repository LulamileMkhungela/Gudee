import React from 'react';
import {useRef} from "react";
import {Link, Redirect} from 'react-router-dom'
import loginimg from '../../images/photoun.jpg';
import navlogo from '../../images/nav-logo.png';
import './reg.css';
import axios from 'axios'
import {loginsecond} from "../../Redux/LoginSecondRedux";
import {useDispatch} from "react-redux"


import {useState, useEffect} from 'react'


import {useHistory,} from "react-router";

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
        <div className="login-com">

            <div className="login-img">

                <img src={loginimg} alt="Welcome To Gude"/>

            </div>


            <div className="login-form">

                {error && <span className="error">{error}</span>}
                <form onSubmit={registerHandler}>

                    <img src={navlogo} alt="Welcome Gude"/>

                    <h2>Join Gude Marketplace</h2>

                    <p>Dont have an account? <i><Link to="/registerSeller">Register</Link></i></p> <br/>


                    <div className="row">


                    </div>

                    <label>Email Address</label><br/>
                    <input type="type" name="email" value={email}
                           onChange={(e) => setEmail(e.target.value)}/><br/>

                    <label> Password </label><br/>
                    <input className="pass" type="password" name="password" value={password}
                           onChange={(e) => setPassword(e.target.value)}/>

                    <span><Link className='link' to="/forgot">Forgot Password?</Link></span><br/><br/>
                    <button className="btn" type="submit" value="submit">Login</button>


                </form>

            </div>

        </div>
    )

}

export default Loginseller;