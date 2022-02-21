import React, {useState} from 'react';
import {Link, NavLink, Redirect, useHistory} from 'react-router-dom';
import axios from 'axios';
import {useSelector} from 'react-redux';

import './explore.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import rectangkle from '../../images/Rectangle.png';
import searchbox from '../../images/Searchbox.png';
import mask from '../../images/Mask.png';

export const Explore = () => {
    let history = useHistory();
    const [getData, setGetData] = useState({})

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
        <div className="explore-com">
            <div className="side-nav">
                <nav className='sidebawrapper'>
                    <ul className='sidebarList'>
                        <li className='sidebarListItem'><NavLink to="/store-electronics" activeClassName="selectedLink">
                            <i class="fa fa-tablet"></i>Electronics</NavLink></li>
                        <li className='sidebarListItem'><NavLink to="/store-outdoors" activeClassName="selectedLink">
                            <i class="fas fa-campground"></i>Outdoors</NavLink></li>
                        <li className='sidebarListItem'><NavLink to="/store-gaming" activeClassName="selectedLink">
                            <i class="fab fa-xbox"></i>Gaming</NavLink></li>
                        <li className='sidebarListItem'><NavLink to="/store-freebies" activeClassName="selectedLink">
                            <i class="fab fa-freebsd"></i>Freebies</NavLink></li>
                        <li className='sidebarListItem'><NavLink to="/store-stationery" activeClassName="selectedLink">
                            <i class="fa fa-book"></i>Stationery</NavLink></li>
                    </ul>
                </nav>
            </div>
            <div className="top-nav">
                <input className="search-box" type="search" placeholder="Search Items"/>
                <select>
                    <option>All Categories</option>
                    <option>Electronics</option>
                    <option>Outdoors</option>
                    <option>Gaming</option>
                    <option>Freebies</option>
                    <option>Stationary</option>
                </select>
                <SearchOutlinedIcon className="i-search"/>
                {/* data? <redirect to="itemstosell" ></redirect> */}
                <button type="button" onClick={userinfo}><i class="fa fa-send-o"></i> Sell On Gude</button>
                <div className="right">
                    <ul>
                        <li><i className="fa fa-bell-o"></i></li>
                    </ul>
                    <ul>
                        <li><i className='fab fa-facebook-messenger'></i></li>
                    </ul>
                    <Link to="/messages">
                        <ul>
                            <li><i class="fa fa-heart-o"></i></li>
                        </ul>
                        <span>
                      {wishquantity}
                    </span>
                    </Link>
                    <Link to="/cart">
                        <ul>
                            <li><i class="fa fa-shopping-cart"></i></li>
                        </ul>
                        <span>
                      {quantity}
                    </span>
                    </Link>
                    <Link to="/Signout">
                        <ul>
                            <li>< img src={mask} alt=''/></li>
                        </ul>
                    </Link>
                    <i className="fa fa-angle-down"></i>
                    <ul className="dropdown">
                        <li><Link to="/" onClick={logoutHandler}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Explore;