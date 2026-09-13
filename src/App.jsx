import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@page/home";
import Login from "@page/login";
import Dashboard from "@page/dashboard";
import { ThemeProvider } from "@context/ThemeProvider";
import PrivateRoute from "@/routes/private.route";
import PublicRoute from "@/routes/public.route";
import { NAVIGATION_ROUTES } from "@/routes/navigation.routes";

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path={NAVIGATION_ROUTES.HOME} element={<Home />} />
            <Route path={NAVIGATION_ROUTES.LOGIN} element={<Login />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route
              path={NAVIGATION_ROUTES.DASHBOARD}
              element={<Dashboard />}
            />
          </Route>

          <Route
            path={NAVIGATION_ROUTES.NOT_FOUND}
            element={<Navigate to={NAVIGATION_ROUTES.HOME} replace />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
