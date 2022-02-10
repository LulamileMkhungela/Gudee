import React from 'react';
import { useRef } from "react";
import {Link, Redirect} from 'react-router-dom'
import loginimg from '../../images/photoun.jpg';
import navlogo from '../../images/nav-logo.png';
import  './reg.css'; 
import axios from 'axios'

import { useContext } from 'react';

import { useState,  useEffect } from 'react'
// import { RegisterContext } from '../../Helper/Context';

import { useHistory } from "react-router";

const Registration =({ history })=> {

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
      const { data } = await axios.post(
        "/api/auth/register",
        {
         firstname,
          lastname,
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











    
        //axios.post('http://localhost:5000/app/signup' )
           // .then(response =>console.log(response.data))
            //window.open("/Explore")
        
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
                <form onSubmit={registerHandler}>

                    <img src= { navlogo } alt = "Welcome Gude" />

                    <h2>Join  Gude Marketplace</h2>

                    <p>Already have an account? <i><Link to="/login">Login</Link></i></p> <br />

                    <button type="button" onClick={facebook}><i className="fa fa-facebook"></i> Login With Facebook</button><br /><br />
                    <div className="row">
                               <div className="col">
                               <label> first name </label><br />
                           <input type="text" className="form-control" name='firstname' required
               value={firstname}
               onChange={(e) => setFirstname(e.target.value)} />
                                  </div>
                                      <div className="col">
                                      <label> last name </label><br />
                              <input type="text" className="form-control" name='lastname' value={lastname}
                            onChange={(e) => setLastname(e.target.value)}/>
                          </div>
                         
                             </div>

                    <label>Email Address</label><br />
                    <input type="type" name="email"  value={email}
            onChange={(e) => setEmail(e.target.value)} /><br />
                    
                    <label> Password </label><br />
                    <input  className="pass" type="password" name="password"  value={password}
            onChange={(e) => setPassword(e.target.value)} /> 
            

                    <button className="btn" type="submit" value="submit">Register</button>


                </form>

            </div>
          
        </div>
        )
   
}

export default Registration;
