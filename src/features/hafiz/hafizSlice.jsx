/* eslint-disable no-useless-catch */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "../../util/api";

const initialState = {
    allHafiz: [],
    isLoading: false,
    error: [],
    isError: false,
    isRequestLoading: false,
    isRequestError: false,
};
const token = localStorage.getItem("jazakAuthToken")?.toString();

// async thunk to fetch all Hadith data from an API
export const fetchAllHafiz = createAsyncThunk("hafiz/all", async () => {
    const token = localStorage.getItem("jazakAuthToken")?.toString();
    const response = await fetch(`${baseUrl}/hafiz/all`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = await response.json();
    return data;
});


const hafizSlice = createSlice({
    name: "hafiz",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //GET DATA
        builder.addCase(fetchAllHafiz.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.error = null;
        });
        builder.addCase(fetchAllHafiz.fulfilled, (state, action) => {
            state.allHafiz = action.payload;
            state.isLoading = false;
            state.isError = false;
            state.error = null;
        });

        builder.addCase(fetchAllHafiz.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.error = action.error.message;
        });

       
    },
});

export default hafizSlice.reducer;
