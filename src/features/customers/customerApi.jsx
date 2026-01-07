import { apiSlice } from "../api/apiSlice";
import {
  setCustomerDetails,
  setCustomerOrderData,
} from "./customerDetailsSlice";
import {
  blockCustomer as blockCustomerAction,
  unblockCustomer as unblockCustomerAction,
  setActiveCustomers,
  setBlockedCustomers,
  setPendingCustomers,
  setRejectedCustomers,
  setSingleCustomer,
} from "./customerSlice";

const customerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveCustomers: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/customers/active?page=${current_page}&per_page=${per_page}`;

        if (filter) {
          if (filter.division && filter.division.toLowerCase() !== "all") {
            url += `&division=${filter.division.toLowerCase()}`;
          }
          if (filter.district && filter.district.toLowerCase() !== "all") {
            url += `&district=${filter.district.toLowerCase()}`;
          }
          if (filter.upazila && filter.upazila.toLowerCase() !== "all") {
            url += `&sub_district=${filter.upazila.toLowerCase()}`;
          }
        }

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setActiveCustomers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        } catch (error) {
          dispatch(
            setActiveCustomers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        }
      },
    }),

    getBlockedCustomers: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/customers/blocked?page=${current_page}&per_page=${per_page}`;

        if (filter) {
          if (filter.division && filter.division.toLowerCase() !== "all") {
            url += `&division=${filter.division.toLowerCase()}`;
          }
          if (filter.district && filter.district.toLowerCase() !== "all") {
            url += `&district=${filter.district.toLowerCase()}`;
          }
          if (filter.upazila && filter.upazila.toLowerCase() !== "all") {
            url += `&sub_district=${filter.upazila.toLowerCase()}`;
          }
        }

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setBlockedCustomers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        } catch (error) {
          dispatch(
            setBlockedCustomers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        }
      },
    }),

    getPendingCustomers: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/customers/pending?page=${current_page}&per_page=${per_page}`;

        if (filter) {
          if (filter.division && filter.division.toLowerCase() !== "all") {
            url += `&division=${filter.division.toLowerCase()}`;
          }
          if (filter.district && filter.district.toLowerCase() !== "all") {
            url += `&district=${filter.district.toLowerCase()}`;
          }
          if (filter.upazila && filter.upazila.toLowerCase() !== "all") {
            url += `&sub_district=${filter.upazila.toLowerCase()}`;
          }
        }

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setPendingCustomers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        } catch (error) {
          dispatch(
            setPendingCustomers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        }
      },
    }),

    getRejectedCustomers: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/customers/rejected?page=${current_page}&per_page=${per_page}`;

        if (filter) {
          if (filter.division && filter.division.toLowerCase() !== "all") {
            url += `&division=${filter.division.toLowerCase()}`;
          }
          if (filter.district && filter.district.toLowerCase() !== "all") {
            url += `&district=${filter.district.toLowerCase()}`;
          }
          if (filter.upazila && filter.upazila.toLowerCase() !== "all") {
            url += `&sub_district=${filter.upazila.toLowerCase()}`;
          }
        }

        if (search) {
          url += `&search=${encodeURIComponent(search)}`;
        }

        return url;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setRejectedCustomers({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        } catch (error) {
          dispatch(
            setRejectedCustomers({
              data: [],
              meta: {
                page: arg.current_page || 1,
                per_page: arg.per_page || 10,
                total: 0,
                last_page: 0,
              },
              filters: {
                division: arg.filter?.division || "all",
                district: arg.filter?.district || "all",
                upazila: arg.filter?.upazila || "all",
                search: arg.search || "",
              },
            })
          );
        }
      },
    }),

    getSingleCustomer: builder.query({
      query: ({ customer_id }) => `/admin/customers/${customer_id}`,

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleCustomer(result?.data?.data));
        } catch (error) {
          dispatch(setSingleCustomer({}));
        }
      },
    }),

    blockCustomer: builder.mutation({
      query: ({ customer_id }) => ({
        url: `/admin/change-customer-status`,
        method: "PATCH",
        body: {
          _id: customer_id,
          status: "blocked",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(
              blockCustomerAction({
                customer_id: arg.customer_id,
                customerData: response.data,
              })
            );
          }
        } catch (error) {
          console.error("Block customer error:", error);
        }
      },
    }),

    unblockCustomer: builder.mutation({
      query: ({ customer_id }) => ({
        url: `/admin/change-customer-status`,
        method: "PATCH",
        body: {
          _id: customer_id,
          status: "active",
        },
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(
              unblockCustomerAction({
                customer_id: arg.customer_id,
                customerData: response.data,
              })
            );
          }
        } catch (error) {
          console.error("Unblock customer error:", error);
        }
      },
    }),

    getCustomerDetails: builder.query({
      query: ({ customer_id }) => ({
        url: `/admin/customer-details/${customer_id}`,
        method: "GET",
      }),

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCustomerDetails(result?.data?.data || {}));
        } catch (error) {
          dispatch(setCustomerDetails({}));
        }
      },
    }),

    getCustomerOderDetails: builder.query({
      query: ({ customer_id, current_page = 1, per_page = 10 }) => ({
        url: `/admin/customer-orders-table/${customer_id}?page=${current_page}&per_page=${per_page}`,
        method: "GET",
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const response = result?.data;

          if (response?.success === false && response?.status_code === 404) {
            dispatch(
              setCustomerOrderData({
                data: [],
                meta: {
                  total: 0,
                  last_page: 1,
                  page: arg.current_page || 1,
                  per_page: arg.per_page || 10,
                  hasNextPage: false,
                  hasPreviousPage: false,
                },
                success: false,
                message: response?.message || "No orders found",
              })
            );
          } else {
            dispatch(
              setCustomerOrderData({
                data: response?.data || [],
                meta: response?.meta || {
                  total: 0,
                  last_page: 1,
                  page: arg.current_page || 1,
                  per_page: arg.per_page || 10,
                  hasNextPage: false,
                  hasPreviousPage: false,
                },
                success: response?.success !== false,
                message: response?.message || "",
              })
            );
          }
        } catch (error) {
          dispatch(
            setCustomerOrderData({
              data: [],
              meta: {
                total: 0,
                last_page: 0,
                page: 1,
                per_page: 10,
                hasNextPage: false,
                hasPreviousPage: false,
              },
              success: false,
              message: error?.data?.message || "Failed to fetch orders",
            })
          );
        }
      },
    }),

    approveCustomer: builder.mutation({
      query: ({ customer_id }) => ({
        url: `/admin/change-customer-status`,
        method: "PATCH",
        body: {
          _id: customer_id,
          status: "active",
        },
      }),
    }),

    rejectCustomer: builder.mutation({
      query: ({ customer_id }) => ({
        url: `/admin/change-customer-status`,
        method: "PATCH",
        body: {
          _id: customer_id,
          status: "rejected",
        },
      }),
    }),
  }),
});

export const {
  useGetActiveCustomersQuery,
  useGetPendingCustomersQuery,
  useGetRejectedCustomersQuery,
  useGetCustomerOderDetailsQuery,
  useGetBlockedCustomersQuery,
  useGetSingleCustomerQuery,
  useBlockCustomerMutation,
  useGetCustomerDetailsQuery,
  useUnblockCustomerMutation,
  useApproveCustomerMutation,
  useRejectCustomerMutation,
} = customerApi;