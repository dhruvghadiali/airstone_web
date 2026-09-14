import { LayoutDashboard, Users } from "lucide-react";

import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

export const drawerNavigation = Object.freeze([
  {
    label: "Dashboard",
    route: NAVIGATION_ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Admins",
    route: NAVIGATION_ROUTES.ADMINS,
    icon: Users,
  },
]);
