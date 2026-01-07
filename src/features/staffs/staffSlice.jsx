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

  singleStaff: {},
  selectedData: {},
  showSuccessModal: false,
  successMessage: "",
  showReassignModal: false,
  showBlockSuccessModal: false,
  selectedStaffForBlock: null,
  replacementStaffId: "",

  roleOptions: [
    { id: "manager", label: "Manager" },
    { id: "admin", label: "Admin" },
    { id: "employee", label: "Employee" },
  ],

  statusOptions: [
    { id: "active", label: "Active" },
    { id: "blocked", label: "Blocked" },
  ],
};

const generateCacheKey = (page, filters) => {
  return `${page}_${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;
};

const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    setActiveStaff: (state, action) => {
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

    setBlockedStaff: (state, action) => {
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

    setSingleStaff: (state, action) => {
      state.singleStaff = action.payload;
    },

    updateSingleStaff: (state, action) => {
      state.singleStaff = {
        ...state.singleStaff,
        ...action.payload,
      };
    },

    updateStaff: (state, action) => {
      const { staff_id, data } = action.payload;
      const updatedStaff = { ...data, _id: staff_id };

      const updateInArray = (array) => {
        return array.map((staff) =>
          staff._id === staff_id ? { ...staff, ...updatedStaff } : staff
        );
      };

      const updateInCache = (cache) => {
        Object.keys(cache).forEach((key) => {
          cache[key].data = updateInArray(cache[key].data);
        });
      };

      state.activeData.lists = updateInArray(state.activeData.lists);
      updateInCache(state.activeData.cache);

      state.blockedData.lists = updateInArray(state.blockedData.lists);
      updateInCache(state.blockedData.cache);

      if (state.singleStaff._id === staff_id) {
        state.singleStaff = { ...state.singleStaff, ...updatedStaff };
      }
    },

    blockStaff: (state, action) => {
      const { staff_id, staffData } = action.payload;

      if (!staff_id) {
        console.error("No staff ID provided for block operation");
        return;
      }

      let staffToBlock = null;
      let staffIndex = -1;

      staffIndex = state.activeData.lists.findIndex(
        (staff) =>
          staff._id === staff_id ||
          staff.staff_user_id === staff_id ||
          staff.id === staff_id
      );

      if (staffIndex !== -1) {
        staffToBlock = state.activeData.lists[staffIndex];
      }

      if (!staffToBlock) {
        Object.keys(state.activeData.cache).forEach((key) => {
          if (!staffToBlock) {
            const cachedStaff = state.activeData.cache[key].data.find(
              (staff) =>
                staff._id === staff_id ||
                staff.staff_user_id === staff_id ||
                staff.id === staff_id
            );
            if (cachedStaff) {
              staffToBlock = cachedStaff;
            }
          }
        });
      }

      const finalStaffData = staffData || staffToBlock;

      if (!finalStaffData) {
        console.error(`Staff with ID ${staff_id} not found`);
        return;
      }

      if (staffIndex !== -1) {
        state.activeData.lists.splice(staffIndex, 1);
        state.activeData.meta.totalItems = Math.max(
          0,
          state.activeData.meta.totalItems - 1
        );
      }

      Object.keys(state.activeData.cache).forEach((key) => {
        state.activeData.cache[key].data = state.activeData.cache[
          key
        ].data.filter(
          (staff) =>
            !(
              staff._id === staff_id ||
              staff.staff_user_id === staff_id ||
              staff.id === staff_id
            )
        );
      });

      const blockedStaff = { ...finalStaffData, status: "blocked" };
      state.blockedData.lists.unshift(blockedStaff);
      state.blockedData.meta.totalItems += 1;

      const blockedCacheKey = generateCacheKey(1, state.blockedData.filters);
      if (state.blockedData.cache[blockedCacheKey]) {
        state.blockedData.cache[blockedCacheKey].data.unshift(blockedStaff);
        if (
          state.blockedData.cache[blockedCacheKey].data.length >
          state.blockedData.meta.pageSize
        ) {
          state.blockedData.cache[blockedCacheKey].data.pop();
        }
      }

      if (
        (state.singleStaff._id === staff_id ||
          state.singleStaff.staff_user_id === staff_id ||
          state.singleStaff.id === staff_id) &&
        state.singleStaff.status !== "blocked"
      ) {
        state.singleStaff = { ...state.singleStaff, status: "blocked" };
      }
    },

    unblockStaff: (state, action) => {
      const { staff_id, staffData } = action.payload;

      if (!staff_id) {
        console.error("No staff ID provided for unblock operation");
        return;
      }

      let staffToUnblock = null;
      let staffIndex = -1;

      staffIndex = state.blockedData.lists.findIndex(
        (staff) =>
          staff._id === staff_id ||
          staff.staff_user_id === staff_id ||
          staff.id === staff_id
      );

      if (staffIndex !== -1) {
        staffToUnblock = state.blockedData.lists[staffIndex];
      }

      if (!staffToUnblock) {
        Object.keys(state.blockedData.cache).forEach((key) => {
          if (!staffToUnblock) {
            const cachedStaff = state.blockedData.cache[key].data.find(
              (staff) =>
                staff._id === staff_id ||
                staff.staff_user_id === staff_id ||
                staff.id === staff_id
            );
            if (cachedStaff) {
              staffToUnblock = cachedStaff;
            }
          }
        });
      }

      const finalStaffData = staffData || staffToUnblock;

      if (!finalStaffData) {
        console.error(`Staff with ID ${staff_id} not found`);
        return;
      }

      if (staffIndex !== -1) {
        state.blockedData.lists.splice(staffIndex, 1);
        state.blockedData.meta.totalItems = Math.max(
          0,
          state.blockedData.meta.totalItems - 1
        );
      }

      Object.keys(state.blockedData.cache).forEach((key) => {
        state.blockedData.cache[key].data = state.blockedData.cache[
          key
        ].data.filter(
          (staff) =>
            !(
              staff._id === staff_id ||
              staff.staff_user_id === staff_id ||
              staff.id === staff_id
            )
        );
      });

      const activeStaff = { ...finalStaffData, status: "active" };
      state.activeData.lists.unshift(activeStaff);
      state.activeData.meta.totalItems += 1;

      const activeCacheKey = generateCacheKey(1, state.activeData.filters);
      if (state.activeData.cache[activeCacheKey]) {
        state.activeData.cache[activeCacheKey].data.unshift(activeStaff);
        if (
          state.activeData.cache[activeCacheKey].data.length >
          state.activeData.meta.pageSize
        ) {
          state.activeData.cache[activeCacheKey].data.pop();
        }
      }

      if (
        (state.singleStaff._id === staff_id ||
          state.singleStaff.staff_user_id === staff_id ||
          state.singleStaff.id === staff_id) &&
        state.singleStaff.status !== "active"
      ) {
        state.singleStaff = { ...state.singleStaff, status: "active" };
      }
    },

    addNewStaff: (state, action) => {
      const newStaff = action.payload;
      const targetData =
        newStaff.status === "active" ? state.activeData : state.blockedData;

      const { currentPage, pageSize, totalItems, totalPages } = targetData.meta;
      const { filters } = targetData;

      const updatedPages = {};
      let itemToPushDown = newStaff;

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

    clearActiveCache: (state) => {
      state.activeData.cache = {};
    },

    clearBlockedCache: (state) => {
      state.blockedData.cache = {};
    },

    setStaffSelectedData: (state, action) => {
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
      state.selectedStaffForBlock = action.payload;
      state.replacementStaffId = "";
    },

    closeReassignModal: (state) => {
      state.showReassignModal = false;
      state.selectedStaffForBlock = null;
      state.replacementStaffId = "";
    },

    setReplacementStaffId: (state, action) => {
      state.replacementStaffId = action.payload;
    },

    openBlockSuccessModal: (state) => {
      state.showBlockSuccessModal = true;
      state.showReassignModal = false;
    },

    closeBlockSuccessModal: (state) => {
      state.showBlockSuccessModal = false;
      state.selectedStaffForBlock = null;
      state.replacementStaffId = "";
    },
  },
});

export const {
  setActiveStaff,
  updateActiveFilters,
  updateActivePage,
  setBlockedStaff,
  updateBlockedFilters,
  updateBlockedPage,
  setSingleStaff,
  updateSingleStaff,
  updateStaff,
  blockStaff,
  unblockStaff,
  addNewStaff,
  clearActiveCache,
  clearBlockedCache,
  setStaffSelectedData,
  setSuccessModal,
  clearSuccessModal,
  openReassignModal,
  closeReassignModal,
  setReplacementStaffId,
  openBlockSuccessModal,
  closeBlockSuccessModal,
} = staffSlice.actions;

export default staffSlice.reducer;
