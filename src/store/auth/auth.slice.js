import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  token: null,
  role: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSessionReceived(state, action) {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.isAuthenticated = Boolean(action.payload.token);
    },
    authSessionCleared(state) {
      state.username = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
    },
  },
});

export const { authSessionReceived, authSessionCleared } = authSlice.actions;
export default authSlice.reducer;
