import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartRedux'
import wishReducer from './wishlistRedux'




export default configureStore({
    reducer:{
        cart:cartReducer,
        wishlist:wishReducer,
    },
 
})

