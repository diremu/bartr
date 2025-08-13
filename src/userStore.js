import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js"
import uploadReducer from "./uploadSlice.js";
import itemsReducer from "./itemsSlice.js";

export const store = configureStore({
    reducer: {
        user: userReducer,
        upload: uploadReducer,
        items: itemsReducer
    }
})