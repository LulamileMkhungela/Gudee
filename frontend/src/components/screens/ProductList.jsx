import React from 'react';
import { GiTakeMyMoney } from "react-icons/gi";
import { BsCartPlusFill } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { MdDeliveryDining } from "react-icons/md";

import './productlist.css';
import iphone from '../../images/iphone.png';
import Explore from './NavExplore';
import Product from './ProductCategory';

export const ProductList = () => {
    return (
        <>
            <Explore/>
            <div className="hidden-div"></div>
            <div className="product-container">
                <div className="group-btn">
                    <div className="surrounding-border">        
                        <button className="btn-sales">New Arrivals</button>
                        <button className="btn-sales">On Sale</button>
                        <button className="btn-sales">Back Friday</button>
                        <button className="btn-sales">Weekly Sale</button>
                    </div>
                </div>
                <div className="first-product-div">
                    <div className="promo-item">
                        <div className="promo-div">
                            <img className="promo-image" src={iphone} alt="" />
                            <h6>GET THE NEW IPHONE<br /> 12 PRO</h6>
                            <p className="promo-p-tag">A tranformative triple-camera system that adds tons of capability without<br /> complexity</p>
                            <ul>
                                <li>
                                    <button className="buy-now">Buy now  <GiTakeMyMoney size={22} /></button>
                                </li>
                                <li>
                                    <button className="exchange" disabled>With R599 for exchange</button>
                                </li>
                            </ul>    
                        </div>
                    </div>
                    <div className="product-aligned">
                         <div className="product-image">
                            <img src={iphone} alt="" className="product-top-image" />  
                            <button className="delivery"><MdDeliveryDining size={30} color={'red'}/></button>   
                        </div>
                        <div className="body-content">
                            <h5 className="product-elements">Product Name</h5>
                            <p className="availability"><i>Availability/state</i></p>
                            <div className="same-line-rand">
                                <p className="sku-number">sku number</p>
                                <p className="price">R450</p>
                            </div>
                            <div className="date">
                                <p className="location">Location</p>
                                <p className="listed-on">Listed on: 10/03/2022</p>
                            </div>
                        </div>
                        <div className="product-information">
                            <ul>
                                <li>
                                    <button className="add-to-cart-btn"><BsCartPlusFill /> ADD TO CART</button>
                                </li>
                                <li>
                                    <button className="wish-list-btn"><BiHeart /> WISHLIST</button>
                                </li>
                            </ul>    
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

{/**
<div className="all">
            <Explore/>

            <div className="wrapper">
                <h1>GET THE NEW IPHONE12 PRO 12</h1>
                <div><img className="iphone-img" src={iphone} alt={''}/></div>
                <button className="btn-buy"><i className="fa fa-shopping-cart"> </i> Buy item</button>

                <button className="btn-text"> Buy item</button>
            </div>
            <h1 className="deals">new deal</h1>
            <div className="category">
                <Product/>
            </div>
            <div className="sub-product">
                <h1 className="deals">Frequently bought Items</h1>
                <Product />
            </div>
        </div>
 */}