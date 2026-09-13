import find from "lodash/find.js";
import get from "lodash/get.js";
import isNil from "lodash/isNil.js";
import mapValues from "lodash/mapValues.js";

const RESPONSE_FIELDS = Object.freeze({
  token: ["token", "access_token", "accessToken"],
  username: ["user.username", "username", "user_name"],
});

export function fromLoginResponse(response = {}) {
  return mapValues(RESPONSE_FIELDS, (paths) => {
    const matchingPath = find(paths, (path) => !isNil(get(response, path)));

    return matchingPath ? get(response, matchingPath) : null;
  });
}
