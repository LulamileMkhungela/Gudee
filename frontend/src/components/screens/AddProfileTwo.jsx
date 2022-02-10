import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import loginimg from '../../images/login_logo.jpeg';
import icon from '../../images/icon.jpeg';
import backImage from '../../images/back-image.png';
import mask from '../../images/Mask.png';
import  './addprofiletwo.css'; 

const AddProfileTwo = () => {
//
    
    return (
        <div className="addprofile-com">
            <div className="login-img">
                <img src={ loginimg } alt="Welcome To Gude"  />
            </div>
            <div className="addprofile-form">
                <form>
                    <img  src= { backImage} alt = "Welcome Gude" /> 
                    <div className="avatar">
                        <img src={mask} alt=""/>
                        <span>
                            <i className="fas fa-camera"></i>
                            <p className='change'>Change</p>
                            <input type="file" name="file" id="file_up"  />
                        </span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label> phone number </label><br />
                            <input type="text" className="form-control" name="phonenumber"  /><br/>
                        </div>        
                        <div className="col">
                            <label> Alternative number </label><br />
                            <input type="text" className="form-control" name="altnumber" />
                        </div>           
                    </div>
                    <label>Location </label><br />
                    <div> <input type="text" name="location"  /><br /></div>     
                    <label> Payment methods </label><br />
                    <span className="buttons-reg-payment" >
                    <Link to="/cash"><input 
                        type="radio" 
                        className="payment"
                        value="cash"
                        name='payement' 
                        checked="checked" 
                        id='cash'   
                    /></Link>
                    <label for="cash" className="labelpayment">cash</label>
                    <Link to="/PayPal"><input 
                        type="radio" 
                        className="payment"
                        value="paypal"
                        name='payement' 
                        id='paypal'   
                    /></Link>
                    <label for="paypal"  className="labelpayment">paypal</label>
                    <Link to="/Card"><input 
                        type="radio" 
                        className="payment"
                        value="visa" 
                        name='payement' 
                        id='visa'   
                    /></Link>
                    <label for="visa" className="labelpayment">visa</label>
                    <Link to="/Exchange"><input 
                        type="radio" 
                        className="payment" 
                        value="exchange"
                        name='payement' 
                        id='exchange'    
                    /></Link>
                    <label for="exchange"  className="labelpayment">exchange/negotiate</label></span><br/>
                
                    <button className="btn" type="submit" value="submit">Save & Continue</button>
                </form>
            </div>      
        </div>
    );
        
}

export default AddProfileTwo;