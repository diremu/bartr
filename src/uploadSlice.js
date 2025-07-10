import { createSlice } from "@reduxjs/toolkit";

const getUploadsFromSession = () => {
    const stored = sessionStorage.getItem("uploads");
    return stored ? JSON.parse(stored) : [];
};

const setUploadsToSession = (uploads) => {
    sessionStorage.setItem("uploads", JSON.stringify(uploads));
};

const uploadSlice = createSlice({
    name: "upload",
    initialState: {
        uploads: getUploadsFromSession(),
        currentUpload: [],
        uploadError: null
    },
    reducers: {
        beginUpload: (state, action) => {
            if (action.payload.file) {
                const newFiles = action.payload.uploadFiles
                state.currentUpload = [...state.currentUpload, ...newFiles];
                console.log( state.currentUpload);
                state.uploadError = null;
            } else {
                state.uploadError = "No file has been selected for upload";
                console.error("No file provided");
            }
        },
        removeUpload: (state, action) => {
            state.uploads = state.uploads.filter(upload => upload.id !== action.payload.id);
            setUploadsToSession(state.uploads);
            state.uploadError = null;
        },
        completeUpload: (state, action) => {
            if (state.currentUpload && state.currentUpload.length > 0 && state.currentUpload.length < 4) {
                const newUploads = state.currentUpload.map(img => ({
                    ...img,
                    id: Date.now().toString(10),
                    user: action.payload.user,
                }));
                state.uploads.push(...newUploads);
                setUploadsToSession(state.uploads);
                state.currentUpload = [];
                state.uploadError = null;
                console.log("Complete")
            }else if(state.currentUpload.length > 3)  {
                state.uploadError = "You can only upload up to 3 images for a product"

            } else {
                state.uploadError = "Select picture(s) to upload"
            }
        }
    }
})

export const { beginUpload, removeUpload, completeUpload } = uploadSlice.actions;
export default uploadSlice.reducer;