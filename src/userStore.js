import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import uploadReducer from "./uploadSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        upload: uploadReducer,
    }
})