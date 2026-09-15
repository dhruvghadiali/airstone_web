import _ from "lodash";
import { LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import CollapsedTooltip from "@commonComponent/navigation/drawer/collapsedTooltip";
import { drawerNavigation } from "@commonComponent/navigation/drawer/drawerNavigation.data";
import { cn } from "@lib/utils";
import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";
import { ROLE_OPTIONS } from "@enum/roles";
import { loggedOut } from "@redux/auth/auth.action";
import { selectAuthRole, selectAuthUsername } from "@redux/auth/auth.selector";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";
import { getRoleLandingRoute } from "@routes/role-landing.util";

export default function DrawerNavigation({ collapsed = false, onNavigate }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const username = useSelector(selectAuthUsername);
  const role = useSelector(selectAuthRole);
  const roleLabel = _.find(ROLE_OPTIONS, { value: role })?.label ?? "Team member";
  const permittedNavigation = _.filter(drawerNavigation, ({ allowedRoles }) =>
    _.includes(allowedRoles, role),
  );

  const handleLogout = () => {
    onNavigate?.();
    dispatch(loggedOut());
    navigate(NAVIGATION_ROUTES.HOME, { replace: true });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-14 shrink-0 items-center border-b border-black/8 pb-3">
        <Link
          className={cn(
            "block overflow-hidden transition-[width] duration-300",
            collapsed ? "w-8" : "w-40",
          )}
          to={getRoleLandingRoute(role)}
          aria-label="Airstone workspace"
          onClick={onNavigate}
        >
          <Brand />
        </Link>
      </div>

      {!_.isEmpty(permittedNavigation) && (
        <nav className="mt-5" aria-label="Workspace navigation">
          {!collapsed && (
            <p className="mb-2 px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Workspace
            </p>
          )}
          <div className="grid gap-1">
            {_.map(permittedNavigation, ({ label, route, icon: Icon }) => {
              const isActive =
                location.pathname === route ||
                _.startsWith(location.pathname, `${route}/`);
              const navigationLink = (
                <Button
                  className={cn(
                    "h-10 w-full rounded-lg text-sm transition-colors",
                    collapsed ? "justify-center px-0" : "justify-start px-3",
                  )}
                  variant={isActive ? "secondary" : "ghost"}
                  asChild
                  key={route}
                >
                  <Link
                    to={route}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    aria-label={collapsed ? label : undefined}
                  >
                    <Icon className="size-5 shrink-0" />
                    <span className={cn("truncate", collapsed && "sr-only")}>{label}</span>
                  </Link>
                </Button>
              );

              return (
                <CollapsedTooltip collapsed={collapsed} label={label} key={route}>
                  {navigationLink}
                </CollapsedTooltip>
              );
            })}
          </div>
        </nav>
      )}

      <div className="mt-auto border-t border-black/8 pt-4">
        {!collapsed && (
          <div className="mb-3 min-w-0 px-2">
            <p className="truncate text-sm font-medium">{username ?? "Airstone user"}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        )}
        <CollapsedTooltip collapsed={collapsed} label="Log out">
          <Button
            className={cn(
              "h-10 w-full rounded-lg text-sm",
              collapsed ? "justify-center px-0" : "justify-start px-3",
            )}
            variant="outline"
            onClick={handleLogout}
            aria-label={collapsed ? "Log out" : undefined}
          >
            <LogOut className="size-5 shrink-0" />
            <span className={cn(collapsed && "sr-only")}>Log out</span>
          </Button>
        </CollapsedTooltip>
      </div>
    </div>
  );
}
