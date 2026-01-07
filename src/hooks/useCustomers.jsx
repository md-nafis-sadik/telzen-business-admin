import {
  useBlockCustomerMutation,
  useGetActiveCustomersQuery,
  useGetBlockedCustomersQuery,
  useGetCustomerDetailsQuery,
  useGetCustomerOderDetailsQuery,
  useGetPendingCustomersQuery,
  useGetRejectedCustomersQuery,
  useUnblockCustomerMutation,
  useApproveCustomerMutation,
  useRejectCustomerMutation,
} from "@/features/customers/customerApi";
import { setOrderPageData } from "@/features/customers/customerDetailsSlice";
import {
  updateActiveFilters,
  updateActivePage,
  updateBlockedFilters,
  updateBlockedPage,
  updatePendingFilters,
  updatePendingPage,
  updateRejectedFilters,
  updateRejectedPage,
  setCustomerSelectedData,
} from "@/features/customers/customerSlice";
import {
  toggleDeleteModal,
  toggleDetailsModal,
} from "@/features/shared/sharedSlice";
import { exportCustomersToExcel } from "@/lib/utils";
import { errorNotify, infoNotify, successNotify } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useDebounce } from "./useDebounce";

const generateCacheKey = (page, filters) => {
  return `${page}_${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;
};

export const useActiveCustomers = () => {
  const { activeData, selectedData } = useSelector((state) => state.customers);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);

  const { lists, meta, filters, cache, filterChangeId } = activeData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error, refetch } = useGetActiveCustomersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      filter: {
        division: currentFilters.division,
        district: currentFilters.district,
        upazila: currentFilters.upazila,
      },
      search: currentFilters.search,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [blockCustomer, { isLoading }] = useBlockCustomerMutation();

  const handlePageChange = (page) => {
    dispatch(updateActivePage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const blockConfirmHandler = async () => {
    dispatch(toggleDeleteModal(false));

    if (!selectedData?._id) {
      errorNotify("No customer selected");
      return;
    }

    try {
      const res = await blockCustomer({
        customer_id: selectedData._id,
      }).unwrap();

      if (res?.success) {
        infoNotify(res.message || "Customer blocked successfully");
      } else {
        errorNotify(res?.message || "Failed to block customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to block customer");
    }
  };

  const handleShowBlockModal = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDeleteModal(true));
  };

  const handleViewCustomer = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDetailsModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateActiveFilters({ search: value }));
    dispatch(updateActivePage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateActiveFilters(filterUpdate));
    dispatch(updateActivePage(1));
  };

  const handleExportToExcel = () => {
    try {
      const customersToExport = cachedData?.data || lists || [];
      if (customersToExport.length === 0) {
        infoNotify("No data available to export");
        return;
      }
      exportCustomersToExcel(customersToExport, "active");
      successNotify("Active customers exported successfully!");
    } catch (error) {
      errorNotify("Failed to export customers data");
    }
  };

  return {
    isFetching,
    isError,
    error,
    customers: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    activeSearch: filters.search,
    activeFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    blockConfirmHandler,
    isLoading,
    handleShowBlockModal,
    handleViewCustomer,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    handleExportToExcel,
  };
};

export const useBlockedCustomers = () => {
  const { blockedData, selectedData } = useSelector((state) => state.customers);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);

  const { lists, meta, filters, cache, filterChangeId } = blockedData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error, refetch } = useGetBlockedCustomersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      filter: {
        division: currentFilters.division,
        district: currentFilters.district,
        upazila: currentFilters.upazila,
      },
      search: currentFilters.search,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [unblockCustomer, { isLoading }] = useUnblockCustomerMutation();

  const handlePageChange = (page) => {
    dispatch(updateBlockedPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const unblockConfirmHandler = async () => {
    dispatch(toggleDeleteModal(false));

    if (!selectedData?._id) {
      errorNotify("No customer selected");
      return;
    }

    try {
      const res = await unblockCustomer({
        customer_id: selectedData._id,
      }).unwrap();

      if (res?.success) {
        infoNotify(res.message || "Customer unblocked successfully");
      } else {
        errorNotify(res?.message || "Failed to unblock customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to unblock customer");
    }
  };

  const handleShowUnblockModal = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDeleteModal(true));
  };

  const handleViewCustomer = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDetailsModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateBlockedFilters({ search: value }));
    dispatch(updateBlockedPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateBlockedFilters(filterUpdate));
    dispatch(updateBlockedPage(1));
  };

  const handleExportToExcel = () => {
    try {
      const customersToExport = cachedData?.data || lists || [];
      if (customersToExport.length === 0) {
        infoNotify("No data available to export");
        return;
      }
      exportCustomersToExcel(customersToExport, "blocked");
      successNotify("Blocked customers exported successfully!");
    } catch (error) {
      errorNotify("Failed to export customers data");
    }
  };

  return {
    isFetching,
    isError,
    error,
    customers: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    blockedSearch: filters.search,
    blockedFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    handleShowUnblockModal,
    handleViewCustomer,
    unblockConfirmHandler,
    isLoading,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    handleExportToExcel,
  };
};

export const usePendingCustomers = () => {
  const { pendingData, selectedData } = useSelector((state) => state.customers);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);

  const { lists, meta, filters, cache, filterChangeId } = pendingData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetPendingCustomersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      filter: {
        division: currentFilters.division,
        district: currentFilters.district,
        upazila: currentFilters.upazila,
      },
      search: currentFilters.search,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [blockCustomer, { isLoading }] = useBlockCustomerMutation();

  const handlePageChange = (page) => {
    dispatch(updatePendingPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const blockConfirmHandler = async () => {
    dispatch(toggleDeleteModal(false));

    if (!selectedData?._id) {
      errorNotify("No customer selected");
      return;
    }

    try {
      const res = await blockCustomer({
        customer_id: selectedData._id,
      }).unwrap();

      if (res?.success) {
        infoNotify(res.message || "Customer blocked successfully");
      } else {
        errorNotify(res?.message || "Failed to block customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to block customer");
    }
  };

  const handleShowBlockModal = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDeleteModal(true));
  };

  const handleViewCustomer = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDetailsModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updatePendingFilters({ search: value }));
    dispatch(updatePendingPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updatePendingFilters(filterUpdate));
    dispatch(updatePendingPage(1));
  };

  const handleExportToExcel = () => {
    try {
      const customersToExport = cachedData?.data || lists || [];
      if (customersToExport.length === 0) {
        infoNotify("No data available to export");
        return;
      }
      exportCustomersToExcel(customersToExport, "pending");
      successNotify("Pending customers exported successfully!");
    } catch (error) {
      errorNotify("Failed to export customers data");
    }
  };

  return {
    isFetching,
    isError,
    error,
    customers: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    pendingSearch: filters.search,
    pendingFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    blockConfirmHandler,
    isLoading,
    handleShowBlockModal,
    handleViewCustomer,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    handleExportToExcel,
  };
};

export const useRejectedCustomers = () => {
  const { rejectedData, selectedData } = useSelector(
    (state) => state.customers
  );

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);

  const { lists, meta, filters, cache, filterChangeId } = rejectedData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetRejectedCustomersQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      filter: {
        division: currentFilters.division,
        district: currentFilters.district,
        upazila: currentFilters.upazila,
      },
      search: currentFilters.search,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  const [blockCustomer, { isLoading }] = useBlockCustomerMutation();

  const handlePageChange = (page) => {
    dispatch(updateRejectedPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const blockConfirmHandler = async () => {
    dispatch(toggleDeleteModal(false));

    if (!selectedData?._id) {
      errorNotify("No customer selected");
      return;
    }

    try {
      const res = await blockCustomer({
        customer_id: selectedData._id,
      }).unwrap();

      if (res?.success) {
        infoNotify(res.message || "Customer blocked successfully");
      } else {
        errorNotify(res?.message || "Failed to block customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to block customer");
    }
  };

  const handleShowBlockModal = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDeleteModal(true));
  };

  const handleViewCustomer = (customer) => {
    dispatch(setCustomerSelectedData(customer));
    dispatch(toggleDetailsModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateRejectedFilters({ search: value }));
    dispatch(updateRejectedPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateRejectedFilters(filterUpdate));
    dispatch(updateRejectedPage(1));
  };

  const handleExportToExcel = () => {
    try {
      const customersToExport = cachedData?.data || lists || [];
      if (customersToExport.length === 0) {
        infoNotify("No data available to export");
        return;
      }
      exportCustomersToExcel(customersToExport, "rejected");
      successNotify("Rejected customers exported successfully!");
    } catch (error) {
      errorNotify("Failed to export customers data");
    }
  };

  return {
    isFetching,
    isError,
    error,
    customers: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    rejectedSearch: filters.search,
    rejectedFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    blockConfirmHandler,
    isLoading,
    handleShowBlockModal,
    handleViewCustomer,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    handleExportToExcel,
  };
};

export const useCustomerDetails = () => {
  const { id, slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    customerDetails: cachedCustomerDetails,
    orderDataLists,
    orderPageData,
    orderData,
  } = useSelector((state) => state.customerDetails);

  const { showDocument } = useSelector((state) => state.shared);

  const cacheKey = `page${orderPageData.currentPage}_${orderPageData.pageSize}`;
  const cachedOrderData = orderData[cacheKey];

  const {
    data: customerDetails = {},
    isFetching,
    isError,
    error,
    refetch,
  } = useGetCustomerDetailsQuery(
    { customer_id: id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: customerOrderDetails = {},
    isFetching: isFetchingOrder,
    isError: isErrorOrder,
    error: errorOrder,
    refetch: refetchOrder,
  } = useGetCustomerOderDetailsQuery(
    { 
      customer_id: id,
      current_page: orderPageData.currentPage,
      per_page: orderPageData.pageSize,
    },
    {
      skip: !id,
      refetchOnMountOrArgChange: false,
    }
  );

  const [approveCustomer, { isLoading: isApproving }] =
    useApproveCustomerMutation();
  const [rejectCustomer, { isLoading: isRejecting }] =
    useRejectCustomerMutation();
  const [blockCustomer, { isLoading: isBlocking }] = useBlockCustomerMutation();
  const [unblockCustomer, { isLoading: isUnblocking }] =
    useUnblockCustomerMutation();

  const handleApprove = async () => {
    try {
      const res = await approveCustomer({ customer_id: id }).unwrap();
      if (res?.success) {
        successNotify(res.message || "Customer approved successfully");
        refetch();
        navigate(`/admin/customers/active/details/${id}`, { replace: true });
      } else {
        errorNotify(res?.message || "Failed to approve customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to approve customer");
    }
  };

  const handleReject = async () => {
    try {
      const res = await rejectCustomer({ customer_id: id }).unwrap();
      if (res?.success) {
        infoNotify(res.message || "Customer rejected successfully");
        refetch();
        navigate(`/admin/customers/rejected/details/${id}`, { replace: true });
      } else {
        errorNotify(res?.message || "Failed to reject customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to reject customer");
    }
  };

  const handleBlock = async () => {
    try {
      const res = await blockCustomer({ customer_id: id }).unwrap();
      if (res?.success) {
        infoNotify(res.message || "Customer blocked successfully");
        refetch();
        navigate(`/admin/customers/blocked/details/${id}`, { replace: true });
      } else {
        errorNotify(res?.message || "Failed to block customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to block customer");
    }
  };

  const handleUnblock = async () => {
    try {
      const res = await unblockCustomer({ customer_id: id }).unwrap();
      if (res?.success) {
        successNotify(res.message || "Customer unblocked successfully");
        refetch();
        navigate(`/admin/customers/active/details/${id}`, { replace: true });
      } else {
        errorNotify(res?.message || "Failed to unblock customer");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to unblock customer");
    }
  };

  const handleOrdersPageChange = (page) => {
    dispatch(setOrderPageData({
      ...orderPageData,
      currentPage: page.current_page,
      hasPreviousPage: page.current_page > 1,
      hasNextPage: page.current_page < orderPageData.totalPages,
    }));
  };

  return {
    customerDetails: cachedCustomerDetails,
    customerOrderDetails: cachedOrderData || orderDataLists,
    isFetching,
    isError,
    showDocument,
    error,
    isFetchingOrder,
    isErrorOrder,
    errorOrder,
    refetch,
    orderPageData,
    handleOrdersPageChange,
    handleApprove,
    handleReject,
    handleBlock,
    handleUnblock,
    isApproving,
    isRejecting,
    isBlocking,
    isUnblocking,
  };
};
