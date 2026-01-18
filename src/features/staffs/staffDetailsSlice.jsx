import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffDetails: {},
  orderDataLists: [],
  orderData: {},
  orderPageData: {
    totalItems: 0,
    totalPages: 1,
    currentPage: 1,
    pageSize: 10,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoading: false,
  isError: false,
  error: null,
  isPayingCommission: false,
};

const staffDetailsSlice = createSlice({
  name: "staffDetails",
  initialState,
  reducers: {
    setStaffDetails: (state, action) => {
      state.staffDetails = action.payload || {};
    },

    setStaffOrderData: (state, action) => {
      const { data, meta, filter = {}, search = "" } = action.payload;

      if (meta?.last_page === 0) return;

      const cacheKey = `page${meta?.page}_${meta?.limit}`;

      if (meta?.page <= meta?.last_page) {
        state.orderData[cacheKey] = data;
        state.orderDataLists = data;

        state.orderPageData = {
          totalItems: meta?.total || 0,
          totalPages: meta?.last_page || 1,
          currentPage: meta?.page || 1,
          pageSize: meta?.limit || 10,
          hasNextPage: meta?.page < meta?.last_page,
          hasPreviousPage: meta?.page > 1,
        };
      } else {
        const fallbackCacheKey = `page${
          state.orderPageData.currentPage
        }_${state.orderPageData.pageSize}`;
        const otherData = state.orderData[fallbackCacheKey];
        const sliceData = otherData?.slice(0, meta?.limit) || [];
        const currentPage = meta?.page - meta?.last_page;
        const page = meta?.page - currentPage;

        state.orderDataLists = [...sliceData];
        state.orderPageData.currentPage = page;
        state.orderPageData.totalPages = meta?.last_page;
      }
    },

    setOrderPageData: (state, action) => {
      state.orderPageData = action.payload;
    },

    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.isError = !!action.payload;
      state.error = action.payload;
    },

    setPayingCommission: (state, action) => {
      state.isPayingCommission = action.payload;
    },

    updateCommissionAfterPayment: (state, action) => {
      const { paidAmount } = action.payload;
      if (state.staffDetails.dueCommission && paidAmount) {
        state.staffDetails.dueCommission = Math.max(
          0,
          state.staffDetails.dueCommission - paidAmount,
        );
      }
    },

    getPaginatedOrders: (state) => {
      const { currentPage, pageSize } = state.orderPageData;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return state.orderHistory.slice(startIndex, endIndex);
    },

    clearStaffOrderData: (state) => {
      state.orderDataLists = [];
      state.orderData = {};
      state.orderPageData = {
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
        pageSize: 10,
        hasNextPage: false,
        hasPreviousPage: false,
      };
    },
  },
});

export const {
  setStaffDetails,
  setOrderPageData,
  setStaffOrderData,
  setLoading,
  setError,
  setPayingCommission,
  updateCommissionAfterPayment,
  getPaginatedOrders,
  clearStaffOrderData,
} = staffDetailsSlice.actions;

export default staffDetailsSlice.reducer;
