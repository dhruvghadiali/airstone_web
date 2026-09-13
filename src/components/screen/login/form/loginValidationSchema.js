import * as Yup from "yup";
import { ROLE_VALUES } from "@enum/roles";
import { LOGIN_VALIDATION_LIMITS } from "@screenComponent/login/form/loginFormConstants";
import { LOGIN_FORM_FIELDS } from "@screenComponent/login/form/loginFormFields";
import { LOGIN_VALIDATION_MESSAGES } from "@screenComponent/login/form/loginFormMessages";

export const loginValidationSchema = Yup.object({
  [LOGIN_FORM_FIELDS.role]: Yup.string()
    .oneOf(ROLE_VALUES, LOGIN_VALIDATION_MESSAGES.role.invalid)
    .required(LOGIN_VALIDATION_MESSAGES.role.required),
  [LOGIN_FORM_FIELDS.username]: Yup.string()
    .min(
      LOGIN_VALIDATION_LIMITS.username.min,
      LOGIN_VALIDATION_MESSAGES.username.min,
    )
    .max(
      LOGIN_VALIDATION_LIMITS.username.max,
      LOGIN_VALIDATION_MESSAGES.username.max,
    )
    .required(LOGIN_VALIDATION_MESSAGES.username.required),
  [LOGIN_FORM_FIELDS.password]: Yup.string()
    .min(
      LOGIN_VALIDATION_LIMITS.password.min,
      LOGIN_VALIDATION_MESSAGES.password.min,
    )
    .max(
      LOGIN_VALIDATION_LIMITS.password.max,
      LOGIN_VALIDATION_MESSAGES.password.max,
    )
    .required(LOGIN_VALIDATION_MESSAGES.password.required),
});
