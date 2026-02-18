import { apiSlice } from "../api/apiSlice";

const customerSupportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Send Support Message
    sendSupportMessage: builder.mutation({
      query: (data) => ({
        url: "contact-support/create",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (error) {
          console.error(error?.data?.message || "Send support message failed:", error);
        }
      },
    }),
  }),
});

export const { useSendSupportMessageMutation } = customerSupportApi;
