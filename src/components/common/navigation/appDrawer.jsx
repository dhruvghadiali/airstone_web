import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import DrawerNavigation from "@commonComponent/navigation/drawer/DrawerNavigation";
import { cn } from "@lib/utils";
import { Brand } from "@screenComponent/home/brand";
import { Button } from "@shadcnComponent/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@shadcnComponent/drawer";
import { TooltipProvider } from "@shadcnComponent/tooltip";

export default function AppDrawer() {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(() =>
    typeof window === "undefined"
      ? false
      : !window.matchMedia("(min-width: 1024px)").matches,
  );

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 1024px)");
    const handleBreakpointChange = (event) => setDrawerCollapsed(!event.matches);

    desktopMedia.addEventListener("change", handleBreakpointChange);
    return () => desktopMedia.removeEventListener("change", handleBreakpointChange);
  }, []);

  return (
    <TooltipProvider delayDuration={100}>
      <div className="flex min-h-screen bg-background">
        <aside
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 border-r border-black/10 bg-[#f3f4ee] p-3 transition-[width] duration-300 md:block",
            drawerCollapsed ? "w-18" : "w-60",
          )}
        >
          <Button
            className="absolute -right-3.5 top-5 z-10 size-7 rounded-full bg-background shadow-sm"
            variant="outline"
            size="icon"
            onClick={() => setDrawerCollapsed((current) => !current)}
            aria-label={drawerCollapsed ? "Expand navigation drawer" : "Collapse navigation drawer"}
            aria-expanded={!drawerCollapsed}
          >
            {drawerCollapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
          <DrawerNavigation collapsed={drawerCollapsed} />
        </aside>

        <div className="min-w-0 flex-1">
          <header className="sticky top-0 z-40 flex h-18 items-center justify-between border-b border-black/10 bg-[#f3f4ee]/95 px-[5vw] backdrop-blur-xl md:hidden">
            <Brand />
            <Drawer open={mobileDrawerOpen} onOpenChange={setMobileDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Open navigation drawer">
                  <Menu />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[76svh] bg-[#f3f4ee] px-5 pb-5 sm:px-6 sm:pb-6">
                <DrawerTitle className="sr-only">Workspace navigation</DrawerTitle>
                <DrawerDescription className="sr-only">
                  Navigate the Airstone workspace or log out.
                </DrawerDescription>
                <div className="min-h-0 flex-1 pt-6">
                  <DrawerNavigation onNavigate={() => setMobileDrawerOpen(false)} />
                </div>
              </DrawerContent>
            </Drawer>
          </header>

          <Outlet />
        </div>
      </div>
    </TooltipProvider>
  );
}
