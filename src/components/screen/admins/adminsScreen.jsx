import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import ScreenHeader from "@commonComponent/screen/screenHeader";
import { ADMIN_FORM_STATUS } from "@enum/adminFormStatus";
import { adminFormStatusChanged } from "@redux/admin/admin.action";
import { selectAdminListBreadcrumbs } from "@redux/admin/admin.selector";
import { Button } from "@shadcnComponent/button";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

export default function AdminsScreen() {
  const dispatch = useDispatch();
  const breadcrumbs = useSelector(selectAdminListBreadcrumbs);

  const handleAddAdmin = () => {
    dispatch(adminFormStatusChanged(ADMIN_FORM_STATUS.ADD));
  };

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-10 lg:py-12 xl:px-12">
      <ScreenHeader
        breadcrumbs={breadcrumbs}
        title="All Admins"
        subtitle="View and manage administrator accounts in one place."
        action={
          <Button className="h-10 rounded-full px-3 shadow-sm sm:h-11 sm:px-5" size="lg" asChild>
            <Link to={NAVIGATION_ROUTES.ADMINS_FORM} onClick={handleAddAdmin}>
              <Plus className="hidden sm:block" aria-hidden="true" />
              Add Admin
            </Link>
          </Button>
        }
      />
    </main>
  );
}
