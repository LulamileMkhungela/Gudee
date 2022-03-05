import React, {useState} from "react";
import {Link} from 'react-router-dom';

import "./profile.css";
import backImage from '../../images/back-image.png';
import mask from '../../images/Mask.png';
import Explore from "./NavExplore";
import leftArrow from '../../images/leftArrow.png';

// screens
import AboutScreen from '../pages/AboutScreen';
import DraftScreen from '../pages/DraftScreen';
import SoldItemsScreen from '../pages/SoldItemsScreen';
import ListingsScreen from '../pages/ListingsScreen';
import OptionScreen from '../pages/OptionScreen';

export default function Profile() {
    const [togglestate, SetTogglestate] = useState(1);

    const toggleTab = (index) => {
        SetTogglestate(index)
    }
    
    return (
        <>
            <Explore/>
            {/* cover image, profile picture and name will be changed when connecting to the back-end */}
            <img src={backImage} alt="Welcome Gude" className="profileback"/>
            <div className="image-size"><img src={mask} alt="Cinque Terre"/></div>
            <div><h1 className="profile-name">Thabiso Hlatshwayo</h1></div>
            <center>
                <hr className="line" />
            </center>
            <div className="profile-info">
                <div>
                    <div
                        className={togglestate === 1 ? "tab-active" : "tabs"}
                        onClick={() => toggleTab(1)}>
                        Your listings
                    </div>
                    <div
                        className={togglestate === 2 ? "tab-active" : "tabs"}
                        onClick={() => toggleTab(2)}>
                        Drafts
                    </div>
                    <div className={togglestate === 3 ? "tab-active" : "tabs"}
                         onClick={() => toggleTab(3)}>
                        About
                    </div>
                    <div className={togglestate === 4 ? "tab-active" : "tabs"}
                         onClick={() => toggleTab(4)}>
                        Sold items
                    </div>
                    <div className={togglestate === 5 ? "tab-active" : "tabs"}
                         onClick={() => toggleTab(5)}>
                        Options
                    </div>
                </div>
                <div>
                    <div className={togglestate === 1 ? "content  active-content" : "content"}>
                        <ListingsScreen />
                    </div>
                    <div className={togglestate === 2 ? "content  active-content" : "content"}>
                        <DraftScreen />
                    </div>
                    <div className={togglestate === 3 ? "content  active-content" : "content"}>
                        <AboutScreen />
                    </div>
                    <div className={togglestate === 4 ? "content  active-content" : "content"}>
                        <SoldItemsScreen />
                    </div>
                    <div className={togglestate === 5 ? "content  active-content" : "content"}>
                        <OptionScreen />
                    </div>
                </div>
            </div>
        </>
    );
}