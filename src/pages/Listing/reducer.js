import { createSlice } from "@reduxjs/toolkit";
import { getItems } from "./actions";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
    wishlistItems: []
}

const listingSlice = createSlice({
    name: "listing",
    initialState,
    reducers: {
        addItems: [],
    },
    extraReducers(builder){
        builder.addCase(getItems.fulfilled, (state, action) => {
            state.items = [...state.items, ...action.payload];
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(getItems.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(getItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error
        })
    }
})

export const {
    addItems
} = listingSlice.actions;

export default listingSlice.reducer