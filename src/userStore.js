import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"

export const store = configureStore({
    //general store for information
    reducer: {
        user: userReducer
    }
})