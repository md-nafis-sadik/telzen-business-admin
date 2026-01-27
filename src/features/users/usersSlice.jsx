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
    cache: {},
    filterChangeId: 0,
  },

  // Active Group Users
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
    cache: {},
    filterChangeId: 0,
  },

  // Group Members Data
  groupMembersData: {
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

const generateCacheKey = (page, search, groupId = null) => {
  if (groupId) {
    return `${page}_${search}_${groupId}`;
  }
  return `${page}_${search}`;
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

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.activeRegularData.search;
      const cacheKey = generateCacheKey(meta?.page || 1, currentSearch || "");
      state.activeRegularData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.activeRegularData.search = search;
      }
    },

    updateActiveRegularSearch: (state, action) => {
      state.activeRegularData.search = action.payload;
      state.activeRegularData.filterChangeId += 1;
      state.activeRegularData.cache = {};
    },

    updateActiveRegularPage: (state, action) => {
      state.activeRegularData.meta.currentPage = action.payload;
    },

    updateActiveRegularPageSize: (state, action) => {
      state.activeRegularData.meta.pageSize = action.payload;
      state.activeRegularData.meta.currentPage = 1;
      state.activeRegularData.filterChangeId += 1;
      state.activeRegularData.cache = {};
    },

    // Active Group Users
    setGroupUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.groupData.lists = data || [];
      state.groupData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.groupData.search;
      const cacheKey = generateCacheKey(meta?.page || 1, currentSearch || "");
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

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.blockedRegularData.search;
      const cacheKey = generateCacheKey(meta?.page || 1, currentSearch || "");
      state.blockedRegularData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.blockedRegularData.search = search;
      }
    },

    updateBlockedRegularSearch: (state, action) => {
      state.blockedRegularData.search = action.payload;
      state.blockedRegularData.filterChangeId += 1;
      state.blockedRegularData.cache = {};
    },

    updateBlockedRegularPage: (state, action) => {
      state.blockedRegularData.meta.currentPage = action.payload;
    },

    updateBlockedRegularPageSize: (state, action) => {
      state.blockedRegularData.meta.pageSize = action.payload;
      state.blockedRegularData.meta.currentPage = 1;
      state.blockedRegularData.filterChangeId += 1;
      state.blockedRegularData.cache = {};
    },

    // Group Members Data
    setGroupMembers: (state, action) => {
      const { data, meta, search, groupId } = action.payload;

      state.groupMembersData.lists = data || [];
      state.groupMembersData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      // Use the current search state for cache key, not the incoming search parameter
      const currentSearch = search !== undefined ? search : state.groupMembersData.search;
      const cacheKey = generateCacheKey(meta?.page || 1, currentSearch || "", groupId);
      state.groupMembersData.cache[cacheKey] = {
        data: data || [],
        meta: meta || {},
        timestamp: Date.now(),
      };

      if (search !== undefined) {
        state.groupMembersData.search = search;
      }
    },

    updateGroupMembersSearch: (state, action) => {
      state.groupMembersData.search = action.payload;
      state.groupMembersData.filterChangeId += 1;
      state.groupMembersData.cache = {};
    },

    updateGroupMembersPage: (state, action) => {
      state.groupMembersData.meta.currentPage = action.payload;
    },

    updateGroupMembersPageSize: (state, action) => {
      state.groupMembersData.meta.pageSize = action.payload;
      state.groupMembersData.meta.currentPage = 1;
      state.groupMembersData.filterChangeId += 1;
      state.groupMembersData.cache = {};
    },

    resetGroupMembers: (state) => {
      state.groupMembersData = {
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
        // Find user in active lists or cache
        let user = state.activeRegularData.lists.find(u => u._id === userId);
        
        if (!user) {
          // Search in cache if not in current lists
          Object.keys(state.activeRegularData.cache).forEach((key) => {
            if (!user) {
              const cachedUser = state.activeRegularData.cache[key].data.find(u => u._id === userId);
              if (cachedUser) {
                user = cachedUser;
              }
            }
          });
        }

        if (user) {
          // Remove from active lists
          state.activeRegularData.lists = state.activeRegularData.lists.filter(u => u._id !== userId);
          
          // Remove from all active cache entries
          Object.keys(state.activeRegularData.cache).forEach((key) => {
            state.activeRegularData.cache[key].data = state.activeRegularData.cache[key].data.filter(
              u => u._id !== userId
            );
          });
          
          // Add to blocked lists
          state.blockedRegularData.lists.unshift({ ...user, is_blocked: true });
          
          // Add to first page of blocked cache if it exists
          const blockedFirstPageKey = generateCacheKey(1, state.blockedRegularData.search);
          if (state.blockedRegularData.cache[blockedFirstPageKey]) {
            state.blockedRegularData.cache[blockedFirstPageKey].data.unshift({ ...user, is_blocked: true });
            // Remove last item if exceeds page size
            if (state.blockedRegularData.cache[blockedFirstPageKey].data.length > state.blockedRegularData.meta.pageSize) {
              state.blockedRegularData.cache[blockedFirstPageKey].data.pop();
            }
          }
          
          // Update meta
          state.activeRegularData.meta.totalItems = Math.max(0, state.activeRegularData.meta.totalItems - 1);
          state.blockedRegularData.meta.totalItems += 1;
          
          // Recalculate total pages
          state.activeRegularData.meta.totalPages = Math.max(1, Math.ceil(state.activeRegularData.meta.totalItems / state.activeRegularData.meta.pageSize));
          state.blockedRegularData.meta.totalPages = Math.ceil(state.blockedRegularData.meta.totalItems / state.blockedRegularData.meta.pageSize);
          
          // Adjust current page if current page is now empty and not page 1
          if (state.activeRegularData.lists.length === 0 && state.activeRegularData.meta.currentPage > 1) {
            const newPage = Math.min(state.activeRegularData.meta.currentPage, state.activeRegularData.meta.totalPages);
            state.activeRegularData.meta.currentPage = Math.max(1, newPage);
          }
        }
      } else {
        // Remove from blocked and add to active
        let user = state.blockedRegularData.lists.find(u => u._id === userId);
        
        if (!user) {
          // Search in cache if not in current lists
          Object.keys(state.blockedRegularData.cache).forEach((key) => {
            if (!user) {
              const cachedUser = state.blockedRegularData.cache[key].data.find(u => u._id === userId);
              if (cachedUser) {
                user = cachedUser;
              }
            }
          });
        }

        if (user) {
          // Remove from blocked lists
          state.blockedRegularData.lists = state.blockedRegularData.lists.filter(u => u._id !== userId);
          
          // Remove from all blocked cache entries
          Object.keys(state.blockedRegularData.cache).forEach((key) => {
            state.blockedRegularData.cache[key].data = state.blockedRegularData.cache[key].data.filter(
              u => u._id !== userId
            );
          });
          
          // Add to active lists
          state.activeRegularData.lists.unshift({ ...user, is_blocked: false });
          
          // Add to first page of active cache if it exists
          const activeFirstPageKey = generateCacheKey(1, state.activeRegularData.search);
          if (state.activeRegularData.cache[activeFirstPageKey]) {
            state.activeRegularData.cache[activeFirstPageKey].data.unshift({ ...user, is_blocked: false });
            // Remove last item if exceeds page size
            if (state.activeRegularData.cache[activeFirstPageKey].data.length > state.activeRegularData.meta.pageSize) {
              state.activeRegularData.cache[activeFirstPageKey].data.pop();
            }
          }
          
          // Update meta
          state.blockedRegularData.meta.totalItems = Math.max(0, state.blockedRegularData.meta.totalItems - 1);
          state.activeRegularData.meta.totalItems += 1;
          
          // Recalculate total pages
          state.blockedRegularData.meta.totalPages = Math.max(1, Math.ceil(state.blockedRegularData.meta.totalItems / state.blockedRegularData.meta.pageSize));
          state.activeRegularData.meta.totalPages = Math.ceil(state.activeRegularData.meta.totalItems / state.activeRegularData.meta.pageSize);
          
          // Adjust current page if current page is now empty and not page 1
          if (state.blockedRegularData.lists.length === 0 && state.blockedRegularData.meta.currentPage > 1) {
            const newPage = Math.min(state.blockedRegularData.meta.currentPage, state.blockedRegularData.meta.totalPages);
            state.blockedRegularData.meta.currentPage = Math.max(1, newPage);
          }
        }
      }
    },

    // Remove group from lists
    removeGroupFromLists: (state, action) => {
      const { groupId } = action.payload;

      // Remove from current lists
      state.groupData.lists = state.groupData.lists.filter(g => g._id !== groupId);
      
      // Remove from all cache entries
      Object.keys(state.groupData.cache).forEach((key) => {
        state.groupData.cache[key].data = state.groupData.cache[key].data.filter(
          g => g._id !== groupId
        );
      });
      
      // Update meta
      state.groupData.meta.totalItems = Math.max(0, state.groupData.meta.totalItems - 1);
      state.groupData.meta.totalPages = Math.max(1, Math.ceil(state.groupData.meta.totalItems / state.groupData.meta.pageSize));

      // Adjust current page if current page is now empty and not page 1
      if (state.groupData.lists.length === 0 && state.groupData.meta.currentPage > 1) {
        const newPage = Math.min(state.groupData.meta.currentPage, state.groupData.meta.totalPages);
        state.groupData.meta.currentPage = Math.max(1, newPage);
      }
    },

    // Remove member from group members list
    removeMemberFromGroup: (state, action) => {
      const { memberId } = action.payload;
      
      // Remove from current lists
      state.groupMembersData.lists = state.groupMembersData.lists.filter(m => m._id !== memberId);
      
      // Remove from all cache entries
      Object.keys(state.groupMembersData.cache).forEach((key) => {
        state.groupMembersData.cache[key].data = state.groupMembersData.cache[key].data.filter(
          m => m._id !== memberId
        );
      });
      
      // Update meta
      state.groupMembersData.meta.totalItems = Math.max(0, state.groupMembersData.meta.totalItems - 1);
      state.groupMembersData.meta.totalPages = Math.max(1, Math.ceil(state.groupMembersData.meta.totalItems / state.groupMembersData.meta.pageSize));
      
      // Adjust current page if current page is now empty and not page 1
      if (state.groupMembersData.lists.length === 0 && state.groupMembersData.meta.currentPage > 1) {
        const newPage = Math.min(state.groupMembersData.meta.currentPage, state.groupMembersData.meta.totalPages);
        state.groupMembersData.meta.currentPage = Math.max(1, newPage);
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
  updateActiveRegularPageSize,
  setGroupUsers,
  updateGroupSearch,
  updateGroupPage,
  updateGroupPageSize,
  setBlockedRegularUsers,
  updateBlockedRegularSearch,
  updateBlockedRegularPage,
  updateBlockedRegularPageSize,
  setGroupMembers,
  updateGroupMembersSearch,
  updateGroupMembersPage,
  updateGroupMembersPageSize,
  resetGroupMembers,
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
  removeMemberFromGroup,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;