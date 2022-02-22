import React, {useContext, useState} from 'react';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';

import './global.css';

import {RegisterContext} from './Helper/Context';
import Login from './components/screens/Login';
import Registration from './components/screens/Registration';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword';
import NavExplore from './components/screens/NavExplore';
import AddProfile from './components/screens/AddProfile';
import AddProfileTwo from './components/screens/AddProfileTwo';
import Profile from './components/screens/Profile';
import {Redirect} from 'react-router-dom';
import About from './components/screens/Aboutpage';
import Product from './components/screens/ProductCategory';
import Forgot from './components/screens/Forgot';
import Reset from './components/screens/Reset';
import LoginSeller from './components/screens/Loginseller';
import Registrationseller from './components/screens/RegisterSeller';
import ItmesToSell from './components/screens/ItmesToSell';
import LoginScreen from './components/screens/Login';
import RegisterScreen from './components/screens/Registration';
import AddedtoCard from './components/screens/AddedtoCard';
import {ProductList} from './components/screens/ProductList';
import {Chatbox} from './components/screens/Chatbox';
import {PrivateScreen} from './components/screens/PrivateScreen';
import {PrivateRoute} from './components/privates/PrivateRoute';
import {AuthContext} from "./components/context/AuthContext";
import Messenger from "./components/pages/Messenger";
import ActivationEmail from './components/screens/ActivationEmail'
import NotFound from "./components/screens/notFound";
import Electronics from './components/screens/Electonics';
import Freebies from './components/screens/Freebies';
import Gaming from './components/screens/Gaming';
import Stationery from './components/screens/Stationery';
import Outdoors from './components/screens/Outdoors';


const App = () => {
    const {user} = useContext(AuthContext);

    return (            
        <BrowserRouter>       
            <PrivateRoute exact path="/" component={PrivateScreen}/>
            <Route axact path="/login" component={LoginScreen}/>
            <Route axact path="/loginseller" component={LoginSeller}/>
            <Route axact path="/registerseller" component={Registrationseller}/>
            <Route axact path="/forgot" component={Forgot}/>
            <Route axact path="/reset:resetoken" component={Reset}/>
            <Route axact path="/register" component={RegisterScreen}/>
            <Route path="/cart" component={AddedtoCard}/>
            <Route path="/addprofiletwo" component={AddProfileTwo}/>
            <Route path="/addprofile" component={AddProfile}/>
            <Route path="/resetpassword/:resetToken" component={ResetPassword}/>
            <Route path="/forgotpassword" component={ForgotPassword}/>
            <Route path="/product" component={Product}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/store" component={ProductList}/>
            <Route path="/additemstosell" component={ItmesToSell}/>
            <Route path="/about" component={About}/>
            <Route path="/store-electronics" component={Electronics}/>
            <Route path="/store-freebies" component={Freebies}/>
            <Route path="/store-gaming" component={Gaming}/>
            <Route path="/store-stationery" component={Stationery}/>
            <Route path="/store-outdoors" component={Outdoors}/>
            <Route path="/messages" component={Messenger}/>
            <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
            <Route component={NotFound}> </Route>
        </BrowserRouter>
    );
}

export default App;