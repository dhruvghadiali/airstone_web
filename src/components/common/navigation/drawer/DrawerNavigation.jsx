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

export default function DrawerNavigation({ collapsed = false, onNavigate }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const username = useSelector(selectAuthUsername);
  const role = useSelector(selectAuthRole);
  const roleLabel = _.find(ROLE_OPTIONS, { value: role })?.label ?? "Team member";

  const handleLogout = () => {
    onNavigate?.();
    dispatch(loggedOut());
    navigate(NAVIGATION_ROUTES.HOME, { replace: true });
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Link
        className={cn(
          "block overflow-hidden transition-[width] duration-300",
          collapsed ? "w-8" : "w-40",
        )}
        to={NAVIGATION_ROUTES.DASHBOARD}
        aria-label="Airstone dashboard"
        onClick={onNavigate}
      >
        <Brand />
      </Link>

      <nav className="mt-10 space-y-2" aria-label="Workspace navigation">
        {_.map(drawerNavigation, ({ label, route, icon: Icon }) => {
          const isActive =
            location.pathname === route ||
            _.startsWith(location.pathname, `${route}/`);
          const navigationLink = (
            <Button
              className={cn(
                "h-12 w-full rounded-xl",
                collapsed ? "justify-center px-0" : "justify-start px-4",
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
      </nav>

      <div className="mt-auto border-t border-black/10 pt-5">
        {!collapsed && (
          <div className="mb-4 min-w-0 px-2">
            <p className="truncate text-sm font-medium">{username ?? "Airstone user"}</p>
            <p className="mt-1 text-xs text-muted-foreground">{roleLabel}</p>
          </div>
        )}
        <CollapsedTooltip collapsed={collapsed} label="Log out">
          <Button
            className={cn(
              "h-12 w-full rounded-xl",
              collapsed ? "justify-center px-0" : "justify-start px-4",
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
