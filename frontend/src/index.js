import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import  store from './Redux/store';
import { AuthContextProvider } from "./components/context/AuthContext";
//import  Reducer  from './components/Reducer';
import App from './App';







ReactDOM.render(
  <AuthContextProvider>
  <Provider store={store}>
   <React.StrictMode>
   
        <App />
    
    </React.StrictMode>
  </Provider>,
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

