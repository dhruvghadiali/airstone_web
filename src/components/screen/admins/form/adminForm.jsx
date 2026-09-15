import { useFormik } from "formik";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "@commonComponent/form/formInput";
import { ADMIN_FORM_STATUS } from "@enum/adminFormStatus";
import { createAdmin } from "@redux/admin/admin.action";
import {
  selectAdminFormStatus,
  selectCreateAdminError,
  selectIsCreatingAdmin,
} from "@redux/admin/admin.selector";
import { Button } from "@shadcnComponent/button";
import { toAdminApiPayload } from "@screenComponent/admins/form/admin-api.payload";
import {
  ADMIN_FORM_SUBMIT_LABELS,
  ADMIN_VALIDATION_LIMITS,
} from "@screenComponent/admins/form/adminFormConstants";
import { ADMIN_FORM_FIELDS } from "@screenComponent/admins/form/adminFormFields";
import { adminFormInitialValues } from "@screenComponent/admins/form/adminFormInitialValues";
import { adminValidationSchema } from "@screenComponent/admins/form/adminValidationSchema";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

export default function AdminForm({ initialValues = adminFormInitialValues, onSubmit }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formStatus = useSelector(selectAdminFormStatus);
  const isCreating = useSelector(selectIsCreatingAdmin);
  const createError = useSelector(selectCreateAdminError);
  const effectiveFormStatus =
    formStatus === ADMIN_FORM_STATUS.UPDATE
      ? ADMIN_FORM_STATUS.UPDATE
      : ADMIN_FORM_STATUS.ADD;
  const submitLabel = ADMIN_FORM_SUBMIT_LABELS[effectiveFormStatus];
  const formik = useFormik({
    initialValues,
    validationSchema: adminValidationSchema,
    enableReinitialize: true,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (onSubmit) {
          await onSubmit(toAdminApiPayload(values));
        } else if (effectiveFormStatus === ADMIN_FORM_STATUS.ADD) {
          await dispatch(createAdmin(values)).unwrap();
          navigate(NAVIGATION_ROUTES.ADMINS, { replace: true });
        }
      } catch {
        // The Redux error state contains the display-ready API message.
      } finally {
        setSubmitting(false);
      }
    },
  });
  const submitting = formik.isSubmitting || isCreating;

  const getFieldError = (field) =>
    formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : undefined;

  return (
    <form
      className="mt-8 rounded-2xl border border-black/10 bg-white/35 p-4 shadow-sm sm:p-6 lg:p-8"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormInput
          label="First name"
          id={ADMIN_FORM_FIELDS.firstName}
          name={ADMIN_FORM_FIELDS.firstName}
          type="text"
          autoComplete="given-name"
          placeholder="Enter first name"
          value={formik.values[ADMIN_FORM_FIELDS.firstName]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={submitting}
          error={getFieldError(ADMIN_FORM_FIELDS.firstName)}
        />
        <FormInput
          label="Last name"
          id={ADMIN_FORM_FIELDS.lastName}
          name={ADMIN_FORM_FIELDS.lastName}
          type="text"
          autoComplete="family-name"
          placeholder="Enter last name"
          value={formik.values[ADMIN_FORM_FIELDS.lastName]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={submitting}
          error={getFieldError(ADMIN_FORM_FIELDS.lastName)}
        />
        <FormInput
          label="Email"
          id={ADMIN_FORM_FIELDS.email}
          name={ADMIN_FORM_FIELDS.email}
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={formik.values[ADMIN_FORM_FIELDS.email]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={submitting}
          error={getFieldError(ADMIN_FORM_FIELDS.email)}
        />
        <FormInput
          label="Phone number"
          id={ADMIN_FORM_FIELDS.phoneNumber}
          name={ADMIN_FORM_FIELDS.phoneNumber}
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={ADMIN_VALIDATION_LIMITS.phoneNumber.length}
          placeholder="Enter 10-digit number"
          value={formik.values[ADMIN_FORM_FIELDS.phoneNumber]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={submitting}
          error={getFieldError(ADMIN_FORM_FIELDS.phoneNumber)}
        />
        <FormInput
          label="Username"
          id={ADMIN_FORM_FIELDS.username}
          name={ADMIN_FORM_FIELDS.username}
          type="text"
          autoComplete="username"
          placeholder="Enter username"
          value={formik.values[ADMIN_FORM_FIELDS.username]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={submitting}
          error={getFieldError(ADMIN_FORM_FIELDS.username)}
        />
      </div>

      {createError && (
        <p
          className="mt-6 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          role="alert"
          aria-live="polite"
        >
          {createError}
        </p>
      )}

      <div className="mt-8 flex flex-col-reverse gap-3 border-t border-black/10 pt-6 sm:flex-row sm:justify-end">
        <Button className="h-11 rounded-xl" variant="outline" type="button" asChild>
          <Link to={NAVIGATION_ROUTES.ADMINS}>Cancel</Link>
        </Button>
        <Button className="h-11 rounded-xl" type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <LoaderCircle className="animate-spin" aria-hidden="true" />
              Adding Admin...
            </>
          ) : (
            <>
              {submitLabel}
              <ArrowRight aria-hidden="true" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
