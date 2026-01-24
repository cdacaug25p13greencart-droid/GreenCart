import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axiosConfig";

/* 🔐 LOGIN ASYNC THUNK */
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      console.log("🔐 Attempting login with credentials:", { username: credentials.username });

      const res = await api.post("/user/login", credentials);

      console.log("✅ Login successful, response:", res.data);
      return res.data; // user object from backend with token
    } catch (err) {
      console.error("❌ Login failed:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      return thunkAPI.rejectWithValue(err.response?.data || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,           // JWT token
    tokenExpiry: null,     // Token expiration timestamp
    isAuthenticated: false,
    role: null,
    loading: false,
    error: null
  },
  reducers: {
    /* 🔄 RESTORE USER FROM localStorage */
    setUserFromStorage: (state, action) => {
      console.log("🔄 Restoring user from storage:", action.payload);
      state.user = action.payload;
      state.isAuthenticated = true;
      state.role = action.payload.role;
    },

    /* 🚪 LOGOUT */
    logout: (state) => {
      console.log("🚪 Logging out user");
      state.user = null;
      state.isAuthenticated = false;
      state.role = null;

      // ⚠️ Cannot clear storage due to SES restrictions
      console.warn("⚠️ Storage is blocked by SES - user data only exists in Redux state");
    }
  },
  extraReducers: (builder) => {
    builder
      /* ⏳ LOGIN START */
      .addCase(login.pending, (state) => {
        console.log("⏳ Login pending...");
        state.loading = true;
        state.error = null;
      })

      /* ✅ LOGIN SUCCESS */
      .addCase(login.fulfilled, (state, action) => {
        console.log("✅ Login fulfilled with data:", action.payload);
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.token;
        state.tokenExpiry = Date.now() + action.payload.expiresIn;
        state.role = action.payload.role;
        state.isAuthenticated = true;

        // ⚠️ Cannot store in sessionStorage due to SES restrictions
        console.warn("⚠️ Storage blocked by SES - user data will NOT persist on page refresh");
        console.log("✅ User data stored in Redux state (memory only)");
        console.log("🔑 JWT Token:", action.payload.token);
        console.log("⏰ Token expires at:", new Date(Date.now() + action.payload.expiresIn).toLocaleString());
      })

      /* ❌ LOGIN FAILED */
      .addCase(login.rejected, (state, action) => {
        console.error("❌ Login rejected:", action.payload);
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setUserFromStorage, logout } = authSlice.actions;
export default authSlice.reducer;