import axios from 'axios'
import loginimg from '../../images/photoun.jpg';
import {Link} from 'react-router-dom'
import navlogo from '../../images/nav-logo.png';
import {useDispatch} from "react-redux"
import './login.css'
import React, {useState, useEffect, useRef} from 'react';
import {login} from "../../Redux/LoginFirstRedux";
import facebookBrand from '../../images/facebook-brands.svg';

const Login = ({history}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();


    const loginHandler = async (e) => {
        e.preventDefault();
        dispatch(login({
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
                "http://localhost:5000/api/auth/login",
                {email, password},
                config
            );

            localStorage.setItem("authToken", data.token);

            history.push("/store");
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
                <img src={loginimg} alt="Welcome To Gude" />
            </div>
            <div className="form-col">
                {error && <span className="error">{error}</span>}
                <form onSubmit={loginHandler}>
                    <img src={navlogo} alt="Welcome Gude"/>
                    <h2>Welcome Back to the Gude Marketplace</h2>
                    <p>Don't have an account? <i><Link to="/register">Register</Link></i></p> <br/>
                    <button 
                        className="facebook-btn" 
                        type="button" 
                        onClick={facebook}
                    ><i className="fa fa-facebook"></i>Login With Facebook
                    </button>
                    <br/><br/>
                    <label>Email Address</label><br/>
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}
                           value={email}/><br/><br/>
                    <label> Passoword </label><br/>
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}
                           value={password}/><br/><br/>

                    <span><Link className="form-link" to="/forgotpassword">Forgot Password?</Link></span><br/><br/>
                    <button className="login-btn" type="submit" value="submit">Login</button>
                </form>
            </div>
        </>
    )
}

export default Login;
