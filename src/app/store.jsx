import authSlice from "@/features/auth/authSlice";
import forgotPasswordSlice from "@/features/auth/forgotPasswordSlice";
import dashboardSlice from "@/features/dashboard/dashboardSlice";
import { locationApiSlice } from "@/features/location/locationApi";
import locationSlice from "@/features/location/locationSlice";
import sharedSlice from "@/features/shared/sharedSlice";
import staffDetailsSlice from "@/features/staffs/staffDetailsSlice";
import staffSlice from "@/features/staffs/staffSlice";
import myEsimSlice from "@/features/myEsim/myEsimSlice";
import usersSlice from "@/features/users/usersSlice";
import accountBalanceSlice from "@/features/accountBalance/accountBalanceSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { inventoryApi } from "@/features/inventory/inventoryApi";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [locationApiSlice.reducerPath]: locationApiSlice.reducer,
    [inventoryApi.reducerPath]: inventoryApi.reducer,
    auth: authSlice,
    forgotPassword: forgotPasswordSlice,
    shared: sharedSlice,
    staffs: staffSlice,
    myEsim: myEsimSlice,
    users: usersSlice,
    accountBalance: accountBalanceSlice,
    staffDetails: staffDetailsSlice,
    dashboard: dashboardSlice,
    location: locationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
        ignoredActionPaths: [
          "meta.baseQueryMeta.request",
          "meta.arg.originalArgs.data",
          "meta.baseQueryMeta.response",
          "payload",
          "meta.arg.originalArgs",
        ],
        ignoredPaths: [
          "destinations.selectedImage",
          "institutions.selectedLogoImage",
          "institutions.selectedCoverImage",
        ],
      },
    }).concat(apiSlice.middleware, locationApiSlice.middleware, inventoryApi.middleware),
});
