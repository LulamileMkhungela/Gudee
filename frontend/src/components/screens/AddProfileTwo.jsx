import React, {useState} from 'react';
import axios from 'axios';
import loginimg from '../../images/login_logo.jpeg';
import icon from '../../images/icon.jpeg';
import backImage from '../../images/back-image.png';
import mask from '../../images/Mask.png';
import './addprofiletwo.css';

const AddProfileTwo = () => {
    const [cellphone, setCellphone] = useState('');
    const [altCellphone, setAltCellphone] = useState('');
    const [homeAddress, setHomeAddress] = useState('')
    const [radio, setRadio] = useState('cash');

    const submitHandler = () => {
        axios.post('/api/profile', {
            cellphone: cellphone,
            altCellphone: altCellphone,
            homeAddress: homeAddress,
            radio: radio,
        })
    }

    return (
        <div className="addprofile-com">
            <div className="login-img">
                <img src={loginimg} alt="Welcome To Gude"/>
            </div>
            <div className="addprofile-form">
                <form>
                    <img src={backImage} alt="Welcome Gude"/>
                    <div className="avatar">
                        <img src={mask} alt=""/>
                        <span>
                            <i className="fas fa-camera"></i>
                            <p className='change'>Change</p>
                            <input type="file" name="file" id="file_up"/>
                        </span>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label> phone number </label><br/>
                            <input type="text" className="form-control" name="phonenumber" onChange={(e) => setCellphone(e.target.value)}/><br/>
                        </div>
                        <div className="col">
                            <label> Alternative number </label><br/>
                            <input type="text" className="form-control" name="altnumber" onChange={(e) => setAltCellphone(e.target.value)}/>
                        </div>
                    </div>
                    <label>Location </label><br/>
                    <div><input type="text" name="location" onChange={(e) => setHomeAddress(e.target.value)}/><br/></div>
                    <label> Payment methods </label><br/>
                    <span className="buttons-reg-payment">
                    <input
                        type="radio"
                        className="payment"
                        value="cash"
                        name='payement'
                        checked="checked"
                        id='cash'
                        onChange={(e) => setRadio({radio: e.target.value})}
                    />
                    <label for="cash" className="labelpayment">cash</label>
                    <input
                        type="radio"
                        className="payment"
                        value="paypal"
                        name='payement'
                        id='paypal'
                        onChange={(e) => setRadio({radio: e.target.value})}
                    />
                    <label for="paypal" className="labelpayment">paypal</label>
                    <input
                        type="radio"
                        className="payment"
                        value="visa"
                        name='payement'
                        id='visa'
                        onChange={(e) => setRadio({radio: e.target.value})}
                    />
                    <label for="visa" className="labelpayment">visa</label>
                    <input
                        type="radio"
                        className="payment"
                        value="exchange"
                        name='payement'
                        id='exchange'
                        onChange={(e) => setRadio({radio: e.target.value})}
                    />
                    <label for="exchange" className="labelpayment">exchange/negotiate</label></span><br/>

                    <button className="btn" type="submit" value="submit" onClick={submitHandler}>Save & Continue</button>
                </form>
            </div>
        </div>
    );

}

export default AddProfileTwo;