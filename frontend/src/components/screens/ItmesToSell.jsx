import React, { useState, useEffect } from 'react'
import axios from 'axios';

import {singleFileUpload} from '../data/api'
import FidgetSpinner from '../../images/FidgetSpinner.gif';
import capture from '../../images/Capture2.PNG'
import './sellerCart.css'
import {getSingleFiles} from '../data/api';

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
const ItmesToSell = () => {
    const [selects, setSelects] = useState('');
    const [title, setTitle] = useState('');
    const [isbn, setIsbnNumber] = useState('');
    const [description, setDescription] = useState('');
    const [condition, setCondition] = useState('');
    const [price, setPrice] = useState('');
    const [items, setNumberOfItems] = useState('');
    const [location, setLocation] = useState('');
    const [payment, setPaymentMethod] = useState('');
    const [people, setPeople] = useState([]);

    useEffect(() => {
        axios.get('/api/getPerson').then((res)=> {
            setPeople(res.data)
        })
    },[]);

    const handleClick = (e) => {
        const id = e.target.id;
    }
    
    const pageSelection = () => {
        // Returns ISBN field when 'Book' is chosen
        if (selects === 'Books') {
            return <input 
                className="input-item" 
                type="text" 
                placeholder="Enter ISBN Number"  
                onChange={(e) => setIsbnNumber(e.target.value)} 
            />     
        }
    }

    const Combination = () => {
        axios.post('/api/person', {
            selects: selects,
            title: title,
            isbn: isbn,
            description: description,
            condition: condition,
            price: price,
            items: items,
            location: location,
            payment: payment
        });
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
                {/*singleFiles.map((file, index) => 
                    <div>
                        <img className="img-product" src={`${file.filePath}`} alt='' />
                    </div>
                )*/} <br/>
                <span className='img-product-span'>
                 <div>     
                    <div>   
                        <input type="file" name="file" id="file" />
                    </div>
                </div>
                </span> <br/>
                <input className="input-item" type="text" placeholder="Enter Item Title" onChange={(e) => setTitle(e.target.value)} /><br/>
                {pageSelection()}
                <br />
                <textarea type="textarea" className="textArea-item" placeholder="Enter Item Description" onChange={(e) => setDescription(e.target.value)}/><br/>
                <select className= "category"  onChange={(e) => setCondition(e.target.value)}>
                   <option>-- Select Condition --</option>
                   {secondData.map(item => {
                       return <option>{item.name}</option>
                   })}
                </select><br/>
                <input className="input-item" type="text" placeholder="Enter Item Price"  onChange={(e) => setPrice(e.target.value)}/><br/>
                <input className="input-item" type="text" placeholder="Enter the number of items"  onChange={(e) => setNumberOfItems(e.target.value)}/><br/>
                <input className="input-item" type="text" placeholder="Enter the Location"  onChange={(e) => setLocation(e.target.value)}/><br/>
                <label>payment method </label><br/>
                <span className="buttons-payment" ><button className="button-pay" type="submit" value="cash" id="cash" onClick={handleClick} >cash</button><button className="button-pay" value="paypal" id="paypal" onClick={handleClick}>paypal</button>
                    <button className="button-pay" value="visa" id="visa" onClick={handleClick}>Visa</button><button className="button-pay" value="exchange/negotiate" id="exchange" onClick={handleClick}>exchange/negotiate</button></span><br/>
                <span className="post-item"><button className="item-draft" type="submit">Save as draft</button>
                    <button className="item-post" type="submit" onClick={Combination} >Post</button>
                </span>          
            </div>
            <div className="seller_profile-info">
                {/*singleFiles.map((file, index) => 
                    <div>
                        <img className="img-product" src={`${file.filePath}`} alt='' />
                    </div>
                )*/} <br/>
                
                <input className="input-item-seller" type="text" placeholder="Enter Item Title"/>
                <input className="input-item-seller" type="text" placeholder="Enter Item Price"/>
                <textarea className="textArea-item-seller">Enter Item Description</textarea><br/>
                <input className="input-item-seller" type="text" placeholder="Enter the number of items"/><br/>
                <input className="input-item-seller" type="text" placeholder="Enter the Location"/><br/>
            </div>
        </div>
    );
}


export default ItmesToSell;