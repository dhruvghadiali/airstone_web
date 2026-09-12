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

export const ROLE_VALUES = Object.freeze(Object.values(ROLES));
