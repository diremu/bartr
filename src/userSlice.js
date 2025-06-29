import { createSlice } from "@reduxjs/toolkit";

// Helper functions for session storage
const saveToStorage = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

const getFromStorage = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const getUsersFromStorage = () => {
  return getFromStorage('bartr_users') || [];
};

const getCurrentUser = () => {
  return getFromStorage('bartr_current_user');
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: getCurrentUser(),
    isAuthenticated: !!getCurrentUser(),
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
      // Save current user to session storage
      saveToStorage('bartr_current_user', action.payload);
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
      // Add user to users array and save to storage
      state.users.push(userDetails);
      saveToStorage('bartr_users', state.users);
      saveToStorage('bartr_current_user', userDetails);
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
      // Clear current user from session storage
      sessionStorage.removeItem('bartr_current_user');
    },
    clearErrors: (state) => {
      state.loginError = null;
      state.signupError = null;
    },
    // Validation and authentication logic
    attemptLogin: (state, action) => {
      const { email, password } = action.payload;
      
      // Validate input
      if (!email || !password) {
        state.loginError = "Email and password are required";
        return;
      }
      
      if (!email.includes('@')) {
        state.loginError = "Please enter a valid email address";
        return;
      }
      
      // Find user in storage
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
      
      // Login successful
      state.user = user;
      state.isAuthenticated = true;
      state.loginError = null;
      saveToStorage('bartr_current_user', user);
    },
    attemptSignup: (state, action) => {
      const { firstName, lastName, email, password } = action.payload;
      
      // Validate input
      if (!firstName || !lastName || !email || !password) {
        state.signupError = "All fields are required";
        return;
      }
      
      if (!email.includes('@')) {
        state.signupError = "Please enter a valid email address";
        return;
      }
      
      if (password.length < 6) {
        state.signupError = "Password must be at least 6 characters long";
        return;
      }
      
      // Check if user already exists
      const users = getUsersFromStorage();
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        state.signupError = "An account with this email already exists";
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName,
        lastName,
        email,
        password,
        createdAt: new Date().toISOString()
      };
      
      // Signup successful
      state.user = newUser;
      state.isAuthenticated = true;
      state.signupError = null;
      state.users.push(newUser);
      saveToStorage('bartr_users', state.users);
      saveToStorage('bartr_current_user', newUser);
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