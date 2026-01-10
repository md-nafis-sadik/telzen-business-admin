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
  selectedMyEsimForBlock: null,
  replacementMyEsimId: "",
  showReassignModal: false,
  showBlockSuccessModal: false,

  roleOptions: [
    { id: "manager", label: "Manager" },
    { id: "admin", label: "Admin" },
    { id: "employee", label: "Employee" },
  ],

  statusOptions: [
    { id: "regular", label: "Regular" },
    { id: "group", label: "Group" },
  ],
};

const myEsimSlice = createSlice({
  name: "myEsims",
  initialState,
  reducers: {
    setRegularMyEsim: (state, action) => {
      const { data, meta, search } = action.payload;

      state.regularData.lists = data || [];
      state.regularData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
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
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
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
          myEsim._id === myEsim_id ? { ...myEsim, ...updatedMyEsim } : myEsim
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

    blockMyEsim: (state, action) => {
      const { myEsim_id, myEsimData } = action.payload;

      if (!myEsim_id) {
        console.error("No myEsim ID provided for block operation");
        return;
      }

      let myEsimToBlock = null;
      let myEsimIndex = -1;

      myEsimIndex = state.regularData.lists.findIndex(
        (myEsim) =>
          myEsim._id === myEsim_id ||
          myEsim.myEsim_user_id === myEsim_id ||
          myEsim.id === myEsim_id
      );

      if (myEsimIndex !== -1) {
        myEsimToBlock = state.regularData.lists[myEsimIndex];
      }

      if (!myEsimToBlock) {
        Object.keys(state.regularData.cache).forEach((key) => {
          if (!myEsimToBlock) {
            const cachedMyEsim = state.regularData.cache[key].data.find(
              (myEsim) =>
                myEsim._id === myEsim_id ||
                myEsim.myEsim_user_id === myEsim_id ||
                myEsim.id === myEsim_id
            );
            if (cachedMyEsim) {
              myEsimToBlock = cachedMyEsim;
            }
          }
        });
      }

      const finalMyEsimData = myEsimData || myEsimToBlock;

      if (!finalMyEsimData) {
        console.error(`MyEsim with ID ${myEsim_id} not found`);
        return;
      }

      if (myEsimIndex !== -1) {
        state.regularData.lists.splice(myEsimIndex, 1);
        state.regularData.meta.totalItems = Math.max(
          0,
          state.regularData.meta.totalItems - 1
        );
      }

      Object.keys(state.regularData.cache).forEach((key) => {
        state.regularData.cache[key].data = state.regularData.cache[
          key
        ].data.filter(
          (myEsim) =>
            !(
              myEsim._id === myEsim_id ||
              myEsim.myEsim_user_id === myEsim_id ||
              myEsim.id === myEsim_id
            )
        );
      });

      const groupMyEsim = { ...finalMyEsimData, status: "group" };
      state.groupData.lists.unshift(groupMyEsim);
      state.groupData.meta.totalItems += 1;

      const groupCacheKey = generateCacheKey(1, state.groupData.filters);
      if (state.groupData.cache[groupCacheKey]) {
        state.groupData.cache[groupCacheKey].data.unshift(groupMyEsim);
        if (
          state.groupData.cache[groupCacheKey].data.length >
          state.groupData.meta.pageSize
        ) {
          state.groupData.cache[groupCacheKey].data.pop();
        }
      }

      if (
        (state.singleMyEsim._id === myEsim_id ||
          state.singleMyEsim.myEsim_user_id === myEsim_id ||
          state.singleMyEsim.id === myEsim_id) &&
        state.singleMyEsim.status !== "group"
      ) {
        state.singleMyEsim = { ...state.singleMyEsim, status: "group" };
      }
    },

    unblockMyEsim: (state, action) => {
      const { myEsim_id, myEsimData } = action.payload;

      if (!myEsim_id) {
        console.error("No myEsim ID provided for unblock operation");
        return;
      }

      let myEsimToUnblock = null;
      let myEsimIndex = -1;

      myEsimIndex = state.groupData.lists.findIndex(
        (myEsim) =>
          myEsim._id === myEsim_id ||
          myEsim.myEsim_user_id === myEsim_id ||
          myEsim.id === myEsim_id
      );

      if (myEsimIndex !== -1) {
        myEsimToUnblock = state.groupData.lists[myEsimIndex];
      }

      if (!myEsimToUnblock) {
        Object.keys(state.groupData.cache).forEach((key) => {
          if (!myEsimToUnblock) {
            const cachedMyEsim = state.groupData.cache[key].data.find(
              (myEsim) =>
                myEsim._id === myEsim_id ||
                myEsim.myEsim_user_id === myEsim_id ||
                myEsim.id === myEsim_id
            );
            if (cachedMyEsim) {
              myEsimToUnblock = cachedMyEsim;
            }
          }
        });
      }

      const finalMyEsimData = myEsimData || myEsimToUnblock;

      if (!finalMyEsimData) {
        console.error(`MyEsim with ID ${myEsim_id} not found`);
        return;
      }

      if (myEsimIndex !== -1) {
        state.groupData.lists.splice(myEsimIndex, 1);
        state.groupData.meta.totalItems = Math.max(
          0,
          state.groupData.meta.totalItems - 1
        );
      }

      Object.keys(state.groupData.cache).forEach((key) => {
        state.groupData.cache[key].data = state.groupData.cache[
          key
        ].data.filter(
          (myEsim) =>
            !(
              myEsim._id === myEsim_id ||
              myEsim.myEsim_user_id === myEsim_id ||
              myEsim.id === myEsim_id
            )
        );
      });

      const regularMyEsim = { ...finalMyEsimData, status: "regular" };
      state.regularData.lists.unshift(regularMyEsim);
      state.regularData.meta.totalItems += 1;

      const regularCacheKey = generateCacheKey(1, state.regularData.filters);
      if (state.regularData.cache[regularCacheKey]) {
        state.regularData.cache[regularCacheKey].data.unshift(regularMyEsim);
        if (
          state.regularData.cache[regularCacheKey].data.length >
          state.regularData.meta.pageSize
        ) {
          state.regularData.cache[regularCacheKey].data.pop();
        }
      }

      if (
        (state.singleMyEsim._id === myEsim_id ||
          state.singleMyEsim.myEsim_user_id === myEsim_id ||
          state.singleMyEsim.id === myEsim_id) &&
        state.singleMyEsim.status !== "regular"
      ) {
        state.singleMyEsim = { ...state.singleMyEsim, status: "regular" };
      }
    },

    addNewMyEsim: (state, action) => {
      const newMyEsim = action.payload;
      const targetData =
        newMyEsim.status === "regular" ? state.regularData : state.groupData;

      const { currentPage, pageSize, totalItems, totalPages } = targetData.meta;
      const { filters } = targetData;

      const updatedPages = {};
      let itemToPushDown = newMyEsim;

      const filterStr = `${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;

      for (
        let pageNum = 1;
        pageNum <= Math.max(totalPages, currentPage) + 1;
        pageNum++
      ) {
        const cacheKey = `${pageNum}_${filterStr}`;
        const currentItems = targetData.cache[cacheKey]?.data || [];

        if (pageNum === 1) {
          updatedPages[cacheKey] = [itemToPushDown, ...currentItems];

          if (updatedPages[cacheKey].length > pageSize) {
            itemToPushDown = updatedPages[cacheKey].pop();
          } else {
            itemToPushDown = null;
          }
        } else if (itemToPushDown) {
          updatedPages[cacheKey] = [itemToPushDown, ...currentItems];

          if (updatedPages[cacheKey].length > pageSize) {
            itemToPushDown = updatedPages[cacheKey].pop();
          } else {
            itemToPushDown = null;
          }
        } else if (currentItems.length > 0) {
          updatedPages[cacheKey] = [...currentItems];
        }
      }

      Object.keys(updatedPages).forEach((key) => {
        targetData.cache[key] = {
          data: updatedPages[key],
          meta: targetData.cache[key]?.meta || {},
          timestamp: Date.now(),
        };
      });

      const currentCacheKey = `${currentPage}_${filterStr}`;
      targetData.lists = targetData.cache[currentCacheKey]?.data || [];

      targetData.meta.totalItems = totalItems + 1;
      const newTotalPages = Math.ceil((totalItems + 1) / pageSize);
      targetData.meta.totalPages = newTotalPages;

      if (!targetData.lists.length && currentPage > newTotalPages) {
        targetData.meta.currentPage = newTotalPages;
        const newCacheKey = `${newTotalPages}_${filterStr}`;
        targetData.lists = targetData.cache[newCacheKey]?.data || [];
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

    setReplacementMyEsimId: (state, action) => {
      state.replacementMyEsimId = action.payload;
    },


    closeBlockSuccessModal: (state) => {
      state.showBlockSuccessModal = false;
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

    openQrModal: (state) => {
      state.showQrModal = true;
      state.showRemoveModal = false;
    },

    closeQrModal: (state) => {
      state.showQrModal = false;
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
  updateMyEsim,
  blockMyEsim,
  unblockMyEsim,
  addNewMyEsim,
  setMyEsimSelectedData,
  setSuccessModal,
  clearSuccessModal,
  openReassignModal,
  closeReassignModal,
  setReplacementMyEsimId,
  openBlockSuccessModal,
  closeBlockSuccessModal,
  openRemoveModal,
  closeRemoveModal,
  openQrModal,
  closeQrModal,
} = myEsimSlice.actions;

export default myEsimSlice.reducer;
