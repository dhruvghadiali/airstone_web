const AUTH_STORAGE_KEY = "auth";

export function getStoredAuth() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    return JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? "null");
  } catch {
    return null;
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
