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

// Load user from localStorage when Redux initializes
const storedUser = localStorage.getItem("loggedInUser");
const initialState = {
  user: storedUser ? checkTokenValidity(JSON.parse(storedUser)) : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: { user: JSON.parse(localStorage.getItem("loggedInUser")) || null },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      // localStorage.setItem("loggedInUser", JSON.stringify(action.payload)); // Update localStorage
    },
    logout: (state) => {
      state.user = null;
      // localStorage.removeItem("loggedInUser"); // Remove user from localStorage
    },
    checkAuth: (state) => {
      // const storedUser = localStorage.getItem("loggedInUser");
      // state.user = storedUser ? checkTokenValidity(JSON.parse(storedUser)) : null;
      state.user = checkTokenValidity(state.user);
    }
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
