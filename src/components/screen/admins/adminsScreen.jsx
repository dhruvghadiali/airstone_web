import { Plus } from "lucide-react";

import ScreenHeader from "@commonComponent/screen/screenHeader";
import { Button } from "@shadcnComponent/button";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

const ADMIN_BREADCRUMBS = Object.freeze([
  {
    label: "Admins",
    route: NAVIGATION_ROUTES.ADMINS,
  },
]);

export default function AdminsScreen() {
  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-10 lg:py-12 xl:px-12">
      <ScreenHeader
        breadcrumbs={ADMIN_BREADCRUMBS}
        title="All Admins"
        subtitle="View and manage administrator accounts in one place."
        action={
          <Button className="h-10 rounded-full px-3 shadow-sm sm:h-11 sm:px-5" size="lg" type="button">
            <Plus className="hidden sm:block" aria-hidden="true" />
            Add Admin
          </Button>
        }
      />
    </main>
  );
}
