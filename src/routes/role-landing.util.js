import _ from "lodash";

import { ROLES } from "@enum/roles";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

export function getRoleLandingRoute(role) {
  return _.eq(role, ROLES.SUPER_ADMIN)
    ? NAVIGATION_ROUTES.DASHBOARD
    : NAVIGATION_ROUTES.ACCESS_UNAVAILABLE;
}
