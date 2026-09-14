import _ from "lodash";

export const ROLES = Object.freeze({
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  EMPLOYEE: "employee",
});

export const ROLE_OPTIONS = Object.freeze([
  { label: "Super Admin", value: ROLES.SUPER_ADMIN },
  { label: "Admin", value: ROLES.ADMIN },
  { label: "Employee", value: ROLES.EMPLOYEE },
]);

export const ROLE_VALUES = Object.freeze(_.values(ROLES));

export const ROLE_API_PATHS = Object.freeze({
  [ROLES.SUPER_ADMIN]: "super-admin",
  [ROLES.ADMIN]: "admin",
  [ROLES.EMPLOYEE]: "employee",
});
