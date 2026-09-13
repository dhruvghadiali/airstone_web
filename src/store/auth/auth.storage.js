const AUTH_STORAGE_KEY = "auth";
export const AUTH_SESSION_INVALID_EVENT = "airstone:auth-session-invalid";

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "null");
  } catch {
    removeStoredAuth();
    return null;
  }
}

export function notifyInvalidAuthSession() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(AUTH_SESSION_INVALID_EVENT));
  }
}

export function setStoredAuth(session) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  } catch {
    // The Redux session remains available when browser storage is unavailable.
  }
}

export function removeStoredAuth() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    // There is nothing else to clear when browser storage is unavailable.
  }
}
