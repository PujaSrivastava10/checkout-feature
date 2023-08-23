import { createSlice } from "@reduxjs/toolkit";
import { LISTING_PAGE } from "./constants/appConstants";

const initialState = {
    screenType: LISTING_PAGE,
}

const cartSlice = createSlice({
    name: "screen",
    initialState,
    reducers: {
        goToScreen: (state, action) => {
            state.screenType = action.payload
        }
    }
})

export const {
    goToScreen
} = cartSlice.actions;

export default cartSlice.reducer;