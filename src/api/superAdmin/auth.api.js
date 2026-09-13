import { createAuthApi } from "@api/factories/auth.factory";
import { ROLE_API_PATHS, ROLES } from "@enum/roles";

export const superAdminAuthApi = createAuthApi(
  ROLE_API_PATHS[ROLES.SUPER_ADMIN],
);
