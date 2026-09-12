import { LOGIN_VALIDATION_LIMITS } from "@screenComponent/login/form/loginFormConstants";

export const LOGIN_VALIDATION_MESSAGES = {
  role: {
    required: "Please select a role",
    invalid: "Please select a valid role",
  },
  username: {
    required: "Username is required",
    min: `Username must be at least ${LOGIN_VALIDATION_LIMITS.username.min} characters`,
    max: `Username must be ${LOGIN_VALIDATION_LIMITS.username.max} characters or less`,
  },
  password: {
    required: "Password is required",
    min: `Password must be at least ${LOGIN_VALIDATION_LIMITS.password.min} characters`,
    max: `Password must be ${LOGIN_VALIDATION_LIMITS.password.max} characters or less`,
  },
};
