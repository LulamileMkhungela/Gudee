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
    const [selects, setSelects] = useState('');
    const [singleFiles, setSingleFiles] = useState([]);
    const [preview,setPreview] = useState(null);
    const [showPreview,setShowPreview] = useState(false)
    const [cash,setCash] = useState(false);
    const [payPal,setPayPal] = useState(false);
    const [visa,setVisa] = useState(false);
    const [neg,setNeg] = useState(false);
    const [holdImg,setHoldImg] = useState(false);
    const getSingleFileslist = async () => {
        try {
            const fileslist = await getSingleFiles();
            setSingleFiles(fileslist);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSingleFileslist();
    }, []);

    // Returned when the 'Books' field is chosen
    if (selects === 'Books') {
        return <Books getsingle={() => getSingleFileslist()}/>
    }
    return (
        <div>
            <div className="panel-default item-to-sell">
                <div className={'row'}>
                    <div className={'col-lg-6'}>
                        <br />
                        <div className={'item-to-sell-heading'}>Item To Sell</div>
                        <form>
                            <select className={'form-control'} style={{height : '60px', borderRadius : '7px'}}>
                                <option>Select Category</option>
                            </select>
                            <br />
                            <input type={'file'}
                                   className={'form-control'}
                                   multiple={true}
                                   onChange={e=>{
                                       setPreview(URL.createObjectURL(e.target.files[0]))
                                       setShowPreview(true);
                                       setHoldImg(true);
                                   }}
                            />
                            {showPreview ? <div><br /><img src={preview} alt={''} className={'preview-img'}/><br /></div> : ''}
                            <br />
                            <input type={'text'} className={'form-control'} placeholder={'Enter Item Title'}/>
                            <br />
                            <textarea rows={4} className={'form-control'} placeholder={'Enter Item Description'} />
                            <br />
                            <select className={'form-control item-to-sell-category'} style={{height : '60px', borderRadius : '7px'}}>
                                <option>Select Condition</option>
                            </select>
                            <br />
                            <input type={'text'} className={'form-control'} placeholder={'Type Your Price'}/>
                            <br />
                            <input type={'number'} className={'form-control'} placeholder={'Number Of Items'}/>
                            <br />
                            <input type={'text'} className={'form-control'} placeholder={'Location'}/>
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
                                <button className={'btn btn-default'}>Post</button>
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
                {/*<div className={'col-lg-6 bd'}>*/}
                {/*    <div className={'item-to-sell-heading bd'}>Item To Sell</div>*/}
                {/*    <select className={'form-control'}>*/}
                {/*        <option>Select Category</option>*/}
                {/*        <option>Electronics</option>*/}
                {/*        <option>Freebies</option>*/}
                {/*    </select>*/}
                {/*</div>*/}
                {/*<div className={'col-lg-6 bd'}></div>*/}
            {/*    <select className="category" onChange={(e) => setSelects(e.target.value)}>*/}
            {/*        <option>-- Select Category --</option>*/}
            {/*        {data.map(item => {*/}
            {/*            return <option>{item.name}</option>*/}
            {/*        })}*/}
            {/*    </select><br/>*/}
            {/*    {singleFiles.map((file, index) =>*/}
            {/*        <div>*/}
            {/*            <img className="img-product" src={`${file.filePath}`} alt=''/>*/}
            {/*        </div>*/}
            {/*    )} <br/>*/}
            {/*    <span className='img-product-span'>*/}
            {/*     <div>*/}
            {/*        <div>*/}
            {/*            <label>Select Single File</label>*/}
            {/*            <input type="file" name="file" id="file" onChange={(e) => SingleFileChange(e)}/>*/}
            {/*            <button type="button" onClick={() => uploadSingleFile()}>Upload</button>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    </span> <br/>*/}
            {/*    <input className="input-item" type="text" placeholder="Enter Item Title"/><br/>*/}
            {/*    <br/>*/}
            {/*    <textarea className="textArea-item">Enter Item Description</textarea><br/>*/}
            {/*    <select className="category">*/}
            {/*        <option>-- Select Condition --</option>*/}
            {/*        {secondData.map(item => {*/}
            {/*            return <option>{item.name}</option>*/}
            {/*        })}*/}
            {/*    </select><br/>*/}
            {/*    <input className="input-item" type="text" placeholder="Enter Item Price"/><br/>*/}
            {/*    <input className="input-item" type="text" placeholder="Enter the number of items"/><br/>*/}
            {/*    <input className="input-item" type="text" placeholder="Enter the Location"/><br/>*/}
            {/*    <label>payment method </label><br/>*/}
            {/*    <span className="buttons-payment"><button className="button-pay" type="submit">cash</button><button*/}
            {/*        className="button-pay">paypal</button>*/}
            {/*        <button className="button-pay">Visa</button><button*/}
            {/*            className="button-pay">exchange/negotiate</button></span><br/>*/}
            {/*    <span className="post-item"><button className="item-draft" type="submit">Save as draft</button>*/}
            {/*        <button className="item-post" type="submit">Post</button>*/}
            {/*    </span>*/}
            {/*</div>*/}
            {/*<div className="seller_profile-info">*/}
            {/*    {singleFiles.map((file, index) =>*/}
            {/*        <div>*/}
            {/*            <img className="img-product" src={`${file.filePath}`} alt=''/>*/}
            {/*        </div>*/}
            {/*    )} <br/>*/}
            {/*    <input className="input-item-seller" type="text" placeholder="Enter Item Title"/>*/}
            {/*    <input className="input-item-seller" type="text" placeholder="Enter Item Price"/>*/}
            {/*    <textarea className="textArea-item-seller">Enter Item Description</textarea><br/>*/}
            {/*    <input className="input-item-seller" type="text" placeholder="Enter the number of items"/><br/>*/}
            {/*    <input className="input-item-seller" type="text" placeholder="Enter the Location"/><br/>*/}
            {/*    profile*/}
            </div>
        </div>
    );
}


export default ItmesToSell;