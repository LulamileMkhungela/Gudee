import React from 'react';
import {BrowserRouter, Route, Switch } from 'react-router-dom';

import './global.css';
import { Payments } from  './components/screens/Payments';
import  Payfast from './components/screens/Payfast';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword';
import AddProfile from './components/screens/AddProfile';
import AddProfileTwo from './components/screens/AddProfileTwo';
import Profile from './components/screens/Profile';
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
import {PrivateScreen} from './components/screens/PrivateScreen';
import {PrivateRoute} from './components/privates/PrivateRoute';
import Messenger from "./components/pages/Messenger";
import ActivationEmail from './components/screens/ActivationEmail'
import Electronics from './components/screens/Electonics';
import Freebies from './components/screens/Freebies';
import Gaming from './components/screens/Gaming';
import Stationery from './components/screens/Stationery';
import Outdoors from './components/screens/Outdoors';
import PageNotFound from './components/screens/PageNotFound';

const App = () => {

    return (            
        <BrowserRouter>  
            <Switch>     
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
                <Route path="/home" component={ProductList}/>
                <Route path="/additemstosell" component={ItmesToSell}/>
                <Route path="/about" component={About}/>
                <Route path="/payfast" component={Payfast}/>
                <Route path="/electronics" component={Electronics}/>
                <Route path="/freebies" component={Freebies}/>
                <Route path="/gaming" component={Gaming}/>
                <Route path="/stationery" component={Stationery}/>
                <Route path="/outdoors" component={Outdoors}/>
                <Route path="/messages" component={Messenger}/>
                <Route component={PageNotFound}/>
                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact/>
            </Switch>
        </BrowserRouter>
    );
}

export default App;