import { createSlice } from "@reduxjs/toolkit";

const checkTokenValidity = (user) => {
  if (!user || !user.accessToken) return null;

  try {
    const decodedToken = JSON.parse(atob(user.accessToken.split(".")[1])); // Decode JWT
    return decodedToken.exp * 1000 > Date.now() ? user : null; // Return user only if token is valid
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null }, // Store only one active user
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Store only the latest logged-in user
    },
    logout: (state) => {
      state.user = null; // Clear the logged-in user
    },
    checkAuth: (state) => {
      state.user = checkTokenValidity(state.user);
    }
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
