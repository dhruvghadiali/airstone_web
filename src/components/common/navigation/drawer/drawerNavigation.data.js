import { LayoutDashboard, Users } from "lucide-react";

import { NAVIGATION_ROUTES } from "@routes/navigation.routes";
import { ROUTE_ACCESS } from "@routes/route-access.constants";

export const drawerNavigation = Object.freeze([
  {
    label: "Dashboard",
    route: NAVIGATION_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    allowedRoles: ROUTE_ACCESS.DASHBOARD,
  },
  {
    label: "Admins",
    route: NAVIGATION_ROUTES.ADMINS,
    icon: Users,
    allowedRoles: ROUTE_ACCESS.ADMINS,
  },
]);
