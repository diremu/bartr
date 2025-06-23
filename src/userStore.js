import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./userSlice.js"

export const store = configureStore({
    //general store for information
    reducer: {
        user: userSlice
    }
})