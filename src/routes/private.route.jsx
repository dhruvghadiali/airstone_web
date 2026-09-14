import { useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

import { loggedOut } from "@redux/auth/auth.action";
import { selectAuthToken } from "@redux/auth/auth.selector";
import {
  getTokenExpiration,
  isAuthTokenValid,
} from "@/routes/auth-token.util";
import { NAVIGATION_ROUTES } from "@/routes/navigation.routes";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const isValid = isAuthTokenValid(token);

  useEffect(() => {
    if (token && !isValid) {
      dispatch(loggedOut());
    }
  }, [dispatch, isValid, token]);

  useEffect(() => {
    const expiresAt = getTokenExpiration(token);

    if (!expiresAt) {
      return undefined;
    }

    const remainingTime = expiresAt.getTime() - _.now();
    const timeoutId = window.setTimeout(
      () => dispatch(loggedOut()),
      _.clamp(remainingTime, 0, 2_147_483_647),
    );

    return () => window.clearTimeout(timeoutId);
  }, [dispatch, token]);

  if (!isValid) {
    return (
      <Navigate
        to={NAVIGATION_ROUTES.HOME}
        replace
      />
    );
  }

  return <Outlet />;
}
