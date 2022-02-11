import React, {useState} from 'react'

import '../screens/sellerCart.css';
import {singleFileUpload, getSingleFiles} from '../data/api';

// Select Category Data
const data =[
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

function Books(props) {
    const [selects, setSelects] = useState(''); 
    const [singleFile, setSingleFile] = useState('');
    const [singleFiles, setSingleFiles] = useState([]);
    const [title, setTitle] = useState('');
    const [isbnNumber, setIsbnNumber] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [price, setPrice] = useState(0);
    const [numberOfItems, setNumberOfItems] = useState(0);
    const [location, setLocation] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const SingleFileChange = async (e) => {
        setSingleFile(e.target.files[0]);
    }

    const uploadSingleFile = async () => {
        const formData = new FormData();
        formData.append('file', singleFile);
        await singleFileUpload(formData);
        props.getsingle();
    }


  return (
    <div className="itemcontainer">  
        <div className="SellerCart">
            <select className= "category" onChange={(e)=> setSelects(e.target.value)}>
                <option>-- Select Categor --</option>
                {data.map(item => {
                    return <option >{item.name}</option>
                })}
                </select><br/>
                {singleFiles.map((file, index) => 
                    <div>
                        <img className="img-product" src={`${file.filePath}`} alt='' />
                    </div>
                )}<br/>
                <span className='img-product-span'>
                <div>     
                    <div>   
                        <label>Select Single File</label>
                        <input type="file" name="file" id="file" onChange={(e) => SingleFileChange(e)} />
                        <button type="button" onClick={() => uploadSingleFile()} >Upload</button>
                    </div>
                </div>
                </span> <br/>
                <input className="input-item" type="text" placeholder="Enter Item Title" onChange={(e) => setTitle(e.target.value)} /><br/>
                <input className="input-item" type="text" placeholder="Enter ISBN Number" onChange={(e) => setIsbnNumber(e.target.value)} /><br/>
                <br />
                <textarea className="textArea-item" onChange={(e) => setDescription(e.target.value)}>Enter Item Description</textarea><br/>
                <select className= "category" onChange={(e) => setCondition(e.target.value)}>
                    <option>{condition}</option>
                    {secondData.map(item => {
                        return <option>{item.name}</option>
                    })}
                </select><br/>
                <input className="input-item" type="text" placeholder="Enter Item Price"onChange={(e) => setPrice(e.target.value)} /><br/>
                <input className="input-item" type="text" placeholder="Enter the number of items" onChange={(e) => setNumberOfItems(e.target.value)} /><br/>
                <input className="input-item" type="text" placeholder="Enter the Location" onChange={(e) => setLocation(e.target.value)} /><br/>
                <label>payment method </label><br/>
                <span className="buttons-payment" ><button className="button-pay" type="submit">cash</button><button className="button-pay">paypal</button>
                <button className="button-pay">Visa</button><button className="button-pay">exchange/negotiate</button></span><br/>
                <span className="post-item"><button className="item-draft" type="submit">Save as draft</button>
                <button className="item-post" type="submit">Post</button>
            </span>          
        </div>
        <div className="seller_profile-info">
            {singleFiles.map((file, index) => 
                    <div>
                        <img className="img-product" src={`${file.filePath}`} alt='' />
                    </div>
            )}<br/>
            <input className="input-item-seller" type="text" placeholder="Enter Item Title"/>
            <input className="input-item-seller" type="text" placeholder="Enter Item Price"/>
            <textarea className="textArea-item-seller">Enter Item Description</textarea><br/>
            <input className="input-item-seller" type="text" placeholder="Enter the number of items"/><br/>
            <input className="input-item-seller" type="text" placeholder="Enter the Location"/><br/>
            profile
        </div>
    </div>
  )
}

export default Books