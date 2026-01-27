import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountBalanceData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    cache: {},
    filterChangeId: 0,
  },
  summaryData: {
    packageSold: 0,
    sellingValue: 0,
    packageFee: 0,
    grossRevenue: 0,
  },
};

const generateCacheKey = (page) => {
  return `${page}`;
};

const accountBalanceSlice = createSlice({
  name: "accountBalance",
  initialState,
  reducers: {
    setAccountBalance: (state, action) => {
      const { data, meta } = action.payload;

      state.accountBalanceData.lists = data || [];
      state.accountBalanceData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.limit || 10,
      };

      // Cache the data
      const cacheKey = generateCacheKey(meta?.page || 1);
      state.accountBalanceData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };
    },

    setSummaryData: (state, action) => {
      state.summaryData = action.payload;
    },

    updateAccountBalancePage: (state, action) => {
      state.accountBalanceData.meta.currentPage = action.payload;
    },

    updateAccountBalancePageSize: (state, action) => {
      state.accountBalanceData.meta.pageSize = action.payload;
      state.accountBalanceData.meta.currentPage = 1;
      state.accountBalanceData.filterChangeId += 1;
      state.accountBalanceData.cache = {};
    },

    resetAccountBalanceState: () => initialState,
  },
});

export const {
  setAccountBalance,
  setSummaryData,
  updateAccountBalancePage,
  updateAccountBalancePageSize,
  resetAccountBalanceState,
} = accountBalanceSlice.actions;

export default accountBalanceSlice.reducer;