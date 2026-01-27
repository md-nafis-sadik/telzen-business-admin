import {
  useGetActiveRegularUsersQuery,
  useGetGroupUsersQuery,
  useGetBlockedRegularUsersQuery,
  useGetUserDetailsQuery,
  useGetGroupMembersQuery,
  useGetUserEsimBundlesQuery,
  useUpdateCustomerBlockStatusMutation,
  useDeleteCustomerGroupMutation,
} from "@/features/users/usersApi";
import {
  updateActiveRegularSearch,
  updateActiveRegularPage,
  updateActiveRegularPageSize,
  updateGroupSearch,
  updateGroupPage,
  updateGroupPageSize,
  updateBlockedRegularSearch,
  updateBlockedRegularPage,
  updateBlockedRegularPageSize,
  updateGroupMembersSearch,
  updateGroupMembersPage,
  updateGroupMembersPageSize,
  resetGroupMembers,
  setActiveTab,
  setBlockedTab,
  openBlockModal,
  openUnblockModal,
  transferUserBetweenLists,
  closeBlockModal,
  closeDeleteGroupModal,
  closeUnblockModal,
  removeGroupFromLists,
} from "@/features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useState, useEffect } from "react";
import { errorNotify, successNotify } from "@/services";

const generateCacheKey = (page, search, groupId = null) => {
  if (groupId) {
    return `${page}_${search}_${groupId}`;
  }
  return `${page}_${search}`;
};

export const useActiveUsers = () => {
  const { currentTab } = useUserTabs("active");
  const dispatch = useDispatch();
  const { showBlockModal, showDeleteGroupModal, selectedData } = useSelector(
    (state) => state.users
  );

  const [updateCustomerBlockStatus, { isLoading: isBlockLoading }] =
    useUpdateCustomerBlockStatusMutation();
  const [deleteCustomerGroup, { isLoading: isDeleteLoading }] =
    useDeleteCustomerGroupMutation();

  const handleBlockConfirm = async () => {
    if (!selectedData?._id) return;

    try {
      const response = await updateCustomerBlockStatus({
        customer_id: selectedData._id,
        is_blocked: true,
      }).unwrap();

      dispatch(
        transferUserBetweenLists({
          userId: selectedData._id,
          toBlocked: true,
        })
      );

      dispatch(closeBlockModal());
      successNotify(response?.message || "User blocked successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to block user");
    }
  };

  const handleDeleteGroupConfirm = async () => {
    if (!selectedData?._id) return;

    try {
      const response = await deleteCustomerGroup({
        group_id: selectedData._id,
      }).unwrap();

      dispatch(
        removeGroupFromLists({
          groupId: selectedData._id,
          isBlocked: false,
        })
      );

      dispatch(closeDeleteGroupModal());
      successNotify(response?.message || "Group deleted successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete group");
    }
  };

  return {
    currentTab,
    isBlockLoading,
    isDeleteLoading,
    showBlockModal,
    handleBlockConfirm,
    showDeleteGroupModal,
    handleDeleteGroupConfirm,
    dispatch,
  };
};

export const useBlockedUsers = () => {
  const { currentTab } = useUserTabs("blocked");
  const dispatch = useDispatch();
  const { showUnblockModal, showDeleteGroupModal, selectedData } = useSelector(
    (state) => state.users
  );

  const [updateCustomerBlockStatus, { isLoading: isUnblockLoading }] =
    useUpdateCustomerBlockStatusMutation();
  const [deleteCustomerGroup, { isLoading: isDeleteLoading }] =
    useDeleteCustomerGroupMutation();

  const handleUnblockConfirm = async () => {
    if (!selectedData?._id) return;

    try {
      const response = await updateCustomerBlockStatus({
        customer_id: selectedData._id,
        is_blocked: false,
      }).unwrap();

      dispatch(
        transferUserBetweenLists({
          userId: selectedData._id,
          toBlocked: false,
        })
      );

      dispatch(closeUnblockModal());
      successNotify(response?.message || "User unblocked successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to unblock user");
    }
  };

  const handleDeleteGroupConfirm = async () => {
    if (!selectedData?._id) return;

    try {
      const response = await deleteCustomerGroup({
        group_id: selectedData._id,
      }).unwrap();

      dispatch(
        removeGroupFromLists({
          groupId: selectedData._id,
          isBlocked: true,
        })
      );

      dispatch(closeDeleteGroupModal());
      successNotify(response?.message || "Group deleted successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete group");
    }
  };

  return {
    currentTab,
    isUnblockLoading,
    isDeleteLoading,
    handleUnblockConfirm,
    showUnblockModal,
    showDeleteGroupModal,
    handleDeleteGroupConfirm,
    dispatch,
  };
};


export const useActiveRegularUsers = () => {
  const dispatch = useDispatch();
  const { activeRegularData } = useSelector((state) => state.users);

  const { lists, meta, search, cache, filterChangeId } = activeRegularData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetActiveRegularUsersQuery(
    {
      current_page: currentPage,
      limit: pageSize,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
      skip: false,
    },
  );

  const isTyping = search !== debouncedSearch;
  const displayData = cachedData?.data || lists || [];

  const handlePageChange = (page) => {
    dispatch(updateActiveRegularPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateActiveRegularPageSize(newPageSize));
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateActiveRegularSearch(value));
    dispatch(updateActiveRegularPage(1));
  };

  const handleBlockClick = (user) => {
    dispatch(openBlockModal(user));
  };

  return {
    users: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    activeSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
    handleBlockClick,
  };
};

// Hook for Active Group Users
export const useGroupUsers = () => {
  const dispatch = useDispatch();
  const { groupData } = useSelector((state) => state.users);

  const { lists, meta, search, cache, filterChangeId } = groupData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetGroupUsersQuery(
    {
      current_page: currentPage,
      limit: pageSize,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
      skip: false,
    },
  );

  const isTyping = search !== debouncedSearch;
  const displayData = cachedData?.data || lists || [];

  const handlePageChange = (page) => {
    dispatch(updateGroupPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateGroupPageSize(newPageSize));
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateGroupSearch(value));
    dispatch(updateGroupPage(1));
  };

  return {
    groups: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    activeSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
  };
};

// Hook for Blocked Regular Users
export const useBlockedRegularUsers = () => {
  const dispatch = useDispatch();
  const { blockedRegularData } = useSelector((state) => state.users);

  const { lists, meta, search, cache, filterChangeId } = blockedRegularData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetBlockedRegularUsersQuery(
    {
      current_page: currentPage,
      limit: pageSize,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
      skip: false,
    },
  );

  const isTyping = search !== debouncedSearch;
  const displayData = cachedData?.data || lists || [];

  const handlePageChange = (page) => {
    dispatch(updateBlockedRegularPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateBlockedRegularPageSize(newPageSize));
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateBlockedRegularSearch(value));
    dispatch(updateBlockedRegularPage(1));
  };

  const handleUnblockClick = (user) => {
    dispatch(openUnblockModal(user));
  };

  return {
    users: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    blockedSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
    handleUnblockClick,
  };
};


// Hook for User Details Page
export const useUserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.users.singleUser);

  const { data, isFetching, isError, error, isLoading } =
    useGetUserDetailsQuery(id, {
      skip: !id,
    });

  const [esimPage, setEsimPage] = useState(1);
  const {
    data: esimBundlesData,
    isFetching: isFetchingEsims,
    isError: isEsimError,
  } = useGetUserEsimBundlesQuery(
    { userId: id, current_page: esimPage, limit: 10 },
    { skip: !id },
  );

  return {
    user: singleUser,
    esimBundles: esimBundlesData?.data || [],
    esimMeta: esimBundlesData?.meta || {},
    isFetching,
    isFetchingEsims,
    isLoading,
    isError,
    isEsimError,
    error,
    esimPage,
    setEsimPage,
  };
};

// Hook for Group Members
export const useGroupMembers = (groupId) => {
  const dispatch = useDispatch();
  const { groupMembersData } = useSelector((state) => state.users);

  const { lists, meta, search, cache, filterChangeId } = groupMembersData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch, groupId);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetGroupMembersQuery(
    {
      groupId,
      current_page: currentPage,
      limit: pageSize,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      skip: !groupId,
      refetchOnMountOrArgChange: false,
    },
  );

  const isTyping = search !== debouncedSearch;
  const displayData = cachedData?.data || lists || [];

  const handlePageChange = (page) => {
    dispatch(updateGroupMembersPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateGroupMembersPageSize(newPageSize));
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateGroupMembersSearch(value));
    dispatch(updateGroupMembersPage(1));
  };

  return {
    members: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
  };
};

// Hook for Tab Management
export const useUserTabs = (type = "active") => {
  const dispatch = useDispatch();
  const { activeTab, blockedTab } = useSelector((state) => state.users);

  const currentTab = type === "active" ? activeTab : blockedTab;

  const handleTabChange = (tab) => {
    if (type === "active") {
      dispatch(setActiveTab(tab));
    } else {
      dispatch(setBlockedTab(tab));
    }
  };

  return {
    currentTab,
    handleTabChange,
  };
};