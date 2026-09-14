import _ from "lodash";

function decodeJwtPayload(token) {
  try {
    const [, payload] = _.split(token, ".");

    if (!payload) {
      return null;
    }

    const normalized = _.replace(_.replace(payload, /-/g, "+"), /_/g, "/");
    const padded = _.padEnd(
      normalized,
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

function isJwtToken(token) {
  return _.size(_.split(token, ".")) === 3;
}

export function getTokenExpiration(token) {
  const expiresAt = _.toNumber(_.get(decodeJwtPayload(token), "exp"));

  if (!_.isFinite(expiresAt) || expiresAt <= 0) {
    return null;
  }

  return new Date(expiresAt * 1000);
}

export function isAuthTokenValid(token) {
  if (!_.isString(token) || !_.trim(token)) {
    return false;
  }

  const normalizedToken = _.trim(token);

  if (isJwtToken(normalizedToken) && !decodeJwtPayload(normalizedToken)) {
    return false;
  }

  const expiresAt = getTokenExpiration(normalizedToken);

  return !expiresAt || _.now() < expiresAt.getTime();
}
