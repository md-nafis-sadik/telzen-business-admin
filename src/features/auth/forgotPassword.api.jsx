import { apiSlice } from "../api/apiSlice";

export const forgotPasswordApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendForgotPasswordEmail: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return {
          url: "/admin/forget_password",
          method: "POST",
          body: formData,
        };
      },
    }),
    verifyPasswordResetOtp: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return {
          url: "/admin/verify_password_reset",
          method: "POST",
          body: formData,
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("data", JSON.stringify(data));
        return {
          url: "/admin/reset_password",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useSendForgotPasswordEmailMutation,
  useVerifyPasswordResetOtpMutation,
  useResetPasswordMutation,
} = forgotPasswordApi;
