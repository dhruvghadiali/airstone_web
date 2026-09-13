import get from "lodash/get.js";
import mapValues from "lodash/mapValues.js";
import trim from "lodash/trim.js";

const LOGIN_API_FIELDS = Object.freeze({
  username: "username",
  password: "password",
});

export function toLoginApiPayload(values = {}) {
  return mapValues(LOGIN_API_FIELDS, (formField, apiField) => {
    const value = get(values, formField, "");

    return apiField === "username" ? trim(value) : value;
  });
}
