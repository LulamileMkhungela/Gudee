import "./profile.css";
import backImage from '../../images/back-image.png';
import mask from '../../images/Mask.png';
import Explore from "./NavExplore";
import {useState} from "react";


export default function Profile() {
    const [togglestate, SetTogglestate] = useState(1);

    const toggleTab = (index) => {
        SetTogglestate(index)
    }


    return (
        <>
            <Explore/>
            <img src={backImage} alt="Welcome Gude" className="profileback"/>
            <div className="image-size"><img src={mask} alt="Cinque Terre"/></div>
            <div className="profile-info">
                <div>
                    <div
                        className={togglestate === 1 ? "tab-active" : "tabs"}
                        onClick={() => toggleTab(1)}>
                        About
                    </div>
                    <div className={togglestate === 2 ? "tab-active" : "tabs"}
                         onClick={() => toggleTab(2)}>
                        listing
                    </div>
                    <div className={togglestate === 3 ? "tab-active" : "tabs"}
                         onClick={() => toggleTab(3)}>
                        messages
                    </div>
                    <div className={togglestate === 4 ? "tab-active" : "tabs"}
                         onClick={() => toggleTab(4)}>
                        sold items
                    </div>

                </div>
                <div>

                    <div
                        className={togglestate === 1 ? "content  active-content" : "content"}
                    >


                        <h2> intro</h2>
                        <p>
                            <i class="fas fa-briefcase"></i>

                            <i class="fa fa-map-marker"></i>
                            <i class="fa fa-home"></i>
                            <i class="fa fa-graduation-cap" aria-hidden="true"></i>


                        </p>
                    </div>
                    <div
                        className={togglestate === 2 ? "content  active-content" : "content"}
                    >


                        <p>
                            listing
                        </p>
                    </div>
                    <div
                        className={togglestate === 3 ? "content  active-content" : "content"}
                    >


                        <p>
                            Messages
                        </p>
                    </div>
                    <div
                        className={togglestate === 4 ? "content  active-content" : "content"}
                    >
                        <h2>Sold items</h2>

                        <p>
                            items sold
                        </p>
                    </div>

                </div>

            </div>

        </>
    );
}