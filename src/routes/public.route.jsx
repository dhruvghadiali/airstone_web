import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { loggedOut } from "@redux/auth/auth.action";
import { selectAuthRole, selectAuthToken } from "@redux/auth/auth.selector";
import { isAuthTokenValid } from "@routes/auth-token.util";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";
import { getRoleLandingRoute } from "@routes/role-landing.util";

export default function PublicRoute() {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const role = useSelector(selectAuthRole);
  const isValid = isAuthTokenValid(token);

  useEffect(() => {
    if (token && !isValid) {
      dispatch(loggedOut());
    }
  }, [dispatch, isValid, token]);

  if (isValid) {
    return <Navigate to={getRoleLandingRoute(role)} replace />;
  }

  return <Outlet />;
}
