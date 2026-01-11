import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Active Regular Users
  activeRegularData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
  },

  // Active Group Users
  activeGroupData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
  },

  // Blocked Regular Users
  blockedRegularData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
  },

  // Blocked Group Users
  blockedGroupData: {
    lists: [],
    meta: {
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10,
    },
    search: "",
  },

  // Single user/group details
  singleUser: {},
  selectedData: {},
  
  // Active tab state
  activeTab: "regular", // 'regular' or 'group'
  blockedTab: "regular", // 'regular' or 'group'
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Active Regular Users
    setActiveRegularUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.activeRegularData.lists = data || [];
      state.activeRegularData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      if (search !== undefined) {
        state.activeRegularData.search = search;
      }
    },

    updateActiveRegularSearch: (state, action) => {
      state.activeRegularData.search = action.payload;
    },

    updateActiveRegularPage: (state, action) => {
      state.activeRegularData.meta.currentPage = action.payload;
    },

    // Active Group Users
    setActiveGroupUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.activeGroupData.lists = data || [];
      state.activeGroupData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      if (search !== undefined) {
        state.activeGroupData.search = search;
      }
    },

    updateActiveGroupSearch: (state, action) => {
      state.activeGroupData.search = action.payload;
    },

    updateActiveGroupPage: (state, action) => {
      state.activeGroupData.meta.currentPage = action.payload;
    },

    // Blocked Regular Users
    setBlockedRegularUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.blockedRegularData.lists = data || [];
      state.blockedRegularData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      if (search !== undefined) {
        state.blockedRegularData.search = search;
      }
    },

    updateBlockedRegularSearch: (state, action) => {
      state.blockedRegularData.search = action.payload;
    },

    updateBlockedRegularPage: (state, action) => {
      state.blockedRegularData.meta.currentPage = action.payload;
    },

    // Blocked Group Users
    setBlockedGroupUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.blockedGroupData.lists = data || [];
      state.blockedGroupData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      if (search !== undefined) {
        state.blockedGroupData.search = search;
      }
    },

    updateBlockedGroupSearch: (state, action) => {
      state.blockedGroupData.search = action.payload;
    },

    updateBlockedGroupPage: (state, action) => {
      state.blockedGroupData.meta.currentPage = action.payload;
    },

    // Single User Details
    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },

    // Tab Management
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    setBlockedTab: (state, action) => {
      state.blockedTab = action.payload;
    },

    // Selected Data
    setUserSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },

    // Reset All
    resetUsersState: () => initialState,
  },
});

export const {
  setActiveRegularUsers,
  updateActiveRegularSearch,
  updateActiveRegularPage,
  setActiveGroupUsers,
  updateActiveGroupSearch,
  updateActiveGroupPage,
  setBlockedRegularUsers,
  updateBlockedRegularSearch,
  updateBlockedRegularPage,
  setBlockedGroupUsers,
  updateBlockedGroupSearch,
  updateBlockedGroupPage,
  setSingleUser,
  setActiveTab,
  setBlockedTab,
  setUserSelectedData,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
