import { apiSlice } from "../api/apiSlice";
import {
  setAnalytics,
  setDashboardCardData,
  setUserAnalytics,
} from "./dashboardSlice";

export const dashboardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCardData: builder.query({
      query: () => `dashboard/stats`,
      // query: (filter = "last6months") => `dashboard/stats?filter=${filter}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setDashboardCardData(result?.data?.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getRecentSalesPerformance: builder.query({
      query: () => `/dashboard/recent-sales`,
      // query: (filter = "last6months") => `/admin/staff-performance?filter=${filter}`,
    }),
    getTopBuyers: builder.query({
      query: () => `/dashboard/top-buyers`,
      // query: (filter = "last6months") => `/admin/top-bricks?filter=${filter}`,
    }),
    getOrderStatistics: builder.query({
      query: (filter = "6_months") =>
        `dashboard/sales?filter=${filter}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const chartData = result?.data?.data;

          if (chartData) {
            const analytics = {
              month: chartData || [],
              year: chartData || [],
            };
            dispatch(setAnalytics(analytics));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getRevenueStatistics: builder.query({
      query: (filter = "6_months") =>
        `dashboard/revenue?filter=${filter}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const chartData = result?.data?.data;

          if (chartData) {
            const userAnalytics = {
              month: chartData || [],
              year: chartData || [],
            };
            dispatch(setUserAnalytics(userAnalytics));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetDashboardCardDataQuery,
  useGetRecentSalesPerformanceQuery,
  useGetTopBuyersQuery,
  useGetOrderStatisticsQuery,
  useGetRevenueStatisticsQuery,
} = dashboardsApi;
