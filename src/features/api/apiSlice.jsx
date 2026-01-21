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
    const statusCode =
      result?.error?.status || result?.error?.data?.status_code;

    if (
      statusCode === 401 ||
      response === "Invalid token" ||
      response === "Unauthorized"
    ) {
      console.log("🚫 401 Unauthorized - Clearing auth and redirecting");

      const errorMessage =
        result?.error?.data?.message || "Session expired. Please login again.";
      localStorage.setItem("auth_error_message", errorMessage);

      // Clear all auth state and API cache when token is invalid
      api.dispatch(logout());
      api.dispatch(clearAuthState());
      api.dispatch(apiSlice.util.resetApiState());

      // Redirect to home page after a brief delay
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
    return result;
  },
  endpoints: (builder) => ({}),
});
