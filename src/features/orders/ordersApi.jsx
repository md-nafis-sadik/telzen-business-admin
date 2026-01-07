import { apiSlice } from "../api/apiSlice";
import {
  setPendingOrders,
  setValidationOrders,
  setProcessingOrders,
  setCompletedOrders,
  setCancelledOrders,
  setSingleOrder,
  updateOrder,
  moveOrder,
} from "./ordersSlice";

const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrders: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/orders/pending?page=${current_page}&per_page=${per_page}`;

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
            setPendingOrders({
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
            setPendingOrders({
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

    getValidationOrders: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/orders/validation?page=${current_page}&per_page=${per_page}`;

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
            setValidationOrders({
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
            setValidationOrders({
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

    getProcessingOrders: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/orders/processing?page=${current_page}&per_page=${per_page}`;

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
            setProcessingOrders({
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
            setProcessingOrders({
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

    getCompletedOrders: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/orders/completed?page=${current_page}&per_page=${per_page}`;

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
            setCompletedOrders({
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
            setCompletedOrders({
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

    getCancelledOrders: builder.query({
      query: ({
        current_page = 1,
        per_page = 10,
        filter = { division: "all", district: "all", upazila: "all" },
        search = "",
      }) => {
        let url = `/admin/orders/cancelled?page=${current_page}&per_page=${per_page}`;

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
            setCancelledOrders({
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
            setCancelledOrders({
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

    getSingleOrder: builder.query({
      query: ({ order_id }) => `/admin/order/${order_id}`,

      async onQueryStarted(_arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setSingleOrder(result?.data?.data || {}));
        } catch (error) {
          dispatch(setSingleOrder({}));
        }
      },
    }),

    updateOrder: builder.mutation({
      query: ({ order_id, ...data }) => ({
        url: `/admin/order/${order_id}`,
        method: "PATCH",
        body: data,
      }),

      async onQueryStarted(arg, { dispatch, queryFulfilled, getState }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            const state = getState();
            const oldOrder = state.orders.singleOrder;
            const oldStatus = oldOrder?.status;
            const newStatus = arg.status || response.data.status;

            if (oldStatus && newStatus && oldStatus !== newStatus) {
              dispatch(
                moveOrder({
                  order_id: arg.order_id,
                  oldStatus,
                  newStatus,
                  orderData: response.data,
                })
              );
            } else {
              dispatch(
                updateOrder({
                  order_id: arg.order_id,
                  data: response.data,
                })
              );
            }
          }
        } catch (error) {
          console.error("Update order error:", error);
        }
      },
    }),

    assignStaffToOrder: builder.mutation({
      query: ({ order_id, staff_id }) => ({
        url: `/admin/assign-staff-to-order`,
        method: "PATCH",
        body: { _id: order_id, staff_id },
      }),

      async onQueryStarted({ order_id }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(
              updateOrder({
                order_id,
                data: response.data,
              })
            );
          }
        } catch (error) {
          console.error("Assign staff error:", error);
        }
      },
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ order_id, status }) => ({
        url: `/admin/payment-status`,
        method: "PATCH",
        body: { _id: order_id, status },
      }),

      async onQueryStarted({ order_id }, { queryFulfilled, dispatch }) {
        try {
          const { data: response } = await queryFulfilled;
          if (response?.success && response?.data) {
            dispatch(
              updateOrder({
                order_id,
                data: response.data,
              })
            );
          }
        } catch (error) {
          console.error("Update payment status error:", error);
        }
      },
    }),

    getOrderBrickTypes: builder.query({
      query: (order_id) => `/admin/order-brick-type/${order_id}`,
      transformResponse: (response) => response?.data || [],
    }),

    createOrder: builder.mutation({
      query: (data) => ({
        url: `/admin/order`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetPendingOrdersQuery,
  useGetValidationOrdersQuery,
  useGetProcessingOrdersQuery,
  useGetCompletedOrdersQuery,
  useGetCancelledOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useAssignStaffToOrderMutation,
  useUpdatePaymentStatusMutation,
  useCreateOrderMutation,
  useGetOrderBrickTypesQuery,
} = ordersApi;