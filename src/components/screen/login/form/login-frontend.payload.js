import _ from "lodash";

const RESPONSE_FIELDS = Object.freeze({
  token: ["token", "access_token", "accessToken"],
  username: ["user.username", "username", "user_name"],
});

export function fromLoginResponse(response = {}) {
  return _.mapValues(RESPONSE_FIELDS, (paths) => {
    const matchingPath = _.find(
      paths,
      (path) => !_.isNil(_.get(response, path)),
    );

    return matchingPath ? _.get(response, matchingPath) : null;
  });
}
