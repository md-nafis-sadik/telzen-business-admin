import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  dashboardCardData: {},
  dashboardTableData: {},
  dashboardStatsData: {},
  currentTab: "year",
  currentUserTab: "year",
  analytics: {},
  analyticsAmounts: {
    month: {
      current: 0,
      previous: 0,
      isCurrentHigher: false,
    },
    year: {
      current: 0,
      previous: 0,
      isCurrentHigher: false,
    },
  },
  userAnalytics: {},
  analyticsUsers: {
    month: {
      current: 0,
      previous: 0,
      isCurrentHigher: false,
    },
    year: {
      current: 0,
      previous: 0,
      isCurrentHigher: false,
    },
  },
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardCardData: (state, action) => {
      state.dashboardCardData = action.payload;
    },
    setDashboardTableData: (state, action) => {
      state.dashboardTableData = action.payload;
    },
    setDashboardStatsData: (state, action) => {
      state.dashboardStatsData = action.payload;
    },
    setCurrentAnalyticsTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setUserCurrentAnalyticsTab: (state, action) => {
      state.currentUserTab = action.payload;
    },
    setAnalytics: (state, action) => {
      state.analytics = action.payload;
    },
    setAnalyticsAmounts: (state, action) => {
      const {
        currentMonthAmount,
        previousMonthAmount,
        currentYearAmount,
        previousYearAmount,
      } = action.payload;
      state.analyticsAmounts = {
        month: {
          current: currentMonthAmount,
          previous: previousMonthAmount,
          isCurrentHigher: currentMonthAmount > previousMonthAmount,
        },
        year: {
          current: currentYearAmount,
          previous: previousYearAmount,
          isCurrentHigher: currentYearAmount > previousYearAmount,
        },
      };
    },
    setUserAnalytics: (state, action) => {
      state.userAnalytics = action.payload;
    },
    setAnalyticsUsers: (state, action) => {
      const {
        currentMonthUser,
        previousMonthUser,
        currentYearUser,
        previousYearUser,
      } = action.payload;
      state.analyticsUsers = {
        month: {
          current: currentMonthUser,
          previous: previousMonthUser,
          isCurrentHigher: currentMonthUser > previousMonthUser,
        },
        year: {
          current: currentYearUser,
          previous: previousYearUser,
          isCurrentHigher: currentYearUser > previousYearUser,
        },
      };
    },
  },
});

export const {
  setDashboardCardData,
  setDashboardTableData,
  setDashboardStatsData,
  setCurrentAnalyticsTab,
  setUserCurrentAnalyticsTab,
  setAnalytics,
  setAnalyticsAmounts,
  setUserAnalytics,
  setAnalyticsUsers,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
