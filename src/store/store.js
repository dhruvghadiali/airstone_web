import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "@redux/admin/admin.slice";
import authReducer from "@redux/auth/auth.slice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
  },
});
