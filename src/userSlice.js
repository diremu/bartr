import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isAuthenticated: false,
    users: [],
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = "";
      state.isAuthenticated = false;
    },
    signup: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.users.push(action.payload.details);
      console.log("User details:", action.payload.details);
      console.log(state.isAuthenticated)
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;