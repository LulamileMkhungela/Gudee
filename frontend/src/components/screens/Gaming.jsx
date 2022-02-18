import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios'

import leftArrow from '../../images/leftArrow.png';
import './Electronics.css';

// dummy data
const images = [
  {name: 'Thabiso'},
  {name: 'Themba'},
  {name: 'Molapo'},
  {name: 'Lulamile'},
  {name: 'Moonde'},
  {name: 'Stanley'},
  {name: 'Sequence'},
  {name: 'Roslyn'}
]

function Gaming() {
  const [gaming, setGaming] = useState([]);

  useEffect(() => {
    // back end route
    axios.get('').then(res => {
      setGaming(res.data);
    }).catch(err => {
      console.log(err);
    });
  },[]);

  return (
    <>
      <div className="page">
        <h1 className="products">Gaming</h1>
          <div className="button">
            <Link to="/productlist"><img src={leftArrow} className="btn"/></Link>
          </div>    
      </div>
      <div>
        {images.map((item) => {
          return (
            <div className="block">
              <h3 className="title" >{item.name}</h3>
            </div>)
        })}
      </div>
    </>
  )
}

export default Gaming