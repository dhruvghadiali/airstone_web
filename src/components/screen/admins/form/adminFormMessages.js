import { ADMIN_VALIDATION_LIMITS } from "@screenComponent/admins/form/adminFormConstants";

export const ADMIN_VALIDATION_MESSAGES = {
  firstName: {
    required: "First name is required",
    min: `First name must be at least ${ADMIN_VALIDATION_LIMITS.firstName.min} character`,
    max: `First name must be ${ADMIN_VALIDATION_LIMITS.firstName.max} characters or less`,
  },
  lastName: {
    required: "Last name is required",
    min: `Last name must be at least ${ADMIN_VALIDATION_LIMITS.lastName.min} character`,
    max: `Last name must be ${ADMIN_VALIDATION_LIMITS.lastName.max} characters or less`,
  },
  email: {
    required: "Email is required",
    invalid: "Enter a valid email address",
    min: `Email must be at least ${ADMIN_VALIDATION_LIMITS.email.min} characters`,
    max: `Email must be ${ADMIN_VALIDATION_LIMITS.email.max} characters or less`,
  },
  phoneNumber: {
    required: "Phone number is required",
    invalid: `Phone number must contain exactly ${ADMIN_VALIDATION_LIMITS.phoneNumber.length} digits`,
  },
  username: {
    required: "Username is required",
    min: `Username must be at least ${ADMIN_VALIDATION_LIMITS.username.min} characters`,
    max: `Username must be ${ADMIN_VALIDATION_LIMITS.username.max} characters or less`,
  },
};
