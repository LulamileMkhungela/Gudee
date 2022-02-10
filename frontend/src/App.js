
import { RegisterContext} from './Helper/Context';
import Login from './components/screens/Login';
import Registration from './components/screens/Registration';
import ForgotPassword from './components/screens/ForgotPassword';
import ResetPassword from './components/screens/ResetPassword';


import { BrowserRouter,Route,Switch,useHistory } from 'react-router-dom';





import './App.css';

import { useForm } from 'react-hook-form';
import { useContext, useState} from 'react';
import NavExplore from './components/screens/NavExplore';
import AddProfile from './components/screens/AddProfile';
import AddProfileTwo from './components/screens/AddProfileTwo';
import Profile from './components/screens/Profile';
import { Redirect } from 'react-router-dom';
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
import { ProductList } from './components/screens/ProductList';
import { Chatbox } from './components/screens/Chatbox';
import { PrivateScreen } from './components/screens/PrivateScreen';
import { PrivateRoute } from './components/privates/PrivateRoute';
import { AuthContext } from "./components/context/AuthContext";
import Cash from './components/Cash';
import PayPal from './components/PayPal';
import Card from './components/Card'
import Exchange from './components/Exchange'

//

const App=()=>{
  const { user } = useContext(AuthContext);
 
  return (
    <div>
    {/* <ItmesToSell/> */}
    <BrowserRouter>
      {/* <Route  axact path="/">
        {user? <ProductList/>:<Registration/>}
        </Route> 
        <Route path="/login">{user ? <Redirect to="/login" /> : <Login />}</Route>
        <Route path="/register">
        {user ? <Redirect to="/register" /> : <Registration />}
        </Route> */}
      <PrivateRoute exact path="/" component={PrivateScreen} />
      <Route  axact path="/login" component={LoginScreen} />
      <Route  axact path="/loginseller" component={LoginSeller} />
      <Route  axact path="/registerseller" component={ Registrationseller} />
      <Route axact path="/forgot" component={Forgot} />
      <Route axact path="/reset:resetoken" component={Reset} />

      <Route axact path="/register" component={RegisterScreen} />
      <Route path="/cart" component={AddedtoCard }/>
      <Route path="/addprofiletwo" component={AddProfileTwo}/>
      <Route path="/addprofile" component={AddProfile}/>
      <Route path="/resetpassword/:resetToken" component={ResetPassword}/>
      <Route path="/forgotpassword" component={ForgotPassword }/>
      <Route path="/product" component={Product }/>  
      <Route path="/profile" component={Profile }/>   
      <Route path="/productlist" component={ProductList }/> 
      <Route path="/additemstosell" component={ItmesToSell }/> 
      <Route path="/cash" component={Cash}/>
      <Route path="/about" component={About}/> 
      <Route path="/PayPal" component={PayPal}/>
      <Route path="/Card" component={Card}/>
      <Route path="/Exchange" component={Exchange}/>
      {/* <Route path="/messages" component={<Messages/>}/>  */}
    </BrowserRouter>
  </div>
  );
}

export default App;