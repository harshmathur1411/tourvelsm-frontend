import { createSlice } from "@reduxjs/toolkit";


const checkTokenValidity = (users) => {
  return users.filter((user) => {
    const decodedToken = JSON.parse(atob(user.accessToken.split(".")[1])); // Decode JWT
    return decodedToken.exp * 1000 > Date.now(); // Check if token is still valid
  });
};

const authSlice = createSlice({
  name: "auth",
  initialState: { users: [] },
  reducers: {
    login: (state, action) => {
      state.users.push(action.payload);
    },
    logout: (state, action) => {
      state.users = state.users.filter(user => user.email !== action.payload.email);
    },
    checkAuth: (state) => {
      state.users = checkTokenValidity(state.users);
    }
  },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;