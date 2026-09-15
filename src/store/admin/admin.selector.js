import { ADMIN_FORM_STATUS } from "@enum/adminFormStatus";

export const selectAdmin = (state) => state.admin;

export const selectAdminFormStatus = (state) =>
  selectAdmin(state).formStatus;

export const selectIsCreatingAdmin = (state) =>
  selectAdmin(state).isCreating;

export const selectCreateAdminError = (state) =>
  selectAdmin(state).createError;

export const selectAdminListBreadcrumbs = (state) =>
  selectAdmin(state).breadcrumbs.list;

export const selectAdminFormBreadcrumbs = (state) => {
  const admin = selectAdmin(state);

  return (
    admin.breadcrumbs.form[admin.formStatus] ??
    admin.breadcrumbs.form[ADMIN_FORM_STATUS.ADD]
  );
};
