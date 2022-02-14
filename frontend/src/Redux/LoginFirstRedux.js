import {createSlice} from "@reduxjs/toolkit";

const firstUserSlice = createSlice({
    name: "firstUser",
    initialState: {
        firstUser: null,
    },
    reducers: {
        login: (state, action) => {

            state.firstUser = action.payload;

        },
        logout: (state) => {
            state = null;
        }

    },
});

export const {logout, login} = firstUserSlice.actions;
export default firstUserSlice.reducer;
export const selectFirstUser = (state) => state.firstUser.firstUser;