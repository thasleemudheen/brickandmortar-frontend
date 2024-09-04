import { createSlice } from "@reduxjs/toolkit";

const vendorSlice=createSlice({
    name:'vendor',
    initialState:{
        vendorDetails:{},
    },
    reducers:{
        setVendorDetails: (state, action) => {
            state.vendorDetails = action.payload;
          },
    }
})
export const {setVendorDetails}=vendorSlice.actions
export default vendorSlice.reducer