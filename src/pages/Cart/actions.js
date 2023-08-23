import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/baseApi";

const initiatePayment = createAsyncThunk('/cart/initiatePayment', async () => {
    const status = api.get("/products");
    return status;
})

export {
    initiatePayment
}