import {
  useGetDashboardCardDataQuery,
  useGetDashboardStatsDataQuery,
  useGetDashboardTableDataQuery,
} from "@/features/dashboard/dashboardApi";
import { useSelector } from "react-redux";

export const useDashboard = () => {
  const { 
    dashboardCardData, 
    dashboardTableData, 
    dashboardStatsData,
    analytics,
    analyticsAmounts,
    userAnalytics,
    analyticsUsers,
    currentTab,
    currentUserTab
  } = useSelector((state) => state.dashboard);

  const {
    isFetching: isDashboardCardDataFetching,
    isError: isDashboardCardDataError,
    error: dashboardCardDataError,
  } = useGetDashboardCardDataQuery();
  const {
    isFetching: isDashboardTableDataFetching,
    isError: isDashboardTableDataError,
    error: dashboardTableDataError,
  } = useGetDashboardTableDataQuery();
  const {
    isFetching: isDashboardStatsDataFetching,
    isError: isDashboardStatsDataError,
    error: dashboardStatsDataError,
  } = useGetDashboardStatsDataQuery();

  return {
    isFetching:
      isDashboardCardDataFetching ||
      isDashboardTableDataFetching ||
      isDashboardStatsDataFetching,
    isError:
      isDashboardCardDataError ||
      isDashboardTableDataError ||
      isDashboardStatsDataError,
    error:
      dashboardCardDataError ||
      dashboardTableDataError ||
      dashboardStatsDataError,
    dashboardCardData,
    dashboardTableData,
    dashboardStatsData,
    analytics,
    analyticsAmounts,
    userAnalytics,
    analyticsUsers,
    currentTab,
    currentUserTab,
  };
};
