import React from 'react';
import {Link} from 'react-router-dom'

import './Modal.css'

const Card = () => {//
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleClosedBtn">
                    <Link to="/addprofiletwo">
                        <button> x</button>
                    </Link>
                </div>
                <div className="title">
                    <h1>Visa</h1>
                </div>
                <div className="body">
                    <p>body</p>
                </div>
                <div className="footer">
                    <button>Save</button>
                    <Link to="/addprofiletwo">
                        <button id="cancelBtn">Cancel</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Card;