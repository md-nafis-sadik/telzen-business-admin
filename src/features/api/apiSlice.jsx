import { envConfig } from "@/services";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, clearAuthState } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: envConfig.baseUrl,
  prepareHeaders: async (headers, { getState, endpoint }) => {
    const token = getState()?.auth?.auth?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    headers.set("Accept", "application/json");
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const response = result?.error?.data?.error;
    if (response === "Invalid token" || response === "Unauthorized") {
      // Clear all auth state and API cache when token is invalid
      api.dispatch(logout());
      api.dispatch(clearAuthState());
      api.dispatch(apiSlice.util.resetApiState());
    }
    return result;
  },
  endpoints: (builder) => ({}),
});
