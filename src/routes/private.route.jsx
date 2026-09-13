import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { loggedOut } from "@redux/auth/auth.action";
import { selectAuthToken } from "@redux/auth/auth.selector";
import { isAuthTokenValid } from "@/routes/auth-token.util";
import { NAVIGATION_ROUTES } from "@/routes/navigation.routes";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector(selectAuthToken);
  const isValid = isAuthTokenValid(token);

  useEffect(() => {
    if (token && !isValid) {
      dispatch(loggedOut());
    }
  }, [dispatch, isValid, token]);

  if (!isValid) {
    return (
      <Navigate
        to={NAVIGATION_ROUTES.LOGIN}
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
