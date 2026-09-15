import { ADMIN_FORM_STATUS } from "@enum/adminFormStatus";

export const ADMIN_VALIDATION_LIMITS = {
  firstName: {
    min: 1,
    max: 100,
  },
  lastName: {
    min: 1,
    max: 100,
  },
  email: {
    min: 5,
    max: 254,
  },
  phoneNumber: {
    length: 10,
    pattern: /^\d{10}$/,
  },
  username: {
    min: 3,
    max: 50,
  },
};

export const ADMIN_FORM_SUBMIT_LABELS = Object.freeze({
  [ADMIN_FORM_STATUS.ADD]: "Add Admin",
  [ADMIN_FORM_STATUS.UPDATE]: "Update Admin",
});
