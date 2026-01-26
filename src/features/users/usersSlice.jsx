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

  // Modal States
  showBlockModal: false,
  showUnblockModal: false,
  showDeleteGroupModal: false,

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
        pageSize: meta?.limit || 10,
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
        pageSize: meta?.limit || 10,
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
        pageSize: meta?.limit || 10,
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
        pageSize: meta?.limit || 10,
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

    // Modal Actions
    openBlockModal: (state, action) => {
      state.showBlockModal = true;
      state.selectedData = action.payload;
    },

    closeBlockModal: (state) => {
      state.showBlockModal = false;
      state.selectedData = {};
    },

    openUnblockModal: (state, action) => {
      state.showUnblockModal = true;
      state.selectedData = action.payload;
    },

    closeUnblockModal: (state) => {
      state.showUnblockModal = false;
      state.selectedData = {};
    },

    openDeleteGroupModal: (state, action) => {
      state.showDeleteGroupModal = true;
      state.selectedData = action.payload;
    },

    closeDeleteGroupModal: (state) => {
      state.showDeleteGroupModal = false;
      state.selectedData = {};
    },

    // Transfer user from active to blocked or vice versa
    transferUserBetweenLists: (state, action) => {
      const { userId, toBlocked } = action.payload;

      if (toBlocked) {
        // Remove from active and add to blocked
        const user = state.activeRegularData.lists.find(u => u._id === userId);
        if (user) {
          state.activeRegularData.lists = state.activeRegularData.lists.filter(u => u._id !== userId);
          state.blockedRegularData.lists.unshift({ ...user, is_blocked: true });
          
          // Update meta
          state.activeRegularData.meta.totalItems = Math.max(0, state.activeRegularData.meta.totalItems - 1);
          state.blockedRegularData.meta.totalItems += 1;
          
          // Recalculate total pages
          state.activeRegularData.meta.totalPages = Math.max(1, Math.ceil(state.activeRegularData.meta.totalItems / state.activeRegularData.meta.pageSize));
          state.blockedRegularData.meta.totalPages = Math.ceil(state.blockedRegularData.meta.totalItems / state.blockedRegularData.meta.pageSize);
          
          // Adjust current page if needed
          if (state.activeRegularData.lists.length === 0 && state.activeRegularData.meta.currentPage > 1) {
            state.activeRegularData.meta.currentPage = Math.max(1, state.activeRegularData.meta.currentPage - 1);
          }
        }
      } else {
        // Remove from blocked and add to active
        const user = state.blockedRegularData.lists.find(u => u._id === userId);
        if (user) {
          state.blockedRegularData.lists = state.blockedRegularData.lists.filter(u => u._id !== userId);
          state.activeRegularData.lists.unshift({ ...user, is_blocked: false });
          
          // Update meta
          state.blockedRegularData.meta.totalItems = Math.max(0, state.blockedRegularData.meta.totalItems - 1);
          state.activeRegularData.meta.totalItems += 1;
          
          // Recalculate total pages
          state.blockedRegularData.meta.totalPages = Math.max(1, Math.ceil(state.blockedRegularData.meta.totalItems / state.blockedRegularData.meta.pageSize));
          state.activeRegularData.meta.totalPages = Math.ceil(state.activeRegularData.meta.totalItems / state.activeRegularData.meta.pageSize);
          
          // Adjust current page if needed
          if (state.blockedRegularData.lists.length === 0 && state.blockedRegularData.meta.currentPage > 1) {
            state.blockedRegularData.meta.currentPage = Math.max(1, state.blockedRegularData.meta.currentPage - 1);
          }
        }
      }
    },

    // Remove group from lists
    removeGroupFromLists: (state, action) => {
      const { groupId, isBlocked } = action.payload;

      if (isBlocked) {
        // Remove from blocked groups
        state.blockedGroupData.lists = state.blockedGroupData.lists.filter(g => g._id !== groupId);
        state.blockedGroupData.meta.totalItems = Math.max(0, state.blockedGroupData.meta.totalItems - 1);
        state.blockedGroupData.meta.totalPages = Math.max(1, Math.ceil(state.blockedGroupData.meta.totalItems / state.blockedGroupData.meta.pageSize));
        
        // Adjust current page if needed
        if (state.blockedGroupData.lists.length === 0 && state.blockedGroupData.meta.currentPage > 1) {
          state.blockedGroupData.meta.currentPage = Math.max(1, state.blockedGroupData.meta.currentPage - 1);
        }
      } else {
        // Remove from active groups
        state.activeGroupData.lists = state.activeGroupData.lists.filter(g => g._id !== groupId);
        state.activeGroupData.meta.totalItems = Math.max(0, state.activeGroupData.meta.totalItems - 1);
        state.activeGroupData.meta.totalPages = Math.max(1, Math.ceil(state.activeGroupData.meta.totalItems / state.activeGroupData.meta.pageSize));
        
        // Adjust current page if needed
        if (state.activeGroupData.lists.length === 0 && state.activeGroupData.meta.currentPage > 1) {
          state.activeGroupData.meta.currentPage = Math.max(1, state.activeGroupData.meta.currentPage - 1);
        }
      }
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
  openBlockModal,
  closeBlockModal,
  openUnblockModal,
  closeUnblockModal,
  openDeleteGroupModal,
  closeDeleteGroupModal,
  transferUserBetweenLists,
  removeGroupFromLists,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
