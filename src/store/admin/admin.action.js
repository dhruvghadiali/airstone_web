import { createAction, createAsyncThunk } from "@reduxjs/toolkit";

import { extractErrorMessage, superAdminCreateAdminApi } from "@api";
import { toAdminApiPayload } from "@screenComponent/admins/form/admin-api.payload";

export const adminFormStatusChanged = createAction("admin/formStatusChanged");

export const createAdmin = createAsyncThunk(
  "admin/create",
  async (values, { rejectWithValue }) => {
    try {
      return await superAdminCreateAdminApi.create(toAdminApiPayload(values));
    } catch (error) {
      return rejectWithValue(extractErrorMessage(error));
    }
  },
);
