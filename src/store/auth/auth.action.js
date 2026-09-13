import {
  authSessionCleared,
  authSessionReceived,
} from "@redux/auth/auth.slice";
import {
  getStoredAuth,
  removeStoredAuth,
  setStoredAuth,
} from "@redux/auth/auth.storage";

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

    if (storedSession?.token) {
      dispatch(authSessionReceived(normalizeSession(storedSession)));
    }
  };
}

export function loginSucceeded(session) {
  return (dispatch) => {
    const normalizedSession = normalizeSession(session);

    setStoredAuth(normalizedSession);
    dispatch(authSessionReceived(normalizedSession));
  };
}

export function loggedOut() {
  return (dispatch) => {
    removeStoredAuth();
    dispatch(authSessionCleared());
  };
}
