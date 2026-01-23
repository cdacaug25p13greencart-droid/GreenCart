import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  username: null,
  role: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;
    }
  }
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
