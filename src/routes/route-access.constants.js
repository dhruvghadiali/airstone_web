import { ROLES } from "@enum/roles";

const SUPER_ADMIN_ACCESS = Object.freeze([ROLES.SUPER_ADMIN]);

export const ROUTE_ACCESS = Object.freeze({
  DASHBOARD: SUPER_ADMIN_ACCESS,
  ADMINS: SUPER_ADMIN_ACCESS,
});
