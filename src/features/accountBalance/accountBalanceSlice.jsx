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
  },
  summaryData: {
    packageSold: 0,
    sellingValue: 0,
    packageFee: 0,
    grossRevenue: 0,
  },
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
        pageSize: meta?.per_page || 10,
      };
    },

    setSummaryData: (state, action) => {
      state.summaryData = action.payload;
    },

    updateAccountBalancePage: (state, action) => {
      state.accountBalanceData.meta.currentPage = action.payload;
    },

    resetAccountBalanceState: () => initialState,
  },
});

export const {
  setAccountBalance,
  setSummaryData,
  updateAccountBalancePage,
  resetAccountBalanceState,
} = accountBalanceSlice.actions;

export default accountBalanceSlice.reducer;
