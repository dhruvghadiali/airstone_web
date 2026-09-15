import _ from "lodash";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { selectAuthRole } from "@redux/auth/auth.selector";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

export default function RoleRoute({ allowedRoles }) {
  const role = useSelector(selectAuthRole);

  if (!_.includes(allowedRoles, role)) {
    return <Navigate to={NAVIGATION_ROUTES.ACCESS_UNAVAILABLE} replace />;
  }

  return <Outlet />;
}
