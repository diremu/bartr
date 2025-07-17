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
            if (action.payload.uploadFiles && action.payload.uploadFiles.length > 0) {
                const newFiles = action.payload.uploadFiles
                console.log(newFiles);
                state.currentUpload.push([...newFiles])
                state.uploadError = null;
                return ;
            } else {
                state.uploadError = "No file has been selected for upload";
                console.error("No file provided");
                return ;
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
                    email: action.payload.email,
                }));
                state.uploads.push(...newUploads);
                setUploadsToSession(state.uploads);
                console.log(newUploads)
                console.log(action.payload)
                state.currentUpload = [];
                state.uploadError = null;
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