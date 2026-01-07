import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    filters: {
      division: "all",
      district: "all",
      upazila: "all",
      search: "",
    },
    cache: {},
    filterChangeId: 0,
  },

  blockedData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    filters: {
      division: "all",
      district: "all",
      upazila: "all",
      search: "",
    },
    cache: {},
    filterChangeId: 0,
  },

  pendingData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    filters: {
      division: "all",
      district: "all",
      upazila: "all",
      search: "",
    },
    cache: {},
    filterChangeId: 0,
  },

  rejectedData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    filters: {
      division: "all",
      district: "all",
      upazila: "all",
      search: "",
    },
    cache: {},
    filterChangeId: 0,
  },

  singleCustomer: {},
  selectedData: {},
};

const generateCacheKey = (page, filters) => {
  return `${page}_${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;
};

const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    setActiveCustomers: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.activeData.lists = data || [];
      state.activeData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.activeData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.activeData.filters.division = filters.division;
      if (filters.district)
        state.activeData.filters.district = filters.district;
      if (filters.upazila) state.activeData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.activeData.filters.search = filters.search;
    },

    updateActiveFilters: (state, action) => {
      state.activeData.filters = {
        ...state.activeData.filters,
        ...action.payload,
      };
      state.activeData.filterChangeId += 1;
      state.activeData.cache = {};
    },

    updateActivePage: (state, action) => {
      state.activeData.meta.currentPage = action.payload;
    },

    setBlockedCustomers: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.blockedData.lists = data || [];
      state.blockedData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.blockedData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.blockedData.filters.division = filters.division;
      if (filters.district)
        state.blockedData.filters.district = filters.district;
      if (filters.upazila) state.blockedData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.blockedData.filters.search = filters.search;
    },

    updateBlockedFilters: (state, action) => {
      state.blockedData.filters = {
        ...state.blockedData.filters,
        ...action.payload,
      };
      state.blockedData.filterChangeId += 1;
      state.blockedData.cache = {};
    },

    updateBlockedPage: (state, action) => {
      state.blockedData.meta.currentPage = action.payload;
    },

    setPendingCustomers: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.pendingData.lists = data || [];
      state.pendingData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.pendingData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.pendingData.filters.division = filters.division;
      if (filters.district)
        state.pendingData.filters.district = filters.district;
      if (filters.upazila) state.pendingData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.pendingData.filters.search = filters.search;
    },

    updatePendingFilters: (state, action) => {
      state.pendingData.filters = {
        ...state.pendingData.filters,
        ...action.payload,
      };
      state.pendingData.filterChangeId += 1;
      state.pendingData.cache = {};
    },

    updatePendingPage: (state, action) => {
      state.pendingData.meta.currentPage = action.payload;
    },

    setRejectedCustomers: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.rejectedData.lists = data || [];
      state.rejectedData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.rejectedData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.rejectedData.filters.division = filters.division;
      if (filters.district)
        state.rejectedData.filters.district = filters.district;
      if (filters.upazila) state.rejectedData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.rejectedData.filters.search = filters.search;
    },

    updateRejectedFilters: (state, action) => {
      state.rejectedData.filters = {
        ...state.rejectedData.filters,
        ...action.payload,
      };
      state.rejectedData.filterChangeId += 1;
      state.rejectedData.cache = {};
    },

    updateRejectedPage: (state, action) => {
      state.rejectedData.meta.currentPage = action.payload;
    },

    setSingleCustomer: (state, action) => {
      state.singleCustomer = action.payload;
    },

    blockCustomer: (state, action) => {
      const { customer_id, customerData } = action.payload;

      if (!customer_id) {
        console.error("No customer ID provided for block operation");
        return;
      }

      let customerToBlock = null;
      let customerIndex = -1;

      customerIndex = state.activeData.lists.findIndex(
        (customer) => customer._id === customer_id
      );

      if (customerIndex !== -1) {
        customerToBlock = state.activeData.lists[customerIndex];
      }

      if (!customerToBlock) {
        Object.keys(state.activeData.cache).forEach((key) => {
          if (!customerToBlock) {
            const cachedCustomer = state.activeData.cache[key].data.find(
              (customer) => customer._id === customer_id
            );
            if (cachedCustomer) {
              customerToBlock = cachedCustomer;
            }
          }
        });
      }

      if (!customerToBlock) {
        const pendingIndex = state.pendingData.lists.findIndex(
          (customer) => customer._id === customer_id
        );
        if (pendingIndex !== -1) {
          customerToBlock = state.pendingData.lists[pendingIndex];
          state.pendingData.lists.splice(pendingIndex, 1);
          state.pendingData.meta.totalItems = Math.max(
            0,
            state.pendingData.meta.totalItems - 1
          );
        }
      }

      if (!customerToBlock) {
        Object.keys(state.pendingData.cache).forEach((key) => {
          if (!customerToBlock) {
            const cachedCustomer = state.pendingData.cache[key].data.find(
              (customer) => customer._id === customer_id
            );
            if (cachedCustomer) {
              customerToBlock = cachedCustomer;
            }
          }
        });
      }

      const finalCustomerData = customerData || customerToBlock;

      if (!finalCustomerData) {
        console.error(`Customer with ID ${customer_id} not found`);
        return;
      }

      if (customerIndex !== -1) {
        state.activeData.lists.splice(customerIndex, 1);
        state.activeData.meta.totalItems = Math.max(
          0,
          state.activeData.meta.totalItems - 1
        );
      }

      Object.keys(state.activeData.cache).forEach((key) => {
        state.activeData.cache[key].data = state.activeData.cache[
          key
        ].data.filter((customer) => customer._id !== customer_id);
      });

      Object.keys(state.pendingData.cache).forEach((key) => {
        state.pendingData.cache[key].data = state.pendingData.cache[
          key
        ].data.filter((customer) => customer._id !== customer_id);
      });

      const blockedCustomer = { ...finalCustomerData, status: "blocked" };
      state.blockedData.lists.unshift(blockedCustomer);
      state.blockedData.meta.totalItems += 1;

      const blockedCacheKey = generateCacheKey(1, state.blockedData.filters);
      if (state.blockedData.cache[blockedCacheKey]) {
        state.blockedData.cache[blockedCacheKey].data.unshift(blockedCustomer);
        if (
          state.blockedData.cache[blockedCacheKey].data.length >
          state.blockedData.meta.pageSize
        ) {
          state.blockedData.cache[blockedCacheKey].data.pop();
        }
      }

      if (
        state.singleCustomer._id === customer_id &&
        state.singleCustomer.status !== "blocked"
      ) {
        state.singleCustomer = { ...state.singleCustomer, status: "blocked" };
      }
    },

    unblockCustomer: (state, action) => {
      const { customer_id, customerData } = action.payload;

      if (!customer_id) {
        console.error("No customer ID provided for unblock operation");
        return;
      }

      let customerToUnblock = null;
      let customerIndex = -1;

      customerIndex = state.blockedData.lists.findIndex(
        (customer) => customer._id === customer_id
      );

      if (customerIndex !== -1) {
        customerToUnblock = state.blockedData.lists[customerIndex];
      }

      if (!customerToUnblock) {
        Object.keys(state.blockedData.cache).forEach((key) => {
          if (!customerToUnblock) {
            const cachedCustomer = state.blockedData.cache[key].data.find(
              (customer) => customer._id === customer_id
            );
            if (cachedCustomer) {
              customerToUnblock = cachedCustomer;
            }
          }
        });
      }

      const finalCustomerData = customerData || customerToUnblock;

      if (!finalCustomerData) {
        console.error(`Customer with ID ${customer_id} not found`);
        return;
      }

      if (customerIndex !== -1) {
        state.blockedData.lists.splice(customerIndex, 1);
        state.blockedData.meta.totalItems = Math.max(
          0,
          state.blockedData.meta.totalItems - 1
        );
      }

      Object.keys(state.blockedData.cache).forEach((key) => {
        state.blockedData.cache[key].data = state.blockedData.cache[
          key
        ].data.filter((customer) => customer._id !== customer_id);
      });

      const activeCustomer = { ...finalCustomerData, status: "active" };
      state.activeData.lists.unshift(activeCustomer);
      state.activeData.meta.totalItems += 1;

      const activeCacheKey = generateCacheKey(1, state.activeData.filters);
      if (state.activeData.cache[activeCacheKey]) {
        state.activeData.cache[activeCacheKey].data.unshift(activeCustomer);
        if (
          state.activeData.cache[activeCacheKey].data.length >
          state.activeData.meta.pageSize
        ) {
          state.activeData.cache[activeCacheKey].data.pop();
        }
      }

      if (
        state.singleCustomer._id === customer_id &&
        state.singleCustomer.status !== "active"
      ) {
        state.singleCustomer = { ...state.singleCustomer, status: "active" };
      }
    },

    clearActiveCache: (state) => {
      state.activeData.cache = {};
    },

    clearBlockedCache: (state) => {
      state.blockedData.cache = {};
    },

    clearPendingCache: (state) => {
      state.pendingData.cache = {};
    },

    clearRejectedCache: (state) => {
      state.rejectedData.cache = {};
    },

    setCustomerSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
  },
});

export const {
  setActiveCustomers,
  updateActiveFilters,
  updateActivePage,
  setBlockedCustomers,
  updateBlockedFilters,
  updateBlockedPage,
  setPendingCustomers,
  updatePendingFilters,
  updatePendingPage,
  setRejectedCustomers,
  updateRejectedFilters,
  updateRejectedPage,
  setSingleCustomer,
  blockCustomer,
  unblockCustomer,
  clearActiveCache,
  clearBlockedCache,
  clearPendingCache,
  clearRejectedCache,
  setCustomerSelectedData,
} = customerSlice.actions;

export default customerSlice.reducer;
