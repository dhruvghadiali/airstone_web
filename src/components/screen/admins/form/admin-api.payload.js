import _ from "lodash";

import { ADMIN_FORM_FIELDS } from "@screenComponent/admins/form/adminFormFields";

const ADMIN_API_FIELDS = Object.freeze({
  first_name: ADMIN_FORM_FIELDS.firstName,
  last_name: ADMIN_FORM_FIELDS.lastName,
  email: ADMIN_FORM_FIELDS.email,
  phone_number: ADMIN_FORM_FIELDS.phoneNumber,
  username: ADMIN_FORM_FIELDS.username,
});

export function toAdminApiPayload(values = {}) {
  return _.mapValues(ADMIN_API_FIELDS, (formField) =>
    _.trim(_.toString(_.get(values, formField, ""))),
  );
}
