import { createSlice } from "@reduxjs/toolkit";
import { set } from "zod";

const initialState = {
  regularData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
    cache: {},
    filterChangeId: 0,
  },

  groupData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
    cache: {},
    filterChangeId: 0,
  },

  groupDetailsData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
    cache: {},
    filterChangeId: 0,
  },

  singleMyEsim: {},
  selectedData: {},
  showSuccessModal: false,
  successMessage: "",
  showQrModal: false,
  showRemoveModal: false,
  loadingInvoiceId: null,
};

const generateCacheKey = (page, search) => {
  return `${page}_${search}`;
};

const myEsimSlice = createSlice({
  name: "myEsims",
  initialState,
  reducers: {
    setRegularMyEsim: (state, action) => {
      const { data, meta, search } = action.payload;

      state.regularData.lists = data || [];
      state.regularData.meta = {
        totalItems: meta?.total_items || 0,
        totalPages: meta?.total_pages || 1,
        currentPage: meta?.current_page || 1,
        pageSize: meta?.page_size || 10,
      };

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.regularData.search;
      const cacheKey = generateCacheKey(meta?.current_page || 1, currentSearch || "");
      state.regularData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.regularData.search = search;
      }
    },

    updateRegularSearch: (state, action) => {
      state.regularData.search = action.payload;
      state.regularData.filterChangeId += 1;
      state.regularData.cache = {};
    },

    updateRegularPage: (state, action) => {
      state.regularData.meta.currentPage = action.payload;
    },

    updateRegularPageSize: (state, action) => {
      state.regularData.meta.pageSize = action.payload;
      state.regularData.meta.currentPage = 1;
      state.regularData.filterChangeId += 1;
      state.regularData.cache = {};
    },

    setGroupMyEsim: (state, action) => {
      const { data, meta, search } = action.payload;

      state.groupData.lists = data || [];
      state.groupData.meta = {
        totalItems: meta?.total_items || 0,
        totalPages: meta?.total_pages || 1,
        currentPage: meta?.current_page || 1,
        pageSize: meta?.page_size || 10,
      };

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.groupData.search;
      const cacheKey = generateCacheKey(meta?.current_page || 1, currentSearch || "");
      state.groupData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.groupData.search = search;
      }
    },

    updateGroupSearch: (state, action) => {
      state.groupData.search = action.payload;
      state.groupData.filterChangeId += 1;
      state.groupData.cache = {};
    },

    updateGroupPage: (state, action) => {
      state.groupData.meta.currentPage = action.payload;
    },

    updateGroupPageSize: (state, action) => {
      state.groupData.meta.pageSize = action.payload;
      state.groupData.meta.currentPage = 1;
      state.groupData.filterChangeId += 1;
      state.groupData.cache = {};
    },

    setGroupDetailsData: (state, action) => {
      const { data, meta, search } = action.payload;

      state.groupDetailsData.lists = data || [];
      state.groupDetailsData.meta = {
        totalItems: meta?.total_items || 0,
        totalPages: meta?.total_pages || 1,
        currentPage: meta?.current_page || 1,
        pageSize: meta?.page_size || 10,
      };

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.groupDetailsData.search;
      const cacheKey = generateCacheKey(meta?.current_page || 1, currentSearch || "");
      state.groupDetailsData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.groupDetailsData.search = search;
      }
    },

    updateGroupDetailsSearch: (state, action) => {
      state.groupDetailsData.search = action.payload;
      state.groupDetailsData.filterChangeId += 1;
      state.groupDetailsData.cache = {};
    },

    updateGroupDetailsPage: (state, action) => {
      state.groupDetailsData.meta.currentPage = action.payload;
    },

    updateGroupDetailsPageSize: (state, action) => {
      state.groupDetailsData.meta.pageSize = action.payload;
      state.groupDetailsData.meta.currentPage = 1;
      state.groupDetailsData.filterChangeId += 1;
      state.groupDetailsData.cache = {};
    },

    resetGroupDetails: (state) => {
      state.groupDetailsData = {
        lists: [],
        meta: {
          totalItems: 0,
          totalPages: 1,
          currentPage: 1,
          pageSize: 10,
        },
        search: "",
        cache: {},
        filterChangeId: 0,
      };
    },

    setSingleMyEsim: (state, action) => {
      state.singleMyEsim = action.payload;
    },

    updateSingleMyEsim: (state, action) => {
      state.singleMyEsim = {
        ...state.singleMyEsim,
        ...action.payload,
      };
    },

    updateMyEsim: (state, action) => {
      const { myEsim_id, data } = action.payload;
      const updatedMyEsim = { ...data, _id: myEsim_id };

      const updateInArray = (array) => {
        return array.map((myEsim) =>
          myEsim._id === myEsim_id ? { ...myEsim, ...updatedMyEsim } : myEsim,
        );
      };

      const updateInCache = (cache) => {
        Object.keys(cache).forEach((key) => {
          cache[key].data = updateInArray(cache[key].data);
        });
      };

      state.regularData.lists = updateInArray(state.regularData.lists);
      updateInCache(state.regularData.cache);

      state.groupData.lists = updateInArray(state.groupData.lists);
      updateInCache(state.groupData.cache);

      if (state.singleMyEsim._id === myEsim_id) {
        state.singleMyEsim = { ...state.singleMyEsim, ...updatedMyEsim };
      }
    },

    setMyEsimSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },

    setSuccessModal: (state, action) => {
      state.showSuccessModal = true;
      state.successMessage = action.payload;
    },

    clearSuccessModal: (state) => {
      state.showSuccessModal = false;
      state.successMessage = "";
    },

    openReassignModal: (state, action) => {
      state.showReassignModal = true;
      state.selectedMyEsimForBlock = action.payload;
      state.replacementMyEsimId = "";
    },

    closeReassignModal: (state) => {
      state.showReassignModal = false;
      state.selectedMyEsimForBlock = null;
      state.replacementMyEsimId = "";
    },

    openRemoveModal: (state, action) => {
      state.showRemoveModal = true;
      state.showQrModal = false;
      state.selectedData = action.payload;
    },

    closeRemoveModal: (state) => {
      state.showRemoveModal = false;
      state.selectedData = null;
    },

    openQrModal: (state, action) => {
      state.showQrModal = true;
      state.showRemoveModal = false;
      state.selectedData = action.payload;
    },

    closeQrModal: (state) => {
      state.showQrModal = false;
      state.selectedData = null;
    },

    setLoadingInvoiceId: (state, action) => {
      state.loadingInvoiceId = action.payload;
    },

    // Reset state
    resetMyEsimState: () => initialState,
  },
});

export const {
  setRegularMyEsim,
  updateRegularSearch,
  updateRegularPage,
  updateRegularPageSize,
  setGroupMyEsim,
  updateGroupSearch,
  updateGroupPage,
  updateGroupPageSize,
  setGroupDetailsData,
  updateGroupDetailsSearch,
  updateGroupDetailsPage,
  updateGroupDetailsPageSize,
  resetGroupDetails,
  setSingleMyEsim,
  updateSingleMyEsim,
  setMyEsimSelectedData,
  setSuccessModal,
  clearSuccessModal,
  openRemoveModal,
  closeRemoveModal,
  openQrModal,
  closeQrModal,
  resetMyEsimState,
  setLoadingInvoiceId,
} = myEsimSlice.actions;

export default myEsimSlice.reducer;