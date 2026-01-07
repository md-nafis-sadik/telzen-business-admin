import authSlice from "@/features/auth/authSlice";
import forgotPasswordSlice from "@/features/auth/forgotPasswordSlice";
import brickFieldSlice from "@/features/brickField/brickFieldSlice";
import brickListSlice from "@/features/brickList/brickListSlice";
import brickStockSlice from "@/features/brickStock/brickStockSlice";
import customerDetailsSlice from "@/features/customers/customerDetailsSlice";
import customersSlice from "@/features/customers/customerSlice";
import dashboardSlice from "@/features/dashboard/dashboardSlice";
import { locationApiSlice } from "@/features/location/locationApi";
import locationSlice from "@/features/location/locationSlice";
import ordersSlice from "@/features/orders/ordersSlice";
import sharedSlice from "@/features/shared/sharedSlice";
import staffDetailsSlice from "@/features/staffs/staffDetailsSlice";
import staffSlice from "@/features/staffs/staffSlice";
import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [locationApiSlice.reducerPath]: locationApiSlice.reducer,
    auth: authSlice,
    forgotPassword: forgotPasswordSlice,
    shared: sharedSlice,
    staffs: staffSlice,
    staffDetails: staffDetailsSlice,
    customers: customersSlice,
    customerDetails: customerDetailsSlice,
    brickList: brickListSlice,
    brickField: brickFieldSlice,
    brickStock: brickStockSlice,
    orders: ordersSlice,
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
    }).concat(apiSlice.middleware, locationApiSlice.middleware),
});
