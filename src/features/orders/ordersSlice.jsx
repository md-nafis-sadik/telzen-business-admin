import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

  validationData: {
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

  processingData: {
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

  completedData: {
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

  cancelledData: {
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

  singleOrder: {},
  selectedData: {},
  statusOptions: [
    {
      id: "pending",
      label: "Pending",
      sub_status: [
        { id: "unassign", label: "Unassign" },
        { id: "assign", label: "Assign" },
      ],
    },
    {
      id: "validation",
      label: "Validation",
      sub_status: [
        { id: "unpaid", label: "Unpaid" },
        { id: "paid", label: "Paid" },
      ],
    },
    {
      id: "processing",
      label: "Processing",
      sub_status: [
        { id: "delivery_processing", label: "Delivery Processing" },
        { id: "loading_vehicle", label: "Loading Vehicle" },
        { id: "delivery_ongoing", label: "Delivery Ongoing" },
      ],
    },
    {
      id: "completed",
      label: "Completed",
      sub_status: [{ id: "delivered", label: "Delivered" }],
    },
    {
      id: "cancelled",
      label: "Cancelled",
      sub_status: [],
    },
  ],
};

const generateCacheKey = (page, filters) => {
  return `${page}_${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setPendingOrders: (state, action) => {
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

    setValidationOrders: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.validationData.lists = data || [];
      state.validationData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.validationData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.validationData.filters.division = filters.division;
      if (filters.district)
        state.validationData.filters.district = filters.district;
      if (filters.upazila)
        state.validationData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.validationData.filters.search = filters.search;
    },

    updateValidationFilters: (state, action) => {
      state.validationData.filters = {
        ...state.validationData.filters,
        ...action.payload,
      };
      state.validationData.filterChangeId += 1;
      state.validationData.cache = {};
    },

    updateValidationPage: (state, action) => {
      state.validationData.meta.currentPage = action.payload;
    },

    setProcessingOrders: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.processingData.lists = data || [];
      state.processingData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.processingData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.processingData.filters.division = filters.division;
      if (filters.district)
        state.processingData.filters.district = filters.district;
      if (filters.upazila)
        state.processingData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.processingData.filters.search = filters.search;
    },

    updateProcessingFilters: (state, action) => {
      state.processingData.filters = {
        ...state.processingData.filters,
        ...action.payload,
      };
      state.processingData.filterChangeId += 1;
      state.processingData.cache = {};
    },

    updateProcessingPage: (state, action) => {
      state.processingData.meta.currentPage = action.payload;
    },

    setCompletedOrders: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.completedData.lists = data || [];
      state.completedData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.completedData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.completedData.filters.division = filters.division;
      if (filters.district)
        state.completedData.filters.district = filters.district;
      if (filters.upazila)
        state.completedData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.completedData.filters.search = filters.search;
    },

    updateCompletedFilters: (state, action) => {
      state.completedData.filters = {
        ...state.completedData.filters,
        ...action.payload,
      };
      state.completedData.filterChangeId += 1;
      state.completedData.cache = {};
    },

    updateCompletedPage: (state, action) => {
      state.completedData.meta.currentPage = action.payload;
    },

    setCancelledOrders: (state, action) => {
      const { data, meta, filters = {} } = action.payload;

      state.cancelledData.lists = data || [];
      state.cancelledData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const cacheKey = generateCacheKey(meta?.page || 1, filters);
      state.cancelledData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (filters.division)
        state.cancelledData.filters.division = filters.division;
      if (filters.district)
        state.cancelledData.filters.district = filters.district;
      if (filters.upazila)
        state.cancelledData.filters.upazila = filters.upazila;
      if (filters.search !== undefined)
        state.cancelledData.filters.search = filters.search;
    },

    updateCancelledFilters: (state, action) => {
      state.cancelledData.filters = {
        ...state.cancelledData.filters,
        ...action.payload,
      };
      state.cancelledData.filterChangeId += 1;
      state.cancelledData.cache = {};
    },

    updateCancelledPage: (state, action) => {
      state.cancelledData.meta.currentPage = action.payload;
    },

    setSingleOrder: (state, action) => {
      state.singleOrder = action.payload;
    },

    updateSingleOrder: (state, action) => {
      state.singleOrder = {
        ...state.singleOrder,
        ...action.payload,
      };
    },

    updateOrder: (state, action) => {
      const { order_id, data } = action.payload;

      const updatedOrder = { ...data, _id: order_id };

      const updateInArray = (array) => {
        return array.map((order) => {
          if (order._id === order_id || order.order_id === order_id) {
            return { ...order, ...updatedOrder };
          }
          return order;
        });
      };

      const updateInCache = (cache) => {
        Object.keys(cache).forEach((key) => {
          cache[key].data = updateInArray(cache[key].data);
        });
      };

      state.pendingData.lists = updateInArray(state.pendingData.lists);
      updateInCache(state.pendingData.cache);

      state.validationData.lists = updateInArray(state.validationData.lists);
      updateInCache(state.validationData.cache);

      state.processingData.lists = updateInArray(state.processingData.lists);
      updateInCache(state.processingData.cache);

      state.completedData.lists = updateInArray(state.completedData.lists);
      updateInCache(state.completedData.cache);

      state.cancelledData.lists = updateInArray(state.cancelledData.lists);
      updateInCache(state.cancelledData.cache);

      if (
        state.singleOrder._id === order_id ||
        state.singleOrder.order_id === order_id
      ) {
        state.singleOrder = { ...state.singleOrder, ...updatedOrder };
      }
    },

    moveOrder: (state, action) => {
      const { order_id, oldStatus, newStatus, orderData } = action.payload;

      if (!order_id || !oldStatus || !newStatus) {
        console.error("Missing required fields for moveOrder");
        return;
      }

      if (oldStatus === newStatus) return;

      const oldDataKey = `${oldStatus}Data`;
      const newDataKey = `${newStatus}Data`;

      let orderToMove = null;
      let orderIndex = -1;

      orderIndex = state[oldDataKey].lists.findIndex(
        (order) => order._id === order_id || order.order_id === order_id
      );

      if (orderIndex !== -1) {
        orderToMove = state[oldDataKey].lists[orderIndex];
      }

      if (!orderToMove) {
        Object.keys(state[oldDataKey].cache).forEach((key) => {
          if (!orderToMove) {
            const cachedOrder = state[oldDataKey].cache[key].data.find(
              (order) => order._id === order_id || order.order_id === order_id
            );
            if (cachedOrder) {
              orderToMove = cachedOrder;
            }
          }
        });
      }

      const finalOrderData = orderData || orderToMove;

      if (!finalOrderData) {
        console.error(`Order with ID ${order_id} not found`);
        return;
      }

      if (orderIndex !== -1) {
        state[oldDataKey].lists.splice(orderIndex, 1);
        state[oldDataKey].meta.totalItems = Math.max(
          0,
          state[oldDataKey].meta.totalItems - 1
        );
      }

      Object.keys(state[oldDataKey].cache).forEach((key) => {
        state[oldDataKey].cache[key].data = state[oldDataKey].cache[
          key
        ].data.filter(
          (order) => !(order._id === order_id || order.order_id === order_id)
        );
      });

      const movedOrder = { ...finalOrderData, status: newStatus };
      state[newDataKey].lists.unshift(movedOrder);
      state[newDataKey].meta.totalItems += 1;

      const newCacheKey = generateCacheKey(1, state[newDataKey].filters);
      if (state[newDataKey].cache[newCacheKey]) {
        state[newDataKey].cache[newCacheKey].data.unshift(movedOrder);
        if (
          state[newDataKey].cache[newCacheKey].data.length >
          state[newDataKey].meta.pageSize
        ) {
          state[newDataKey].cache[newCacheKey].data.pop();
        }
      }

      if (
        state.singleOrder._id === order_id ||
        state.singleOrder.order_id === order_id
      ) {
        state.singleOrder = { ...state.singleOrder, ...movedOrder };
      }
    },

    clearPendingCache: (state) => {
      state.pendingData.cache = {};
    },

    clearValidationCache: (state) => {
      state.validationData.cache = {};
    },

    clearProcessingCache: (state) => {
      state.processingData.cache = {};
    },

    clearCompletedCache: (state) => {
      state.completedData.cache = {};
    },

    clearCancelledCache: (state) => {
      state.cancelledData.cache = {};
    },

    setOrderSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },
  },
});

export const {
  setPendingOrders,
  updatePendingFilters,
  updatePendingPage,
  setValidationOrders,
  updateValidationFilters,
  updateValidationPage,
  setProcessingOrders,
  updateProcessingFilters,
  updateProcessingPage,
  setCompletedOrders,
  updateCompletedFilters,
  updateCompletedPage,
  setCancelledOrders,
  updateCancelledFilters,
  updateCancelledPage,
  setSingleOrder,
  updateSingleOrder,
  updateOrder,
  moveOrder,
  clearPendingCache,
  clearValidationCache,
  clearProcessingCache,
  clearCompletedCache,
  clearCancelledCache,
  setOrderSelectedData,
} = ordersSlice.actions;

export default ordersSlice.reducer;
