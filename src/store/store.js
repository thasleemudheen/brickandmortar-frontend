import { configureStore } from "@reduxjs/toolkit";
import vendorReducer from './Slice/vendorSlice'
export const store = configureStore({
    reducer: {
        vendor:vendorReducer
    }
  })
  