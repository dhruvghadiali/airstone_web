import { createSlice } from "@reduxjs/toolkit";

import {
  adminFormStatusChanged,
  createAdmin,
} from "@redux/admin/admin.action";
import { ADMIN_FORM_STATUS } from "@enum/adminFormStatus";
import { NAVIGATION_ROUTES } from "@routes/navigation.routes";

const initialState = {
  formStatus: null,
  isCreating: false,
  createError: null,
  breadcrumbs: {
    list: [
      {
        label: "Admins",
        route: NAVIGATION_ROUTES.ADMINS,
      },
    ],
    form: {
      [ADMIN_FORM_STATUS.ADD]: [
        {
          label: "Admin",
          route: NAVIGATION_ROUTES.ADMINS,
        },
        {
          label: "Add",
        },
      ],
      [ADMIN_FORM_STATUS.UPDATE]: [
        {
          label: "Admin",
          route: NAVIGATION_ROUTES.ADMINS,
        },
        {
          label: "Update",
        },
      ],
    },
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminFormStatusChanged, (state, action) => {
        state.formStatus = action.payload;
        state.createError = null;
      })
      .addCase(createAdmin.pending, (state) => {
        state.isCreating = true;
        state.createError = null;
      })
      .addCase(createAdmin.fulfilled, (state) => {
        state.isCreating = false;
        state.createError = null;
      })
      .addCase(createAdmin.rejected, (state, action) => {
        state.isCreating = false;
        state.createError =
          action.payload ?? "Unable to create the administrator.";
      });
  },
});

export default adminSlice.reducer;
