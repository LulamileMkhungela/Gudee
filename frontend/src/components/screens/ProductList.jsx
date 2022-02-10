import React from 'react';
import './productlist.css';
import iphone from '../../images/iphone.png'
import Explore from './NavExplore';
import Product from './ProductCategory';

export const ProductList = () => {
    return (

             <div className="all">
               <Explore/>

              <div className="wrapper">
              <h1>GET THE NEW IPHONE12 PRO 12</h1> 
               <div ><img className="iphone-img" src={iphone}  /></div>
              <button className="btn-buy"><i class="fa fa-shopping-cart"></i> Buy item</button>
              
               <button className="btn-text"> Buy item</button>
               </div>
               <h1 className="deals">new deal</h1>
               <div className= "category">
                    <Product/>
                 </div>
                 <div  className= "sub-product">
                     <h1 className="deals">Frequently bought Items</h1>
                 <Product/>
                 </div>
                
            
                 
        </div>
    )
}
