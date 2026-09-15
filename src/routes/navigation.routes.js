export const NAVIGATION_ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  ADMINS: "/admins",
  ADMINS_FORM: "/admins/form",
  NOT_FOUND: "*",
  SECTIONS: Object.freeze({
    HOME: "#home",
    MATERIALS: "#materials",
    APPROACH: "#approach",
    APPLICATIONS: "#applications",
  }),
});

export function createSectionRoute(sectionId) {
  return `#${sectionId}`;
}
