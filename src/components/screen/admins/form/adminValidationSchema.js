import * as Yup from "yup";

import { ADMIN_VALIDATION_LIMITS } from "@screenComponent/admins/form/adminFormConstants";
import { ADMIN_FORM_FIELDS } from "@screenComponent/admins/form/adminFormFields";
import { ADMIN_VALIDATION_MESSAGES } from "@screenComponent/admins/form/adminFormMessages";

export const adminValidationSchema = Yup.object({
  [ADMIN_FORM_FIELDS.firstName]: Yup.string()
    .trim()
    .required(ADMIN_VALIDATION_MESSAGES.firstName.required)
    .min(
      ADMIN_VALIDATION_LIMITS.firstName.min,
      ADMIN_VALIDATION_MESSAGES.firstName.min,
    )
    .max(
      ADMIN_VALIDATION_LIMITS.firstName.max,
      ADMIN_VALIDATION_MESSAGES.firstName.max,
    ),
  [ADMIN_FORM_FIELDS.lastName]: Yup.string()
    .trim()
    .required(ADMIN_VALIDATION_MESSAGES.lastName.required)
    .min(
      ADMIN_VALIDATION_LIMITS.lastName.min,
      ADMIN_VALIDATION_MESSAGES.lastName.min,
    )
    .max(
      ADMIN_VALIDATION_LIMITS.lastName.max,
      ADMIN_VALIDATION_MESSAGES.lastName.max,
    ),
  [ADMIN_FORM_FIELDS.email]: Yup.string()
    .trim()
    .required(ADMIN_VALIDATION_MESSAGES.email.required)
    .email(ADMIN_VALIDATION_MESSAGES.email.invalid)
    .min(
      ADMIN_VALIDATION_LIMITS.email.min,
      ADMIN_VALIDATION_MESSAGES.email.min,
    )
    .max(
      ADMIN_VALIDATION_LIMITS.email.max,
      ADMIN_VALIDATION_MESSAGES.email.max,
    ),
  [ADMIN_FORM_FIELDS.phoneNumber]: Yup.string()
    .trim()
    .matches(ADMIN_VALIDATION_LIMITS.phoneNumber.pattern, {
      message: ADMIN_VALIDATION_MESSAGES.phoneNumber.invalid,
      excludeEmptyString: true,
    })
    .required(ADMIN_VALIDATION_MESSAGES.phoneNumber.required),
  [ADMIN_FORM_FIELDS.username]: Yup.string()
    .trim()
    .min(
      ADMIN_VALIDATION_LIMITS.username.min,
      ADMIN_VALIDATION_MESSAGES.username.min,
    )
    .max(
      ADMIN_VALIDATION_LIMITS.username.max,
      ADMIN_VALIDATION_MESSAGES.username.max,
    )
    .required(ADMIN_VALIDATION_MESSAGES.username.required),
});
