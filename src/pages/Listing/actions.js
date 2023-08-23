import api from "../../utils/baseApi";
import { createAsyncThunk  } from "@reduxjs/toolkit";

const getItems = createAsyncThunk("/listing/addItems", async() => {
    const response = await api.get("/api/products");
    return response.data
})

export {
    getItems
}