import { apiSlice } from "../api/apiSlice";
import { toast } from "react-toastify";

export const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all customers
    getCustomers: builder.query({
      query: () => `/customer?page=&limit=`,
      providesTags: ["Customer"],
    }),

    // Get all groups
    getGroups: builder.query({
      query: () => `/customer/group`,
      providesTags: ["CustomerGroup"],
    }),

    // Create customer
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `/customer/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customer", "CustomerGroup"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        //   if (data.success) {
        //     toast.success(data.message || "Customer created successfully!");
        //   } else {
        //     toast.error(data.message || "Failed to create customer");
        //   }
        } catch (error) {
          const errorMsg =
            error?.error?.data?.message || "Failed to create customer";
          console.error(errorMsg);
        }
      },
    }),

    // Checkout verify payment
    checkoutVerifyPayment: builder.mutation({
      query: ({ paymentId }) => ({
        url: `/checkout/verify-payment?payment_id=${paymentId}`,
        method: "POST",
      }),
      invalidatesTags: ["Esim"],
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        //   if (data.success) {
        //     toast.success(
        //       data.message || "Payment verified! Your eSIM is being activated."
        //     );
        //   } else {
        //     toast.error(data.message || "Failed to verify payment");
        //   }
        } catch (error) {
          const errorMsg =
            error?.error?.data?.message || "Failed to verify payment";
          console.error(errorMsg);
        }
      },
    }),

    // Create checkout payment
    createCheckoutPayment: builder.mutation({
      query: (data) => ({
        url: `/checkout/create-payment?order_type=new`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        //   if (!data.success) {
        //     toast.error(data.message || "Failed to create payment");
        //   }
        } catch (error) {
          const errorMsg =
            error?.error?.data?.message || "Failed to create payment";
          console.error(errorMsg);
        }
      },
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetGroupsQuery,
  useCreateCustomerMutation,
  useCheckoutVerifyPaymentMutation,
  useCreateCheckoutPaymentMutation,
} = customerApi;
