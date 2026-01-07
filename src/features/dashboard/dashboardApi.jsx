import { apiSlice } from "../api/apiSlice";
import {
  setAnalytics,
  setDashboardCardData,
  setUserAnalytics,
} from "./dashboardSlice";

export const dashboardsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardCardData: builder.query({
      query: (filter = "last6months") => `/admin/dashboard-cards?filter=${filter}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(setDashboardCardData(result?.data?.data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getStaffPerformance: builder.query({
      query: (filter = "last6months") => `/admin/staff-performance?filter=${filter}`,
    }),
    getTopBricks: builder.query({
      query: (filter = "last6months") => `/admin/top-bricks?filter=${filter}`,
    }),
    getOrderStatistics: builder.query({
      query: (filter = "last6months") =>
        `/admin/order-overview-statistics?filter=${filter}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const statsData = result?.data?.data;

          if (statsData?.chart_data) {
            const analytics = {
              month: statsData.chart_data || [],
              year: statsData.chart_data || [],
            };
            dispatch(setAnalytics(analytics));
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getRevenueStatistics: builder.query({
      query: (filter = "last6months") =>
        `/admin/revenue-statistics?filter=${filter}`,

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const statsData = result?.data?.data;

          if (statsData?.chart_data) {
            const userAnalytics = {
              month: statsData.chart_data || [],
              year: statsData.chart_data || [],
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
  useGetStaffPerformanceQuery,
  useGetTopBricksQuery,
  useGetOrderStatisticsQuery,
  useGetRevenueStatisticsQuery,
} = dashboardsApi;
