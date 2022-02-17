import React from 'react'
import {Link} from 'react-router-dom';

import leftArrow from '../../images/leftArrow.png';
import './Electronics.css';

function Freebies() {
  return (
    <div className="page">
        <div className="button">
            <Link to="/productlist"><img src={leftArrow} className="btn"/></Link>
        </div>    
    </div>
  )
}

export default Freebies