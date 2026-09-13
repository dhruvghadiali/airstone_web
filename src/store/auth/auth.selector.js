export const selectAuth = (state) => state.auth;

export const selectAuthToken = (state) => selectAuth(state).token;

export const selectAuthRole = (state) => selectAuth(state).role;

export const selectAuthUsername = (state) => selectAuth(state).username;

export const selectIsAuthenticated = (state) =>
  selectAuth(state).isAuthenticated;

export const selectIsSigningIn = (state) => selectAuth(state).isSigningIn;

export const selectSignInError = (state) => selectAuth(state).signInError;
