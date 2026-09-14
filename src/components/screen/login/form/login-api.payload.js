import _ from "lodash";

const LOGIN_API_FIELDS = Object.freeze({
  username: "username",
  password: "password",
});

export function toLoginApiPayload(values = {}) {
  return _.mapValues(LOGIN_API_FIELDS, (formField, apiField) => {
    const value = _.get(values, formField, "");

    return apiField === "username" ? _.trim(value) : value;
  });
}
