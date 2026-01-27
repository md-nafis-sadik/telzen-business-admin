import {
  useGetRegularMyEsimQuery,
  useGetGroupMyEsimQuery,
  useGetGroupEsimDetailsQuery,
} from "@/features/myEsim/myEsimApi";
import {
  updateRegularSearch,
  updateRegularPage,
  updateRegularPageSize,
  updateGroupSearch,
  updateGroupPage,
  updateGroupPageSize,
  updateGroupDetailsSearch,
  updateGroupDetailsPage,
  updateGroupDetailsPageSize,
  openQrModal,
  openRemoveModal,
  setLoadingInvoiceId,
} from "@/features/myEsim/myEsimSlice";
import {
  errorNotify,
  formatInvoiceData,
  generateInvoicePDF,
  images,
} from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "./useDebounce";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const generateCacheKey = (page, search) => {
  return `${page}_${search}`;
};

export const useRegularMyEsims = () => {
  const dispatch = useDispatch();
  const { regularData, loadingInvoiceId } = useSelector(
    (state) => state.myEsim,
  );

  const { lists, meta, search, cache, filterChangeId } = regularData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetRegularMyEsimQuery(
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
    dispatch(updateRegularPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateRegularPageSize(newPageSize));
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateRegularSearch(value));
    dispatch(updateRegularPage(1));
  };

  const handleOpenQrModal = (myEsim) => {
    dispatch(openQrModal(myEsim));
  };

  const handleOpenRemoveModal = (myEsim) => {
    dispatch(openRemoveModal(myEsim));
  };

  const handleDownloadInvoice = async (myEsim) => {
    try {
      dispatch(setLoadingInvoiceId(myEsim._id));
      const invoiceData = formatInvoiceData(myEsim);

      const companyInfo = {
        name: "Kloud Apps LLC",
        address1: "254 Chapman Rd, Suite 101-B, Newark,",
        address2: "DE 19702",
        email: "support@telzen.net",
        businessName: "Business Name",
        businessEmail: "Business Email",
      };

      const result = await generateInvoicePDF(
        invoiceData,
        images,
        companyInfo,
        errorNotify,
      );

      if (result.success) {
        console.log("Invoice generated successfully");
      }
    } catch (error) {
      console.error("Error in handleDownloadInvoice:", error);
      errorNotify("Failed to generate invoice");
    } finally {
      dispatch(setLoadingInvoiceId(null));
    }
  };

  return {
    myEsims: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    regularSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
    handleOpenQrModal,
    handleOpenRemoveModal,
    handleDownloadInvoice,
    loadingInvoiceId,
  };
};

export const useGroupMyEsims = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { groupData, loadingInvoiceId } = useSelector((state) => state.myEsim);

  const { lists, meta, search, cache, filterChangeId } = groupData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetGroupMyEsimQuery(
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

  const handleOpenQrModal = (myEsim) => {
    dispatch(openQrModal(myEsim));
  };

  const handleOpenRemoveModal = (myEsim) => {
    dispatch(openRemoveModal(myEsim));
  };
  const handleViewDetails = (groupId) => {
    navigate(`/admin/my-esim/group/${groupId}`);
  };

  const handleDownloadInvoice = async (myEsim) => {
    try {
      dispatch(setLoadingInvoiceId(myEsim._id));
      const invoiceData = formatInvoiceData(myEsim);

      const companyInfo = {
        name: "Kloud Apps LLC",
        address1: "254 Chapman Rd, Suite 101-B, Newark,",
        address2: "DE 19702",
        email: "support@telzen.net",
        businessName: "Business Name",
        businessEmail: "Business Email",
      };

      const result = await generateInvoicePDF(
        invoiceData,
        images,
        companyInfo,
        errorNotify,
      );

      if (result.success) {
        console.log("Invoice generated successfully");
      }
    } catch (error) {
      console.error("Error in handleDownloadInvoice:", error);
      errorNotify("Failed to generate invoice");
    } finally {
      dispatch(setLoadingInvoiceId(null));
    }
  };

  return {
    myEsims: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    groupSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
    handleOpenQrModal,
    handleOpenRemoveModal,
    handleDownloadInvoice,
    loadingInvoiceId,
    handleViewDetails,
  };
};

export const useGroupEsimDetails = (groupId) => {
  const dispatch = useDispatch();
  const { groupDetailsData, loadingInvoiceId } = useSelector(
    (state) => state.myEsim,
  );

  const { lists, meta, search, cache, filterChangeId } = groupDetailsData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetGroupEsimDetailsQuery(
    {
      group_id: groupId,
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
    dispatch(updateGroupDetailsPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateGroupDetailsPageSize(newPageSize));
    }
  };

  const handleSearchChange = (value) => {
    dispatch(updateGroupDetailsSearch(value));
    dispatch(updateGroupDetailsPage(1));
  };

  const handleOpenQrModal = (myEsim) => {
    dispatch(openQrModal(myEsim));
  };

  const handleOpenRemoveModal = (myEsim) => {
    dispatch(openRemoveModal(myEsim));
  };

  const handleDownloadInvoice = async (myEsim) => {
    try {
      dispatch(setLoadingInvoiceId(myEsim._id));
      const invoiceData = formatInvoiceData(myEsim);

      const companyInfo = {
        name: "Kloud Apps LLC",
        address1: "254 Chapman Rd, Suite 101-B, Newark,",
        address2: "DE 19702",
        email: "support@telzen.net",
        businessName: "Business Name",
        businessEmail: "Business Email",
      };

      const result = await generateInvoicePDF(
        invoiceData,
        images,
        companyInfo,
        errorNotify,
      );

      if (result.success) {
        console.log("Invoice generated successfully");
      }
    } catch (error) {
      console.error("Error in handleDownloadInvoice:", error);
      errorNotify("Failed to generate invoice");
    } finally {
      dispatch(setLoadingInvoiceId(null));
    }
  };

  return {
    myEsims: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    groupDetailsSearch: search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    handleSearchChange,
    updatePage: handlePageChange,
    handleOpenQrModal,
    handleOpenRemoveModal,
    handleDownloadInvoice,
    loadingInvoiceId,
  };
};
