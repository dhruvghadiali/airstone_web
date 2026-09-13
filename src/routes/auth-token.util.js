function decodeJwtPayload(token) {
  try {
    const [, payload] = token.split(".");

    if (!payload) {
      return null;
    }

    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export function getTokenExpiration(token) {
  const expiresAt = Number(decodeJwtPayload(token)?.exp);

  if (!Number.isFinite(expiresAt) || expiresAt <= 0) {
    return null;
  }

  return new Date(expiresAt * 1000);
}

export function isAuthTokenValid(token) {
  if (!token) {
    return false;
  }

  const expiresAt = getTokenExpiration(token);

  return !expiresAt || Date.now() < expiresAt.getTime();
}
