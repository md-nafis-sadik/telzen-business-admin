import { createSlice } from "@reduxjs/toolkit";

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
  },

  singleMyEsim: {},
  selectedData: {},
  showSuccessModal: false,
  successMessage: "",
  showQrModal: false,
  showRemoveModal: false,
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

      if (search !== undefined) {
        state.regularData.search = search;
      }
    },

    updateRegularSearch: (state, action) => {
      state.regularData.search = action.payload;
    },

    updateRegularPage: (state, action) => {
      state.regularData.meta.currentPage = action.payload;
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

      if (search !== undefined) {
        state.groupData.search = search;
      }
    },

    updateGroupSearch: (state, action) => {
      state.groupData.search = action.payload;
    },

    updateGroupPage: (state, action) => {
      state.groupData.meta.currentPage = action.payload;
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
  },
});

export const {
  setRegularMyEsim,
  updateRegularSearch,
  updateRegularPage,
  setGroupMyEsim,
  updateGroupSearch,
  updateGroupPage,
  setSingleMyEsim,
  updateSingleMyEsim,
  setMyEsimSelectedData,
  setSuccessModal,
  clearSuccessModal,
  openRemoveModal,
  closeRemoveModal,
  openQrModal,
  closeQrModal,
} = myEsimSlice.actions;

export default myEsimSlice.reducer;
