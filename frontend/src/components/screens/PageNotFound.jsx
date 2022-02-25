import React from 'react';
import {Link} from 'react-router-dom';

import './PageNotFound.scss';
import Image from '../../images/15.png'

function PageNotFound() {
  return (
    <>
        <div className="page-not-found">
            <img className="Image-file" src={Image} alt="page not found" />
            <h1>Ooops!! The page you looking for, doesn't exist.</h1>
            <div className="button">
                <Link to="/store"><button className="btn-home">Go to store page</button></Link>
                <Link to="/login"><button className="btn-home">Go to login page</button></Link>
            </div>
        </div>
    </>
  )
}

export default PageNotFound;