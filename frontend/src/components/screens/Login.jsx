import axios from 'axios'
import loginimg from '../../images/photoun.jpg';
import {Link} from 'react-router-dom'
import navlogo from '../../images/nav-logo.png';

import './login.css'
import { useState,  useEffect,useRef, useContext } from 'react';
import { loginCall } from "../aoiCalls";
import { AuthContext } from "../context/AuthContext";

const Login=({history})=> {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


    const loginHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "/api/auth/login",
          { email, password },
          config
        );
  
        localStorage.setItem("authToken", data.token);
  
        history.push("/productlist");
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
            <div className="login-com">

            <div className="login-img">

                <img src={ loginimg } alt="Welcome To Gude"  />

            </div>

            <div className="login-form">

            {error && <span className="error">{error}</span>}
                <form onSubmit={loginHandler}>

                    <img src= { navlogo } alt = "Welcome Gude" />

                    <h2>Welcome Back Gude Marketplace</h2>

                    <p>Dont Have An Account? <i><Link className='link' to="/register">Register</Link></i></p> <br />
                  

                    <button type="button" onClick={facebook}><i className="fa fa-facebook"></i> Login With Facebook</button><br /><br/>


                    <label>Email Address</label><br />
                    <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}/><br /><br />
                    {/* <div><p className='errors'>{formErrors.email}</p></div> */}
                    <label> Passoword </label><br />
                    <input type="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    
                    
                    <span><Link className='link' to="/forgotpassword">Forgot Password?</Link></span><br /><br />

                    <button className="btn" type="submit" value="submit">Login</button>


                </form>

            </div>
          
            </div>
           ) 
    
}

export default Login;
