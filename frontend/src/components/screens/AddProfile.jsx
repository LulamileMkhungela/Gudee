import React from 'react';
import {Link,useHistory } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {showErrMsg, showSuccessMsg} from '../utils/notification/Notification'
import {dispatchLogin} from '../../Redux/actions/authAction'
import loginimg from '../../images/login_logo.jpeg';
import navlogo from '../../images/nav-logo.png';
import  './reg.css'; 
import axios from 'axios'
import { useState,useEffect } from 'react';

const initialState = {
    lastname: '',
    password: '',
    firstname: '',
    err: '',
    success: ''
}



const AddProfile=( )=> {
  
    const [user, setUser] = useState(initialState)
    const dispatch = useDispatch()
    const history = useHistory()

    const {email, password,firstname,lastname, err, success} = user;

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }



    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const res = await axios.post('/user/register', {firstname,lastname,email, password})
            setUser({...user, err: '', success: res.data.msg})

            localStorage.setItem('firstLogin', true)

            dispatch(dispatchLogin())
            history.push("/")

        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }
   
        return (
            <div className="login-com">

            <div className="login-img">

                <img src={ loginimg } alt="Welcome To Gude"/>

            </div>

         
            <div className="login-form">
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
                <form onSubmit={handleSubmit}>

                    <img src= { navlogo } alt = "Welcome Gude" />

                    <h2>Join  Gude Marketplace</h2>

                    <p>Already have an account? <i><Link className='link' to="/login">Login</Link></i></p> <br />

                   
                    <div className="row">
                               <div className="col">
                               <label> first name </label><br />
                           <input type="text" className="form-control" name='firstname' onChange={handleChangeInput} value={firstname} />
                                  </div>

                                      <div className="col">
                                      <label> last name </label><br />
                              <input type="text" className="form-control" name='lastname' onChange={handleChangeInput} value={lastname} />
                          </div>
                             </div>
                             

                    <label>Student Email Address</label><br />
                    <input type="type"name="email"onChange={handleChangeInput} value={email} /><br />
                    
                    <label> Password </label><br />
                    <input  className="pass" type="password" name="password"onChange={handleChangeInput}value={password} /> 
                   
                    

                    
                   

                    <button className="btn" type="submit" value="submit">Continue</button>
                  
           
           
           
           

                </form>

            </div>
          
        </div>
        )
    
}

export default AddProfile;
