import React, { useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';

import './addedtocard.css';
import capture from '../../images/Capture.PNG';
import navlogo from '../../images/nav-logo.png';
import capture2 from '../../images/Capture2.PNG';
import Explore from './NavExplore';
import Product from './ProductCategory';
import StripeCheckout from "react-stripe-checkout";
import {remove} from '../../Redux/cartRedux';
import laptop from '../../images/laptop.jpg';

const AddedtoCard = () => {
    const cart = useSelector((state) => state.cart);
    const [stripeToken, setStripeToken] = useState(null);
    const onToken = (token) => {
        setStripeToken(token);
    };

    console.log(cart);
    console.log(stripeToken);

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1);
        }
    };

    const handleDelete = () => {
        dispatch(remove())
    };

    const [products] = useState([
        {
            id: "1",
            name: 'Laptop',
            cost: 'R200.99',
            description: 'dell i5 model with good results',
            image: '{capture}'

        },
        {
            id: "2",
            name: 'iphone 12',
            cost: 'R1900.99',
            description: 'second hand cellphone',
            image: '{capture2}'

        },
        {
            id: "3",
            name: 'iphone 12',
            cost: 'R1900.99',
            description: 'second hand cellphone',
            image: 'https://www.wikihow.com/Get-the-URL-for-Pictures#/Image:Get-the-URL-for-Pictures-Step-4-Version-6.jpg'

        }
    ]);

    return (
        <>
            <Explore/>
            <h3 className="cart-heading">My cart</h3>
            {products.map((product, idx) => (
                <div className="cartcontainer">
                    <div>
                        <img className="img-product" src={laptop} alt="Cart Image"/>
                    </div>
                    <div className="seller-info">
                        <h2>{product.name}</h2>
                        <div>product discription</div>
                        <div className="price-display">{product.cost}</div>
                        <div>seller location</div>
                        <div className="date-display">date listing</div>
                        <div>seller location</div>
                        <div className="">
                            <button className="btn-click" onClick={() => handleQuantity("dec")}> - </button>
                            <span> {quantity} </span>
                            <button className="btn-click" onClick={() => handleQuantity("inc")}> +</button>
                            <button className="btn-proceed"> Proceed Checkout</button>
                            <button className="trash" onClick={() => handleDelete("inc")}><i class="fa fa-trash-o"></i></button>
                        </div>
                    </div>
                </div>
            ))}
            <div className="checkout-sum">
                <h1>Summary</h1>
                <h2>total:{quantity}</h2>
                <div></div>
                <div className="price-rands">amount:{cart.total} </div>
                <StripeCheckout
                    name="Gude MarketPlace"
                    image={navlogo}
                    billingAddress
                    shippingAddress
                    description={`Your total is R${cart.total}`}
                    amount={cart.total * 100}
                    token={onToken}
                    stripeKey="pk_test_51K6EQBGLbSOImgg0zEVMFtL7k9yVGiru6zA8UVFjdUJdNVGWlVgpZ7cgRgjH6q2119v4KdzSQvHnbPWhdDJMBVsX00oMdPVXYc"
                >
                <button className="btn-proceed-sum">Proceed Checkout</button>
                </StripeCheckout>
            </div>
        </>
    )
}

export default AddedtoCard