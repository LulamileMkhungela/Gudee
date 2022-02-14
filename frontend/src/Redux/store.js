import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import wishReducer from './wishlistRedux'
import firstUserReducer from './LoginFirstRedux'
import secondUserReducer from './LoginSecondRedux'




export default configureStore({
    reducer:{
        cart:cartReducer,
        wishlist:wishReducer,
        firstUser:firstUserReducer,
        secondUser:secondUserReducer,
    },
 
})

