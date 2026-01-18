import { apiSlice } from "../api/apiSlice";
import { setAccountBalance, setSummaryData } from "./accountBalanceSlice";

const accountBalanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Account Balance List
    getAccountBalance: builder.query({
      query: ({ current_page = 1, limit = 10 }) => {
        return `/admin/account-balance?page=${current_page}&limit=${limit}`;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;

          dispatch(
            setAccountBalance({
              data: responseData?.data || [],
              meta: responseData?.meta || {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
            }),
          );
        } catch (error) {
          dispatch(
            setAccountBalance({
              data: [],
              meta: {
                page: arg.current_page || 1,
                limit: arg.limit || 10,
                total: 0,
                last_page: 0,
              },
            }),
          );
        }
      },
    }),

    // Get Summary Data
    getAccountBalanceSummary: builder.query({
      query: () => `/admin/account-balance/summary`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.data || {};

          dispatch(
            setSummaryData({
              packageSold: data.package_sold || 0,
              sellingValue: data.selling_value || 0,
              packageFee: data.package_fee || 0,
              grossRevenue: data.gross_revenue || 0,
            }),
          );
        } catch (error) {
          dispatch(
            setSummaryData({
              packageSold: 0,
              sellingValue: 0,
              packageFee: 0,
              grossRevenue: 0,
            }),
          );
        }
      },
    }),
  }),
});

export const { useGetAccountBalanceQuery, useGetAccountBalanceSummaryQuery } =
  accountBalanceApi;
