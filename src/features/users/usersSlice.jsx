import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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

  singleUser: {},
  selectedData: {},

  successModal: {
    show: false,
    type: "", // 'addCustomer', 'bulkCustomer', 'addGroup', 'updateGroup'
    message: "",
  },

  showBlockModal: false,
  showUnblockModal: false,
  showDeleteGroupModal: false,

  activeTab: "regular",
  blockedTab: "regular",
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

      const currentSearch =
        search !== undefined ? search : state.activeRegularData.search;
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

    setGroupUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.groupData.lists = data || [];
      state.groupData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const currentSearch =
        search !== undefined ? search : state.groupData.search;
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

    setBlockedRegularUsers: (state, action) => {
      const { data, meta, search } = action.payload;

      state.blockedRegularData.lists = data || [];
      state.blockedRegularData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const currentSearch =
        search !== undefined ? search : state.blockedRegularData.search;
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

    setGroupMembers: (state, action) => {
      const { data, meta, search, groupId } = action.payload;

      state.groupMembersData.lists = data || [];
      state.groupMembersData.meta = {
        totalItems: meta?.total || 0,
        totalPages: meta?.last_page || 1,
        currentPage: meta?.page || 1,
        pageSize: meta?.per_page || 10,
      };

      const currentSearch =
        search !== undefined ? search : state.groupMembersData.search;
      const cacheKey = generateCacheKey(
        meta?.page || 1,
        currentSearch || "",
        groupId,
      );
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

    setSingleUser: (state, action) => {
      state.singleUser = action.payload;
    },

    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    setBlockedTab: (state, action) => {
      state.blockedTab = action.payload;
    },

    setUserSelectedData: (state, action) => {
      state.selectedData = action.payload;
    },

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

    transferUserBetweenLists: (state, action) => {
      const { userId, toBlocked } = action.payload;

      if (toBlocked) {
        let user = state.activeRegularData.lists.find((u) => u._id === userId);

        if (!user) {
          Object.keys(state.activeRegularData.cache).forEach((key) => {
            if (!user) {
              const cachedUser = state.activeRegularData.cache[key].data.find(
                (u) => u._id === userId,
              );
              if (cachedUser) {
                user = cachedUser;
              }
            }
          });
        }

        if (user) {
          state.activeRegularData.lists = state.activeRegularData.lists.filter(
            (u) => u._id !== userId,
          );

          Object.keys(state.activeRegularData.cache).forEach((key) => {
            state.activeRegularData.cache[key].data =
              state.activeRegularData.cache[key].data.filter(
                (u) => u._id !== userId,
              );
          });

          state.blockedRegularData.lists.unshift({ ...user, is_blocked: true });

          const blockedFirstPageKey = generateCacheKey(
            1,
            state.blockedRegularData.search,
          );
          if (state.blockedRegularData.cache[blockedFirstPageKey]) {
            state.blockedRegularData.cache[blockedFirstPageKey].data.unshift({
              ...user,
              is_blocked: true,
            });

            if (
              state.blockedRegularData.cache[blockedFirstPageKey].data.length >
              state.blockedRegularData.meta.pageSize
            ) {
              state.blockedRegularData.cache[blockedFirstPageKey].data.pop();
            }
          }

          state.activeRegularData.meta.totalItems = Math.max(
            0,
            state.activeRegularData.meta.totalItems - 1,
          );
          state.blockedRegularData.meta.totalItems += 1;

          state.activeRegularData.meta.totalPages = Math.max(
            1,
            Math.ceil(
              state.activeRegularData.meta.totalItems /
                state.activeRegularData.meta.pageSize,
            ),
          );
          state.blockedRegularData.meta.totalPages = Math.ceil(
            state.blockedRegularData.meta.totalItems /
              state.blockedRegularData.meta.pageSize,
          );

          if (
            state.activeRegularData.lists.length === 0 &&
            state.activeRegularData.meta.currentPage > 1
          ) {
            const newPage = Math.min(
              state.activeRegularData.meta.currentPage,
              state.activeRegularData.meta.totalPages,
            );
            state.activeRegularData.meta.currentPage = Math.max(1, newPage);
          }
        }
      } else {
        let user = state.blockedRegularData.lists.find((u) => u._id === userId);

        if (!user) {
          Object.keys(state.blockedRegularData.cache).forEach((key) => {
            if (!user) {
              const cachedUser = state.blockedRegularData.cache[key].data.find(
                (u) => u._id === userId,
              );
              if (cachedUser) {
                user = cachedUser;
              }
            }
          });
        }

        if (user) {
          state.blockedRegularData.lists =
            state.blockedRegularData.lists.filter((u) => u._id !== userId);

          Object.keys(state.blockedRegularData.cache).forEach((key) => {
            state.blockedRegularData.cache[key].data =
              state.blockedRegularData.cache[key].data.filter(
                (u) => u._id !== userId,
              );
          });

          state.activeRegularData.lists.unshift({ ...user, is_blocked: false });

          const activeFirstPageKey = generateCacheKey(
            1,
            state.activeRegularData.search,
          );
          if (state.activeRegularData.cache[activeFirstPageKey]) {
            state.activeRegularData.cache[activeFirstPageKey].data.unshift({
              ...user,
              is_blocked: false,
            });

            if (
              state.activeRegularData.cache[activeFirstPageKey].data.length >
              state.activeRegularData.meta.pageSize
            ) {
              state.activeRegularData.cache[activeFirstPageKey].data.pop();
            }
          }

          state.blockedRegularData.meta.totalItems = Math.max(
            0,
            state.blockedRegularData.meta.totalItems - 1,
          );
          state.activeRegularData.meta.totalItems += 1;

          state.blockedRegularData.meta.totalPages = Math.max(
            1,
            Math.ceil(
              state.blockedRegularData.meta.totalItems /
                state.blockedRegularData.meta.pageSize,
            ),
          );
          state.activeRegularData.meta.totalPages = Math.ceil(
            state.activeRegularData.meta.totalItems /
              state.activeRegularData.meta.pageSize,
          );

          if (
            state.blockedRegularData.lists.length === 0 &&
            state.blockedRegularData.meta.currentPage > 1
          ) {
            const newPage = Math.min(
              state.blockedRegularData.meta.currentPage,
              state.blockedRegularData.meta.totalPages,
            );
            state.blockedRegularData.meta.currentPage = Math.max(1, newPage);
          }
        }
      }
    },

    removeGroupFromLists: (state, action) => {
      const { groupId } = action.payload;

      state.groupData.lists = state.groupData.lists.filter(
        (g) => g._id !== groupId,
      );

      Object.keys(state.groupData.cache).forEach((key) => {
        state.groupData.cache[key].data = state.groupData.cache[
          key
        ].data.filter((g) => g._id !== groupId);
      });

      state.groupData.meta.totalItems = Math.max(
        0,
        state.groupData.meta.totalItems - 1,
      );
      state.groupData.meta.totalPages = Math.max(
        1,
        Math.ceil(
          state.groupData.meta.totalItems / state.groupData.meta.pageSize,
        ),
      );

      if (
        state.groupData.lists.length === 0 &&
        state.groupData.meta.currentPage > 1
      ) {
        const newPage = Math.min(
          state.groupData.meta.currentPage,
          state.groupData.meta.totalPages,
        );
        state.groupData.meta.currentPage = Math.max(1, newPage);
      }
    },

    addNewGroup: (state, action) => {
      const newGroup = action.payload;
      state.groupData.lists.unshift(newGroup);
      state.groupData.meta.totalItems += 1;

      // Add to first page of cache if it exists
      const firstPageKey = generateCacheKey(1, state.groupData.search);
      if (state.groupData.cache[firstPageKey]) {
        state.groupData.cache[firstPageKey].data.unshift(newGroup);
        // Remove last item if exceeds page size
        if (
          state.groupData.cache[firstPageKey].data.length >
          state.groupData.meta.pageSize
        ) {
          state.groupData.cache[firstPageKey].data.pop();
        }
      }

      // Recalculate total pages
      state.groupData.meta.totalPages = Math.ceil(
        state.groupData.meta.totalItems / state.groupData.meta.pageSize,
      );
    },

    updateGroupData: (state, action) => {
      const { group_id, data } = action.payload;
      const updatedGroup = { ...data, _id: group_id };

      const groupIndex = state.groupData.lists.findIndex(
        (group) => group._id === group_id,
      );

      if (groupIndex !== -1) {
        state.groupData.lists[groupIndex] = {
          ...state.groupData.lists[groupIndex],
          ...updatedGroup,
        };
      }

      // Update in cache
      Object.keys(state.groupData.cache).forEach((key) => {
        const cacheGroupIndex = state.groupData.cache[key].data.findIndex(
          (group) => group._id === group_id,
        );
        if (cacheGroupIndex !== -1) {
          state.groupData.cache[key].data[cacheGroupIndex] = {
            ...state.groupData.cache[key].data[cacheGroupIndex],
            ...updatedGroup,
          };
        }
      });
    },

    addNewCustomer: (state, action) => {
      const newCustomer = action.payload;
      state.activeRegularData.lists.unshift(newCustomer);
      state.activeRegularData.meta.totalItems += 1;

      // Add to first page of cache if it exists
      const firstPageKey = generateCacheKey(1, state.activeRegularData.search);
      if (state.activeRegularData.cache[firstPageKey]) {
        state.activeRegularData.cache[firstPageKey].data.unshift(newCustomer);
        // Remove last item if exceeds page size
        if (
          state.activeRegularData.cache[firstPageKey].data.length >
          state.activeRegularData.meta.pageSize
        ) {
          state.activeRegularData.cache[firstPageKey].data.pop();
        }
      }

      // Recalculate total pages
      state.activeRegularData.meta.totalPages = Math.ceil(
        state.activeRegularData.meta.totalItems / state.activeRegularData.meta.pageSize,
      );
    },

    updateCustomerData: (state, action) => {
      const { customer_id, data } = action.payload;
      const updatedCustomer = { ...data, _id: customer_id };

      // Update in active regular list
      const activeIndex = state.activeRegularData.lists.findIndex(
        (customer) => customer._id === customer_id,
      );

      if (activeIndex !== -1) {
        state.activeRegularData.lists[activeIndex] = {
          ...state.activeRegularData.lists[activeIndex],
          ...updatedCustomer,
        };
      }

      // Update in active regular cache
      Object.keys(state.activeRegularData.cache).forEach((key) => {
        const cacheCustomerIndex = state.activeRegularData.cache[key].data.findIndex(
          (customer) => customer._id === customer_id,
        );
        if (cacheCustomerIndex !== -1) {
          state.activeRegularData.cache[key].data[cacheCustomerIndex] = {
            ...state.activeRegularData.cache[key].data[cacheCustomerIndex],
            ...updatedCustomer,
          };
        }
      });

      // Also check blocked list
      const blockedIndex = state.blockedRegularData.lists.findIndex(
        (customer) => customer._id === customer_id,
      );

      if (blockedIndex !== -1) {
        state.blockedRegularData.lists[blockedIndex] = {
          ...state.blockedRegularData.lists[blockedIndex],
          ...updatedCustomer,
        };
      }

      // Update in blocked cache
      Object.keys(state.blockedRegularData.cache).forEach((key) => {
        const cacheCustomerIndex = state.blockedRegularData.cache[key].data.findIndex(
          (customer) => customer._id === customer_id,
        );
        if (cacheCustomerIndex !== -1) {
          state.blockedRegularData.cache[key].data[cacheCustomerIndex] = {
            ...state.blockedRegularData.cache[key].data[cacheCustomerIndex],
            ...updatedCustomer,
          };
        }
      });
    },

    removeMemberFromGroup: (state, action) => {
      const { memberId } = action.payload;

      state.groupMembersData.lists = state.groupMembersData.lists.filter(
        (m) => m._id !== memberId,
      );

      Object.keys(state.groupMembersData.cache).forEach((key) => {
        state.groupMembersData.cache[key].data = state.groupMembersData.cache[
          key
        ].data.filter((m) => m._id !== memberId);
      });

      state.groupMembersData.meta.totalItems = Math.max(
        0,
        state.groupMembersData.meta.totalItems - 1,
      );
      state.groupMembersData.meta.totalPages = Math.max(
        1,
        Math.ceil(
          state.groupMembersData.meta.totalItems /
            state.groupMembersData.meta.pageSize,
        ),
      );

      if (
        state.groupMembersData.lists.length === 0 &&
        state.groupMembersData.meta.currentPage > 1
      ) {
        const newPage = Math.min(
          state.groupMembersData.meta.currentPage,
          state.groupMembersData.meta.totalPages,
        );
        state.groupMembersData.meta.currentPage = Math.max(1, newPage);
      }
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
  addNewGroup,
  updateGroupData,
  addNewCustomer,
  updateCustomerData,
  removeMemberFromGroup,
  setSuccessModal,
  clearSuccessModal,
  resetUsersState,
} = usersSlice.actions;

export default usersSlice.reducer;
