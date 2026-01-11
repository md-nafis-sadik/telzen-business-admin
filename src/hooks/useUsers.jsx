import {
  useGetActiveRegularUsersQuery,
  useGetActiveGroupUsersQuery,
  useGetBlockedRegularUsersQuery,
  useGetBlockedGroupUsersQuery,
  useGetUserDetailsQuery,
  useGetGroupMembersQuery,
  useGetUserEsimBundlesQuery,
} from "@/features/users/usersApi";
import {
  updateActiveRegularSearch,
  updateActiveRegularPage,
  updateActiveGroupSearch,
  updateActiveGroupPage,
  updateBlockedRegularSearch,
  updateBlockedRegularPage,
  updateBlockedGroupSearch,
  updateBlockedGroupPage,
  setActiveTab,
  setBlockedTab,
} from "@/features/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useState } from "react";

// Hook for Active Regular Users
export const useActiveRegularUsers = () => {
  const dispatch = useDispatch();
  const { activeRegularData } = useSelector((state) => state.users);

  const { lists, meta, search } = activeRegularData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isError, error } = useGetActiveRegularUsersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
    },
    {
      skip: false,
    }
  );

  const isTyping = search !== debouncedSearch;
  const displayData = data?.data || lists;

  const handlePageChange = (page) => {
    dispatch(updateActiveRegularPage(page.current_page));
  };

  const handleSearchChange = (value) => {
    dispatch(updateActiveRegularSearch(value));
    dispatch(updateActiveRegularPage(1));
  };

  return {
    users: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    per_page: pageSize,
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

// Hook for Active Group Users
export const useActiveGroupUsers = () => {
  const dispatch = useDispatch();
  const { activeGroupData } = useSelector((state) => state.users);

  const { lists, meta, search } = activeGroupData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isError, error } = useGetActiveGroupUsersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
    },
    {
      skip: false,
    }
  );

  const isTyping = search !== debouncedSearch;
  const displayData = data?.data || lists;

  const handlePageChange = (page) => {
    dispatch(updateActiveGroupPage(page.current_page));
  };

  const handleSearchChange = (value) => {
    dispatch(updateActiveGroupSearch(value));
    dispatch(updateActiveGroupPage(1));
  };

  return {
    groups: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    per_page: pageSize,
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

  const { lists, meta, search } = blockedRegularData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isError, error } = useGetBlockedRegularUsersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
    },
    {
      skip: false,
    }
  );

  const isTyping = search !== debouncedSearch;
  const displayData = data?.data || lists;

  const handlePageChange = (page) => {
    dispatch(updateBlockedRegularPage(page.current_page));
  };

  const handleSearchChange = (value) => {
    dispatch(updateBlockedRegularSearch(value));
    dispatch(updateBlockedRegularPage(1));
  };

  return {
    users: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    blockedSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
  };
};

// Hook for Blocked Group Users
export const useBlockedGroupUsers = () => {
  const dispatch = useDispatch();
  const { blockedGroupData } = useSelector((state) => state.users);

  const { lists, meta, search } = blockedGroupData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const { data, isFetching, isError, error } = useGetBlockedGroupUsersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      search: debouncedSearch,
    },
    {
      skip: false,
    }
  );

  const isTyping = search !== debouncedSearch;
  const displayData = data?.data || lists;

  const handlePageChange = (page) => {
    dispatch(updateBlockedGroupPage(page.current_page));
  };

  const handleSearchChange = (value) => {
    dispatch(updateBlockedGroupSearch(value));
    dispatch(updateBlockedGroupPage(1));
  };

  return {
    groups: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    blockedSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
  };
};

// Hook for User Details Page
export const useUserDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleUser = useSelector((state) => state.users.singleUser);

  const { data, isFetching, isError, error, isLoading } = useGetUserDetailsQuery(id, {
    skip: !id,
  });

  const [esimPage, setEsimPage] = useState(1);
  const {
    data: esimBundlesData,
    isFetching: isFetchingEsims,
    isError: isEsimError,
  } = useGetUserEsimBundlesQuery(
    { userId: id, current_page: esimPage, per_page: 10 },
    { skip: !id }
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
  const [page, setPage] = useState(1);

  const { data, isFetching, isError, error } = useGetGroupMembersQuery(
    { groupId, current_page: page, per_page: 10 },
    { skip: !groupId }
  );

  return {
    members: data?.data || [],
    meta: data?.meta || {},
    isFetching,
    isError,
    error,
    page,
    setPage,
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
