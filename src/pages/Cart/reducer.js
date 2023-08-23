import { createSlice } from "@reduxjs/toolkit";
import { initiatePayment } from "./actions";
import { STATUS } from "../../constants/appConstants";
const { IDLE, REJECTED, SUCCESS, PENDING } = STATUS;

const initialState = {
    wishlistItems: [],
    cartItems: [],
    isLoading: false,
    error: null,
    paymentStatus: IDLE,
    totalAmount: 0,
    discountAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToWishlist: (state, action) => {
            state.wishlistItems = [...state.wishlistItems, action.payload];
        },
        removeItemFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter((value) => value.id !== action.payload?.id);
        },
        addItemToCart: (state, action) => {
            let itemFoundInCart = false;
            const items = state.cartItems.map((value) => {
                if(value.id === action.payload?.id){
                    value = {
                        ...value, 
                        quantity: value.quantity+1
                    }
                    itemFoundInCart = true;
                }
                return value;
            });
            state.cartItems = itemFoundInCart ? [...items] : [...state.cartItems, {...action.payload, quantity: 1}]
        },
        updateItemQuantity: (state, action) => {
            const items = state.cartItems.map((value) => {
                if(value.id === action.payload?.id){
                    value = {
                        ...action.payload,

                    }
                }
                return value;
            });
            state.cartItems = [...items]
        },
        removeItemFromCart:  (state, action) => {
            state.cartItems = state.cartItems.filter((value) => value.id !== action.payload?.id);
        },
        initiatePayment: (state, action) => {
            state.paymentStatus = SUCCESS
        },
        setPaymentStatus: (state, action) => {
            state.paymentStatus = action.payload;
        },
        resetCart: (state, action) => {
            state.cartItems = [];
            state.paymentStatus = IDLE;
        },
    },
    extraReducers(builder){
        builder.addCase(initiatePayment.fulfilled, (state, action) => {
            state.paymentStatus = SUCCESS;
            state.isLoading = false;
            state.error = null;
        })
        builder.addCase(initiatePayment.pending, (state) => {
            state.paymentStatus = PENDING;
            state.isLoading = true;
            state.error = null;
        })
        builder.addCase(initiatePayment.rejected, (state, action) => {
            state.paymentStatus = REJECTED;
            state.isLoading = false;
            state.error = action.payload.error
        })
    }
})

export const {
    addItemToWishlist,
    removeItemFromWishlist,
    addItemToCart,
    updateItemQuantity,
    setPaymentStatus,
    resetCart
} = cartSlice.actions;

export default cartSlice.reducer;