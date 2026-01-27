import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  staffData: {
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

  singleStaff: {},
  selectedData: {},
  successModal: {
    show: false,
    type: "", // 'block', 'unblock', 'add', 'update', 'delete'
    message: "",
  },
  showBlockModal: false,
  showUnblockModal: false,
  showDeleteModal: false,
  selectedStaffForBlock: null,
  selectedStaffForDelete: null,

  roleOptions: [
    { id: "manager", label: "Manager" },
    { id: "super-admin", label: "Admin" },
    { id: "employee", label: "Employee" },
  ],

  statusOptions: [
    { id: "active", label: "Active" },
    { id: "blocked", label: "Blocked" },
  ],
};

const generateCacheKey = (page, search) => {
  return `${page}_${search}`;
};

const staffSlice = createSlice({
  name: "staffs",
  initialState,
  reducers: {
    setStaff: (state, action) => {
      const { data, meta, search } = action.payload;

      state.staffData.lists = data || [];
      state.staffData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.limit || 10,
      };

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch =
        search !== undefined ? search : state.staffData.search;
      const cacheKey = generateCacheKey(meta?.page || 1, currentSearch || "");
      state.staffData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.staffData.search = search;
      }
    },

    updateStaffSearch: (state, action) => {
      state.staffData.search = action.payload;
      state.staffData.filterChangeId += 1;
      state.staffData.cache = {};
    },

    updateStaffPage: (state, action) => {
      state.staffData.meta.currentPage = action.payload;
    },

    updateStaffPageSize: (state, action) => {
      state.staffData.meta.pageSize = action.payload;
      state.staffData.meta.currentPage = 1;
      state.staffData.filterChangeId += 1;
      state.staffData.cache = {};
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

      const staffIndex = state.staffData.lists.findIndex(
        (staff) =>
          staff._id === staff_id ||
          staff.staff_user_id === staff_id ||
          staff.id === staff_id,
      );

      if (staffIndex !== -1) {
        state.staffData.lists[staffIndex] = {
          ...state.staffData.lists[staffIndex],
          ...updatedStaff,
        };
      }

      // Update in cache
      Object.keys(state.staffData.cache).forEach((key) => {
        const cacheStaffIndex = state.staffData.cache[key].data.findIndex(
          (staff) =>
            staff._id === staff_id ||
            staff.staff_user_id === staff_id ||
            staff.id === staff_id,
        );
        if (cacheStaffIndex !== -1) {
          state.staffData.cache[key].data[cacheStaffIndex] = {
            ...state.staffData.cache[key].data[cacheStaffIndex],
            ...updatedStaff,
          };
        }
      });

      if (
        state.singleStaff._id === staff_id ||
        state.singleStaff.staff_user_id === staff_id ||
        state.singleStaff.id === staff_id
      ) {
        state.singleStaff = { ...state.singleStaff, ...updatedStaff };
      }
    },

    blockStaff: (state, action) => {
      const { staff_id, staffData } = action.payload;

      const staffIndex = state.staffData.lists.findIndex(
        (staff) =>
          staff._id === staff_id ||
          staff.staff_user_id === staff_id ||
          staff.id === staff_id,
      );

      if (staffIndex !== -1) {
        state.staffData.lists[staffIndex] = {
          ...state.staffData.lists[staffIndex],
          is_blocked: true,
        };
      }

      // Update in cache
      Object.keys(state.staffData.cache).forEach((key) => {
        const cacheStaffIndex = state.staffData.cache[key].data.findIndex(
          (staff) =>
            staff._id === staff_id ||
            staff.staff_user_id === staff_id ||
            staff.id === staff_id,
        );
        if (cacheStaffIndex !== -1) {
          state.staffData.cache[key].data[cacheStaffIndex] = {
            ...state.staffData.cache[key].data[cacheStaffIndex],
            is_blocked: true,
          };
        }
      });

      if (
        state.singleStaff._id === staff_id ||
        state.singleStaff.staff_user_id === staff_id ||
        state.singleStaff.id === staff_id
      ) {
        state.singleStaff = { ...state.singleStaff, is_blocked: true };
      }
    },

    unblockStaff: (state, action) => {
      const { staff_id } = action.payload;

      const staffIndex = state.staffData.lists.findIndex(
        (staff) =>
          staff._id === staff_id ||
          staff.staff_user_id === staff_id ||
          staff.id === staff_id,
      );

      if (staffIndex !== -1) {
        state.staffData.lists[staffIndex] = {
          ...state.staffData.lists[staffIndex],
          is_blocked: false,
        };
      }

      // Update in cache
      Object.keys(state.staffData.cache).forEach((key) => {
        const cacheStaffIndex = state.staffData.cache[key].data.findIndex(
          (staff) =>
            staff._id === staff_id ||
            staff.staff_user_id === staff_id ||
            staff.id === staff_id,
        );
        if (cacheStaffIndex !== -1) {
          state.staffData.cache[key].data[cacheStaffIndex] = {
            ...state.staffData.cache[key].data[cacheStaffIndex],
            is_blocked: false,
          };
        }
      });

      if (
        state.singleStaff._id === staff_id ||
        state.singleStaff.staff_user_id === staff_id ||
        state.singleStaff.id === staff_id
      ) {
        state.singleStaff = { ...state.singleStaff, is_blocked: false };
      }
    },

    addNewStaff: (state, action) => {
      const newStaff = action.payload;
      state.staffData.lists.unshift(newStaff);
      state.staffData.meta.totalItems += 1;

      // Add to first page of cache if it exists
      const firstPageKey = generateCacheKey(1, state.staffData.search);
      if (state.staffData.cache[firstPageKey]) {
        state.staffData.cache[firstPageKey].data.unshift(newStaff);
        // Remove last item if exceeds page size
        if (
          state.staffData.cache[firstPageKey].data.length >
          state.staffData.meta.pageSize
        ) {
          state.staffData.cache[firstPageKey].data.pop();
        }
      }
    },

    deleteStaff: (state, action) => {
      const staff_id = action.payload;

      const staffIndex = state.staffData.lists.findIndex(
        (staff) =>
          staff._id === staff_id ||
          staff.staff_user_id === staff_id ||
          staff.id === staff_id,
      );

      if (staffIndex !== -1) {
        state.staffData.lists.splice(staffIndex, 1);
        state.staffData.meta.totalItems = Math.max(
          0,
          state.staffData.meta.totalItems - 1,
        );
      }

      // Remove from all cache entries
      Object.keys(state.staffData.cache).forEach((key) => {
        state.staffData.cache[key].data = state.staffData.cache[
          key
        ].data.filter(
          (staff) =>
            staff._id !== staff_id &&
            staff.staff_user_id !== staff_id &&
            staff.id !== staff_id,
        );
      });

      // Recalculate total pages
      state.staffData.meta.totalPages = Math.max(
        1,
        Math.ceil(
          state.staffData.meta.totalItems / state.staffData.meta.pageSize,
        ),
      );

      // Adjust current page if current page is now empty and not page 1
      if (
        state.staffData.lists.length === 0 &&
        state.staffData.meta.currentPage > 1
      ) {
        const newPage = Math.min(
          state.staffData.meta.currentPage,
          state.staffData.meta.totalPages,
        );
        state.staffData.meta.currentPage = Math.max(1, newPage);
      }
    },

    setStaffSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },

    setSuccessModal: (state, action) => {
      state.successModal = {
        show: action.payload.show ?? true,
        type: action.payload.type || "",
        message: action.payload.message || "",
      };
    },

    clearSuccessModal: (state) => {
      state.successModal = {
        show: false,
        type: "",
        message: "",
      };
    },

    openBlockModal: (state, action) => {
      state.showBlockModal = true;
      state.selectedStaffForBlock = action.payload;
    },

    closeBlockModal: (state) => {
      state.showBlockModal = false;
      state.selectedStaffForBlock = null;
    },

    openUnblockModal: (state, action) => {
      state.showUnblockModal = true;
      state.selectedStaffForBlock = action.payload;
    },

    closeUnblockModal: (state) => {
      state.showUnblockModal = false;
      state.selectedStaffForBlock = null;
    },

    openDeleteModal: (state, action) => {
      state.showDeleteModal = true;
      state.selectedStaffForDelete = action.payload;
    },

    closeDeleteModal: (state) => {
      state.showDeleteModal = false;
      state.selectedStaffForDelete = null;
    },

    resetStaffState: () => initialState,
  },
});

export const {
  setStaff,
  updateStaffSearch,
  updateStaffPage,
  updateStaffPageSize,
  setSingleStaff,
  updateSingleStaff,
  updateStaff,
  blockStaff,
  unblockStaff,
  addNewStaff,
  deleteStaff,
  setStaffSelectedData,
  setSuccessModal,
  clearSuccessModal,
  openBlockModal,
  closeBlockModal,
  openUnblockModal,
  closeUnblockModal,
  openDeleteModal,
  closeDeleteModal,
  resetStaffState,
} = staffSlice.actions;

export default staffSlice.reducer;
