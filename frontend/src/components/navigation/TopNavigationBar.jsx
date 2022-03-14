import React, {useState} from 'react';
import {Link, NavLink, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { MdSearch, MdLogout } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { FaBars} from 'react-icons/fa';

import './TopNavigationBar.css';
import searchPng from '../../images/search-3-16.png';
import mask from '../../images/Mask.png';
import logo from '../../images/logo-bootstrap.png';
import user from '../../images/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe74aa7f1.6157264215229736713058.png';
import logout from '../../images/kisspng-computer-icons-login-icon-design-5afc286c965262.3963908515264748606157.png';

function TopNavigationBar() {
    let history = useHistory();
    const [getData, setGetData] = useState({});
    const [togglestate, SetTogglestate] = useState(null);

    const userinfo = async () => {
        await axios.post("/api/auth/login").then((res) => {
            const data = res.data;
            // console.log(data);
            if (!data) {
                history.push("/addprofile")
            } else {
                history.push("/itemstosell")
            }
        })
        .catch(err => {
            console.log(err)
        })
    }

    const quantity = useSelector(state => state.cart.quantity)
    const wishquantity = useSelector(state => state.wishlist.quantity)

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    

  return (
    <div className="align-items-navbar">
        <div className="logo-container">
            <Link to="/home">  
                <img className="navbar-logo" src={logo} alt="logo" />
            </Link>
            <div className="menu-icon">
                <FaBars />
            </div>
        </div>
        <nav className="navbar">
            <div className="main-container">
                <div className="input-elements">
                    <input type="search" placeholder="Search Items" className="input-design" />
                    <select className="options">
                        <option>All categories</option>
                        <option value="electronics">Electronics</option>
                        <option value="freenbie">Freebie</option>
                        <option value="phone">Phone</option>
                        <option value="book">Book</option>
                    </select>
                    <button className="btn-design"><MdSearch /></button>
                </div>
                <div className="button-icon-elements">
                    <div className="icons">
                        <ul>
                            <li>
                                <button className="sell-on-gude-btn" onClick={userinfo()}>
                                    <i class="fa fa-send-o">  Sell On Gude</i>
                                </button>
                            </li>
                            <li>
                                <Link className="deco-icons" to="/messages">
                                    <i className='fab fa-facebook-messenger fa-2x'></i>
                                </Link>
                            </li>
                            <li>
                                <Link className="deco-icons" to="/profile">
                                    <i className="fa fa-bell-o fa-2x"></i>
                                </Link>
                            </li>
                            <li>
                                <Link className="deco-icons" to="/wishList">
                                    <span className="cart-wish">
                                        {wishquantity}
                                    </span>
                                    <i class="fa fa-heart-o fa-2x"></i>                         
                                </Link>
                            </li>
                            <li>
                                <Link className="deco-icons" to="/cart">
                                    <span className="cart-wish">
                                        {quantity}
                                    </span>
                                    <i class="fa fa-shopping-cart fa-2x"></i>
                                </Link>
                            </li>
                            <li>
                                <img src={mask} className="profile"  alt="profile picture" />
                                <ul>
                                    <li className="sub-item">
                                        <img src={user} alt="" className="profile-images" />
                                        <p><Link to="/profile">My profile</Link></p>              
                                    </li>
                                    <li className="sub-item">
                                        <img src={logout} alt="" className="profile-images" />
                                        <p><Link to="/login">Logout</Link></p>              
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default TopNavigationBar