import {createSlice} from "@reduxjs/toolkit";

const secondUserSlice = createSlice({
    name: "secondUser",
    initialState: {
        secondUser: null,
    },
    reducers: {
        loginsecond: (state, action) => {

            state.second = action.payload;

        },


    },
});

export const {loginsecond} = secondUserSlice.actions;
export default secondUserSlice.reducer;
export const selectFirstUser = (state) => state.secondUser.secondUser;