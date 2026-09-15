import { useSelector } from "react-redux";

import ScreenHeader from "@commonComponent/screen/screenHeader";
import { selectAdminFormBreadcrumbs } from "@redux/admin/admin.selector";
import AdminForm from "@screenComponent/admins/form/adminForm";

export default function AdminFormScreen() {
  const breadcrumbs = useSelector(selectAdminFormBreadcrumbs);

  return (
    <main className="mx-auto w-full max-w-[1600px] px-4 py-6 text-foreground sm:px-6 sm:py-8 lg:px-10 lg:py-12 xl:px-12">
      <ScreenHeader
        breadcrumbs={breadcrumbs}
        title="Admin Information"
        subtitle="Add or update administrator information and account access."
      />
      <AdminForm />
    </main>
  );
}
