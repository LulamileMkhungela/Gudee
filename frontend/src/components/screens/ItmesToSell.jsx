import React, {useState, useEffect} from 'react'
import axios from 'axios';

import {singleFileUpload} from '../data/api'
import FidgetSpinner from '../../images/FidgetSpinner.gif';
import capture from '../../images/Capture2.PNG'
import Books from '../pages/Books';
import './sellerCart.css'
import {getSingleFiles} from '../data/api';
import {SingleFileChange, uploadSingleFile} from '../pages/Books';
import image from '../../assets/img.png';
import image_1 from '../../assets/img_1.png';
import image_2 from '../../assets/img_2.png';

// Select Category Data
const data = [
    {name: 'Freebies'},
    {name: 'Electronics'},
    {name: 'Books'},
    {name: 'phones'}
]
// Select Conditional Data
const secondData = [
    {name: 'Used'},
    {name: 'New'},
]
const ItmesToSell = ({SingleFileChange, uploadSingleFile}) => {
    const [ISBNinput,setISBN] = useState(false);
    const [IMEIinput,setIMEI] = useState(false);

    /*
        Get Input Values Using useState() Hook
     */
    const [preview,setPreview] = useState(null);
    const [showPreview,setShowPreview] = useState(false)
    const [holdImg,setHoldImg] = useState(false);
    const [cash,setCash] = useState(false);
    const [payPal,setPayPal] = useState(false);
    const [visa,setVisa] = useState(false);
    const [neg,setNeg] = useState(false);
    const post = async (e) =>{
        e.preventDefault()
        await  axios({
            url : 'http://localhost:5000/products/sell',
            method : 'POST',
            data : new FormData(document.querySelector('#sell-form'))
        }).then(resp => {

        })
    }
    return (
        <div>
            <div className="panel-default item-to-sell">
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        {/*<h5>{user}</h5>*/}
                        <br />
                        <div className={'item-to-sell-heading'}>Item To Sell</div>
                        <form id={'sell-form'} encType={'multipart/form-data'}>
                            <select
                                name = {'category'}
                                className={'form-control'}
                                style={{height : '60px', borderRadius : '7px'}}
                                onChange={(e) => {
                                    if (e.target.value === 'phone'){
                                        setIMEI(true)
                                        setISBN(false)
                                    }else if (e.target.value === 'book'){
                                        setISBN(true)
                                        setIMEI(false)
                                    }else{
                                        setISBN(false)
                                        setIMEI(false)
                                    }
                                }}
                            >
                                <option>Select Category</option>
                                <option value={'electronic'}>Electronics</option>
                                <option value={'freebie'}>Freebies</option>
                                <option value={'phone'}>Phones</option>
                                <option value={'book'}>Books</option>
                            </select>
                            <br />
                            <input type={'file'}
                                   className={'form-control'}
                                   multiple={true}
                                   name={'product_img_url'}
                                   onChange={e=>{
                                       setPreview(URL.createObjectURL(e.target.files[0]))
                                       setShowPreview(true);
                                       setHoldImg(true);
                                       console.log(e.target.files)

                                   }}
                            />
                            {showPreview ? <div><br /><img src={preview} alt={''} className={'preview-img'}/><br /></div> : ''}
                            <br />
                            <input name={'title'} type={'text'} className={'form-control'} placeholder={'Enter Item Title'}/>
                            {ISBNinput ? <div>
                                <br />
                                <input name={'isbn'} type={'text'} className={'form-control'} placeholder={'ISBN Number'}/>
                            </div> : ''
                            }
                            {IMEIinput ? <div>
                                <br />
                                <input name={'imei'} type={'text'} className={'form-control'} placeholder={'IMEI Number'}/>
                            </div> : ''
                            }
                            <br />
                            <textarea  name={'desc'} rows={4} className={'form-control'} placeholder={'Enter Item Description'} />
                            <br />
                            <select name={'condition'} className={'form-control item-to-sell-category'} style={{height : '60px', borderRadius : '7px'}}>
                                <option>Select Condition</option>
                                <option>New</option>
                                <option>Used</option>
                            </select>
                            <br />
                            <input name={'price'} type={'text'} className={'form-control'} placeholder={'Type Your Price'}/>
                            <br />
                            <input name={'quantity'} type={'number'} className={'form-control'} placeholder={'Number Of Items'}/>
                            <br />
                            <input name={'location'} type={'text'} className={'form-control'} placeholder={'Location'}/>
                            <br />
                            <label>Payment Methods</label>
                            <div className={'payment-method'}>
                                <span
                                    className={`bd ${ cash ? 'active-span' : ''}`}
                                    onClick={() => setCash(!cash)}
                                >Cash</span>
                                <span
                                    className={`bd ${ payPal ? 'active-span' : ''}`}
                                    onClick={() => setPayPal(!payPal)}
                                >PayPal</span>
                                <span
                                    className={`bd ${ visa ? 'active-span' : ''}`}
                                    onClick={() => setVisa(!visa)}
                                >Visa</span>
                                <span
                                    className={`bd ${ neg ? 'active-span' : ''}`}
                                    onClick={() => setNeg(!neg)}
                                >Exchange/Negotiate</span>
                            </div>
                            <br />
                            <div className={'item-btn'}>
                                <button className={'btn btn-default'}>Save As Draft</button>
                                <button onClick={e=>post(e)} className={'btn btn-default'}>Post</button>
                            </div>

                        </form>
                    </div>

                    <div className={'col-lg-6 sell-holder'}>
                        <img src={ holdImg ? preview : image} alt={''} className={'sell-holder-image bd'}/>
                        <br />
                        <br />
                        <div className={'sell-pop-values'}>
                            <p>Item Title : </p>
                            <p>Price : </p>
                            <p>Description : </p>
                            <p>Number Of Items : </p>
                            <p>Condition : </p>
                            <p>Location : </p>
                            <img src={image_1} alt={''} className={'map-image'}/>
                            <br />
                            <br />
                            <p><span style={{
                                fontSize: '17px',
                                fontWeight: 'bolder',
                                color: 'black'
                            }}>Seller Info</span></p>

                            <div className={'sell-info'}>
                                <div className={'row'}>
                                    <div className={'col-lg-2'}>
                                        <img src={image_2} alt={''} className={'seller-img'}/>
                                    </div>
                                    <div className={'col-lg-10 seller-name'}>
                                        Kamzen Makamu
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItmesToSell;