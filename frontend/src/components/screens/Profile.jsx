import "./profile.css";
import backImage from '../../images/back-image.png';
import mask from '../../images/Mask.png';
import Explore from "./NavExplore";
import { RegisterContext } from '../../Helper/Context';
import { useContext } from "react";

export default function Profile() {
  const registration =useContext(RegisterContext);
  return (
    <>
    <Explore/>
    <img  src= { backImage} alt = "Welcome Gude" className="profileback" />
  <div className="image-size"><img src={mask} className="rounded-circle" alt="Cinque Terre"/></div>
  <div className="profile-info">hey</div>
  
  </> 
  );
}