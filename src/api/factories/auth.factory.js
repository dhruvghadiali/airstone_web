import _ from "lodash";

import { apiClient } from "@api/client.api";
import { ENDPOINTS } from "@api/endpoints.constants";

export function createAuthApi(rolePath) {
  return {
    async signIn(payload) {
      const { data } = await apiClient.post(
        `/${rolePath}/${ENDPOINTS.AUTH.SIGN_IN}`,
        payload,
      );

      return _.isArray(data) ? (data[0] ?? {}) : (data ?? {});
    },
  };
}
