import { apiSlice } from "../api/apiSlice";
import { setAccountBalance, setSummaryData } from "./accountBalanceSlice";

const accountBalanceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get Account Balance List
    getAccountBalance: builder.query({
      query: ({ current_page = 1, limit = 10 }) => {
        return `/checkout?page=${current_page}&limit=${limit}`;
      },

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const responseData = result?.data;
          const apiMeta = responseData?.meta;

          dispatch(
            setAccountBalance({
              data: responseData?.data || [],
              meta: {
                page: apiMeta?.current_page || arg.current_page || 1,
                limit: apiMeta?.page_size || arg.limit || 10,
                total: apiMeta?.total_items || 0,
                last_page: apiMeta?.total_pages || 1,
              },
            }),
          );
        } catch (error) {
          // Don't update anything on error to preserve state
        }
      },
    }),

    // Get Summary Data
    getAccountBalanceSummary: builder.query({
      query: () => `/checkout/stats`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.data || {};

          dispatch(
            setSummaryData({
              packageSold: data.total_package_sold || 0,
              sellingValue: data.total_selling_value || 0,
              packageFee: data.total_retailer_fee || 0,
              grossRevenue: data.revenue || 0,
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