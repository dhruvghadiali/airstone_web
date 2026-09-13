import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import {
  adminAuthApi,
  employeeAuthApi,
  extractErrorMessage,
  superAdminAuthApi,
} from "@api";
import { ROLES } from "@enum/roles";
import { isAuthTokenValid } from "@/routes/auth-token.util";
import { toLoginApiPayload } from "@screenComponent/login/form/login-api.payload";
import { fromLoginResponse } from "@screenComponent/login/form/login-frontend.payload";
import {
  getStoredAuth,
  removeStoredAuth,
  setStoredAuth,
} from "@redux/auth/auth.storage";

export const authSessionReceived = createAction("auth/sessionReceived");
export const authSessionCleared = createAction("auth/sessionCleared");

const authApiByRole = Object.freeze({
  [ROLES.SUPER_ADMIN]: superAdminAuthApi,
  [ROLES.ADMIN]: adminAuthApi,
  [ROLES.EMPLOYEE]: employeeAuthApi,
});

function normalizeSession(session) {
  return {
    username: session?.username ?? null,
    token: session?.token ?? null,
    role: session?.role ?? null,
  };
}

export function restoreAuthSession() {
  return (dispatch) => {
    const storedSession = getStoredAuth();

    if (isAuthTokenValid(storedSession?.token)) {
      dispatch(authSessionReceived(normalizeSession(storedSession)));
      return;
    }

    removeStoredAuth();
    dispatch(authSessionCleared());
  };
}

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (values, { rejectWithValue }) => {
    try {
      const authApi = authApiByRole[values.role];

      if (!authApi) {
        throw new Error("Please select a valid role.");
      }

      const response = await authApi.signIn(toLoginApiPayload(values));
      const session = normalizeSession({
        ...fromLoginResponse(response),
        role: values.role,
      });

      if (!isAuthTokenValid(session.token)) {
        throw new Error("The sign-in response included an invalid or expired access token.");
      }

      setStoredAuth(session);
      return session;
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);

export function loggedOut() {
  return (dispatch) => {
    removeStoredAuth();
    dispatch(authSessionCleared());
  };
}
