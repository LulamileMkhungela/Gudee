import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

import navlogo from '../../images/nav-logo.png';

import './forgotpassword.css';


const ForgotPassword = ({histrory}) => {


    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const forgotPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        try {
            const {data} = await axios.post(
                "/api/auth/forgotpassword",
                {email},
                config
            );

            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setEmail("");
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };


    return (

        <div className="forgot-com">


            <div className="forgot-form">
                {error && <span className="error">{error}</span>}
                {success && <span className="success">{success}</span>}
                <form onSubmit={forgotPasswordHandler}>
                    <div className="wraps">
                        <img className="img-fpass" src={navlogo} alt="Welcome Gude"/>

                        <h3>Recover Account</h3>
                    </div>
                    <div className="containers">
                        <label>Email Address Recover</label><br/>
                        <input type="email" name="email" placeholder="Email address"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}/><br/>


                        <button className="btn" type="submit">Send Email</button>

                    </div>


                </form>

            </div>

        </div>
    );

}

export default ForgotPassword;