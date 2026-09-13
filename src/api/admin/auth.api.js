import { createAuthApi } from "@api/factories/auth.factory";
import { ROLE_API_PATHS, ROLES } from "@enum/roles";

export const adminAuthApi = createAuthApi(ROLE_API_PATHS[ROLES.ADMIN]);
