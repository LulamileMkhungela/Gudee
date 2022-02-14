import React, {useState, useEffect} from 'react'
import axios from 'axios';

import {singleFileUpload} from '../data/api'
import FidgetSpinner from '../../images/FidgetSpinner.gif';
import capture from '../../images/Capture2.PNG'
import Books from '../pages/Books';
import './sellerCart.css'
import {getSingleFiles} from '../data/api';
import {SingleFileChange, uploadSingleFile} from '../pages/Books';

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
        <div className="itemcontainer">
            <div className="SellerCart">
                <select className="category" onChange={(e) => setSelects(e.target.value)}>
                    <option>-- Select Categor --</option>
                    {data.map(item => {
                        return <option>{item.name}</option>
                    })}
                </select><br/>
                {singleFiles.map((file, index) =>
                    <div>
                        <img className="img-product" src={`${file.filePath}`} alt=''/>
                    </div>
                )} <br/>
                <span className='img-product-span'>
                 <div>     
                    <div>   
                        <label>Select Single File</label>
                        <input type="file" name="file" id="file" onChange={(e) => SingleFileChange(e)}/>
                        <button type="button" onClick={() => uploadSingleFile()}>Upload</button>
                    </div>
                </div>
                </span> <br/>
                <input className="input-item" type="text" placeholder="Enter Item Title"/><br/>
                <br/>
                <textarea className="textArea-item">Enter Item Description</textarea><br/>
                <select className="category">
                    <option>-- Select Condition --</option>
                    {secondData.map(item => {
                        return <option>{item.name}</option>
                    })}
                </select><br/>
                <input className="input-item" type="text" placeholder="Enter Item Price"/><br/>
                <input className="input-item" type="text" placeholder="Enter the number of items"/><br/>
                <input className="input-item" type="text" placeholder="Enter the Location"/><br/>
                <label>payment method </label><br/>
                <span className="buttons-payment"><button className="button-pay" type="submit">cash</button><button
                    className="button-pay">paypal</button>
                    <button className="button-pay">Visa</button><button
                        className="button-pay">exchange/negotiate</button></span><br/>
                <span className="post-item"><button className="item-draft" type="submit">Save as draft</button>
                    <button className="item-post" type="submit">Post</button>
                </span>
            </div>
            <div className="seller_profile-info">
                {singleFiles.map((file, index) =>
                    <div>
                        <img className="img-product" src={`${file.filePath}`} alt=''/>
                    </div>
                )} <br/>
                <input className="input-item-seller" type="text" placeholder="Enter Item Title"/>
                <input className="input-item-seller" type="text" placeholder="Enter Item Price"/>
                <textarea className="textArea-item-seller">Enter Item Description</textarea><br/>
                <input className="input-item-seller" type="text" placeholder="Enter the number of items"/><br/>
                <input className="input-item-seller" type="text" placeholder="Enter the Location"/><br/>
                profile
            </div>
        </div>
    );
}


export default ItmesToSell;