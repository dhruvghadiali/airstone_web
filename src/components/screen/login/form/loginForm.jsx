import { useFormik } from "formik";
import { ArrowRight, LockKeyhole } from "lucide-react";
import FormDropdown from "@commonComponent/form/formDropdown";
import FormInput from "@commonComponent/form/formInput";
import { ROLE_OPTIONS } from "@/enum/roles";
import { Button } from "@shadcnComponent/button";
import { loginFormInitialValues } from "@screenComponent/login/form/loginFormInitialValues";
import { loginValidationSchema } from "@screenComponent/login/form/loginValidationSchema";

export default function LoginForm() {
  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: loginValidationSchema,
    onSubmit: () => {},
  });

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
            error={roleHasError ? formik.errors.role : undefined}
          />
          <Button className="h-12 w-full rounded-xl" type="submit">
            Log in <ArrowRight />
          </Button>
        </form>
      </div>
    </div>
  );
}
