import { createSlice } from "@reduxjs/toolkit";

const saveToStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromStorage = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const getUsersFromStorage = () => {
  return getFromStorage('users') || [];
};

const getCurrentUser = () => {
  return getFromStorage('currentUser');
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getCurrentUser(),
    isAuthenticated: getCurrentUser(),
    users: getUsersFromStorage(),
    loginError: null,
    signupError: null,
    loginLoading: false,
    signupLoading: false,
  },
  reducers: {
    loginStart: (state) => {
      state.loginLoading = true;
      state.loginError = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loginLoading = false;
      state.loginError = null;
      saveToStorage('currentUser', action.payload);
    },
    loginFailure: (state, action) => {
      state.loginLoading = false;
      state.loginError = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    signupStart: (state) => {
      state.signupLoading = true;
      state.signupError = null;
    },
    signupSuccess: (state, action) => {
      const { userDetails } = action.payload;
      state.user = userDetails;
      state.isAuthenticated = true;
      state.signupLoading = false;
      state.signupError = null;
      state.users.push(userDetails);
      saveToStorage('users', state.users);
      saveToStorage('currentUser', userDetails);
    },
    signupFailure: (state, action) => {
      state.signupLoading = false;
      state.signupError = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loginError = null;
      state.signupError = null;
      sessionStorage.removeItem('currentUser');
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.signupError = null;
    },
    attemptLogin: (state, action) => {
      const { email, password } = action.payload;
      
      if (!email || !password) {
        state.loginError = "Email and password are required";
        return;
      }
      
      const users = getUsersFromStorage();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        state.loginError = "User not found. Please check your email or sign up.";
        return;
      }
      
      if (user.password !== password) {
        state.loginError = "Incorrect password. Please try again.";
        return;
      }
      
      state.user = user;
      state.isAuthenticated = true;
      state.loginError = null;
      saveToStorage('currentUser', user);
    },
    attemptSignup: (state, action) => {
      const { firstName, lastName, email, password } = action.payload;
      
      if (!firstName || !lastName || !email || !password) {
        state.signupError = "All fields are required";
        return;
      }
      
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
      if (!emailRegex.test(email)) {
        state.signupError = "Please enter a valid email address";
        return;
      }
      
      const passwordRegex = /^[a-zA-Z][a-zA-Z0-9._%+-]{8,}$/

      if (password.length < 8) {
        state.signupError = "Password must be at least 8 characters long";
        return;
      }
      if (!passwordRegex.test(password)) {
        state.signupError = "Password must start with a letter and contain at least 8 characters";
        return;
      }

      const users = getUsersFromStorage();
      const existingUser = users.find(user => user.email === email);
      
      if (existingUser) {
        state.signupError = "An account with this email already exists";
        return;
      }
      
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        password,
        createdAt: new Date().toISOString()
      };
      
      state.user = newUser;
      state.isAuthenticated = true;
      state.signupError = null;
      state.users.push(newUser);
      saveToStorage('users', state.users);
      saveToStorage('currentUser', newUser);
    },
  },
});

export const { 
  loginStart, 
  loginSuccess, 
  loginFailure, 
  signupStart, 
  signupSuccess, 
  signupFailure, 
  logout, 
  clearErrors,
  attemptLogin,
  attemptSignup
} = userSlice.actions;
export default userSlice.reducer;