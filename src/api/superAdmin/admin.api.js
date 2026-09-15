import { apiClient } from "@api/client.api";
import { ENDPOINTS } from "@api/endpoints.constants";
import { ROLE_API_PATHS, ROLES } from "@enum/roles";

const SUPER_ADMIN_PATH = ROLE_API_PATHS[ROLES.SUPER_ADMIN];

export const superAdminCreateAdminApi = {
  async create(payload) {
    const { data } = await apiClient.post(
      `/${SUPER_ADMIN_PATH}/${ENDPOINTS.ADMIN.SIGN_UP}`,
      payload,
    );

    return data;
  },
};
