import { createSlice } from "@reduxjs/toolkit";

import {
  authSessionCleared,
  authSessionReceived,
  signIn,
} from "@redux/auth/auth.action";

const initialState = {
  username: null,
  token: null,
  role: null,
  isAuthenticated: false,
  isSigningIn: false,
  signInError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSessionReceived, (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = Boolean(action.payload.token);
        state.signInError = null;
      })
      .addCase(authSessionCleared, (state) => {
        state.username = null;
        state.token = null;
        state.role = null;
        state.isAuthenticated = false;
        state.isSigningIn = false;
        state.signInError = null;
      })
      .addCase(signIn.pending, (state) => {
        state.isSigningIn = true;
        state.signInError = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.role = action.payload.role;
        state.isAuthenticated = Boolean(action.payload.token);
        state.isSigningIn = false;
        state.signInError = null;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isSigningIn = false;
        state.signInError =
          action.payload ?? "Invalid username, password, or role.";
      });
  },
});

export default authSlice.reducer;
