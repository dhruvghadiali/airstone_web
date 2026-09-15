import { useFormik } from "formik";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormDropdown from "@commonComponent/form/formDropdown";
import FormInput from "@commonComponent/form/formInput";
import { ROLE_OPTIONS } from "@enum/roles";
import { Button } from "@shadcnComponent/button";
import { loginFormInitialValues } from "@screenComponent/login/form/loginFormInitialValues";
import { loginValidationSchema } from "@screenComponent/login/form/loginValidationSchema";
import { signIn } from "@redux/auth/auth.action";
import {
  selectIsSigningIn,
  selectSignInError,
} from "@redux/auth/auth.selector";
import { getRoleLandingRoute } from "@routes/role-landing.util";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSigningIn = useSelector(selectIsSigningIn);
  const signInError = useSelector(selectSignInError);
  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(signIn(values)).unwrap();

        navigate(getRoleLandingRoute(values.role), { replace: true });
      } catch {
        // The Redux error state contains the display-ready API message.
      } finally {
        setSubmitting(false);
      }
    },
  });

  const submitting = formik.isSubmitting || isSigningIn;

  const roleHasError = formik.touched.role && formik.errors.role;
  const usernameHasError = formik.touched.username && formik.errors.username;
  const passwordHasError = formik.touched.password && formik.errors.password;

  return (
    <div className="flex items-center justify-center py-12 lg:py-20">
      <div className="w-full max-w-md lg:ml-[8vw]">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.16em] text-muted">
          Account access
        </p>
        <h2 className="text-4xl font-medium tracking-tighter sm:text-5xl">
          Log in
        </h2>
        <p className="mt-2 text-base leading-relaxed text-[#646b5f]">
          Enter your details to continue to your Airstone account.
        </p>

        <form className="mt-5 space-y-5" onSubmit={formik.handleSubmit} noValidate>
          <FormInput
            label="Username"
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Enter your username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={submitting}
            error={usernameHasError ? formik.errors.username : undefined}
          />
          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={submitting}
            error={passwordHasError ? formik.errors.password : undefined}
          />
          <FormDropdown
            label="Which role do you want to log in as?"
            id="role"
            name="role"
            options={ROLE_OPTIONS}
            placeholder="Select a role"
            value={formik.values.role}
            onValueChange={(value) => formik.setFieldValue("role", value)}
            onBlur={() => formik.setFieldTouched("role", true)}
            disabled={submitting}
            error={roleHasError ? formik.errors.role : undefined}
          />
          {signInError && (
            <p
              className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
              role="alert"
              aria-live="polite"
            >
              {signInError}
            </p>
          )}
          <Button
            className="h-12 w-full rounded-xl"
            type="submit"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <LoaderCircle className="animate-spin" /> Signing in...
              </>
            ) : (
              <>
                Log in <ArrowRight />
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
