import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "@page/home";
import Login from "@page/login";
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
            {/* Add authenticated pages inside this route group. */}
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
