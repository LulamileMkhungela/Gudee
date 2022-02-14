import {useState, React} from 'react';
import loginimg from '../../images/login_logo.jpeg';
import icon from '../../images/icon.jpeg';
import navlogo from '../../images/nav-logo.png';
import axios from 'axios';

import './forgotpassword.css';


const ResetPassword = ({history, match}) => {

    const [newpassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const resetPasswordHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        if (newpassword !== confirmPassword) {
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords don't match");
        }

        try {
            const {data} = await axios.put(
                `/api/auth/passwordreset/${match.params.resetToken}`,
                {
                    newpassword,
                },
                config
            );

            console.log(data);
            setSuccess(data.data);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };
    return (

        <div className="forgot-com">


            <div className="forgot-form">

                <form onSubmit={resetPasswordHandler}>
                    <div className="wraps">
                        <img className="img-fpass" src={navlogo} alt="Welcome Gude"/>

                        <h3>Recover Account</h3>
                    </div>
                    <div className="containers">


                        <label> New Password </label><br/>
                        <input type="password" name="newpassword" autoComplete="true"
                               value={newpassword}
                               onChange={(e) => setNewPassword(e.target.value)}/><br/>
                        <label> confirm Password </label><br/>
                        <input type="password" name="confirmpassword" autoComplete="true"
                               value={confirmPassword}
                               onChange={(e) => setConfirmPassword(e.target.value)}/><br/>


                        <button className="btn" type="button">safe & continue</button>


                    </div>


                </form>

            </div>

        </div>
    );

}

export default ResetPassword;