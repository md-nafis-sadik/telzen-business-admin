import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customerDetails: {},
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
};

const customerDetailsSlice = createSlice({
  name: "customerDetails",
  initialState,
  reducers: {
    setCustomerDetails: (state, action) => {
      state.customerDetails = action.payload;
    },

    setCustomerOrderData: (state, action) => {
      const { data, meta, filter = {}, search = "" } = action.payload;
      

      const cacheKey = `page${meta?.page}_${meta?.per_page}`;

      if (meta?.last_page === 0) {
        state.orderData[cacheKey] = [];
        state.orderDataLists = [];
        state.orderPageData = {
          totalItems: 0,
          totalPages: 1,
          currentPage: 1,
          pageSize: meta?.per_page || 10,
          hasNextPage: false,
          hasPreviousPage: false,
        };
        return;
      }

      if (meta?.page <= meta?.last_page) {
        state.orderData[cacheKey] = data;
        state.orderDataLists = data;

        state.orderPageData = {
          totalItems: meta?.total || 0,
          totalPages: meta?.last_page || 1,
          currentPage: meta?.page || 1,
          pageSize: meta?.per_page || 10,
          hasNextPage: meta?.page < meta?.last_page,
          hasPreviousPage: meta?.page > 1,
        };
      } else {
        const fallbackCacheKey = `page${
          state.orderPageData.currentPage
        }_${state.orderPageData.pageSize}`;
        const otherData = state.orderData[fallbackCacheKey];
        const sliceData = otherData?.slice(0, meta?.per_page) || [];
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

    getPaginatedOrders: (state) => {
      const { currentPage, pageSize } = state.orderPageData;
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      return state.orderHistory.slice(startIndex, endIndex);
    },
  },
});

export const {
  setCustomerDetails,
  setCustomerOrderData,
  setOrderPageData,
  setLoading,
  setError,
  getPaginatedOrders,
} = customerDetailsSlice.actions;

export default customerDetailsSlice.reducer;
