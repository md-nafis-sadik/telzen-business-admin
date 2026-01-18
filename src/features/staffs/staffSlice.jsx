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
  },

  singleStaff: {},
  selectedData: {},
  successModal: {
    show: false,
    type: "", // 'block', 'unblock', 'add', 'update', 'delete'
  },
  showBlockModal: false,
  selectedStaffForBlock: null,

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

      if (search !== undefined) {
        state.staffData.search = search;
      }
    },

    updateStaffSearch: (state, action) => {
      state.staffData.search = action.payload;
    },

    updateStaffPage: (state, action) => {
      state.staffData.meta.currentPage = action.payload;
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
          status: "blocked",
        };
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
          status: "active",
        };
      }

      if (
        state.singleStaff._id === staff_id ||
        state.singleStaff.staff_user_id === staff_id ||
        state.singleStaff.id === staff_id
      ) {
        state.singleStaff = { ...state.singleStaff, status: "active" };
      }
    },

    addNewStaff: (state, action) => {
      const newStaff = action.payload;
      state.staffData.lists.unshift(newStaff);
      state.staffData.meta.totalItems += 1;
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
    },

    setStaffSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },

    setSuccessModal: (state, action) => {
      state.successModal = {
        show: action.payload.show || true,
        type: action.payload.type || "",
      };
    },

    clearSuccessModal: (state) => {
      state.successModal = {
        show: false,
        type: "",
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

    resetStaffState: () => initialState,
  },
});

export const {
  setStaff,
  updateStaffSearch,
  updateStaffPage,
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
  resetStaffState,
} = staffSlice.actions;

export default staffSlice.reducer;
