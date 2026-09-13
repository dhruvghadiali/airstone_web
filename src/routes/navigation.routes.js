export const NAVIGATION_ROUTES = Object.freeze({
  HOME: "/",
  LOGIN: "/login",
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
