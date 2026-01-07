import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetPendingOrdersQuery,
  useGetValidationOrdersQuery,
  useGetProcessingOrdersQuery,
  useGetCompletedOrdersQuery,
  useGetCancelledOrdersQuery,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
  useAssignStaffToOrderMutation,
  useUpdatePaymentStatusMutation,
  useGetOrderBrickTypesQuery,
} from "@/features/orders/ordersApi";
import { useGetStaffListQuery } from "@/features/staffs/staffApi";
import { useLocation } from "@/hooks/useLocation";
import { useState, useEffect, useMemo } from "react";
import {
  updatePendingPage,
  updateValidationPage,
  updateProcessingPage,
  updateCompletedPage,
  updateCancelledPage,
  setOrderSelectedData,
  updatePendingFilters,
  updateValidationFilters,
  updateProcessingFilters,
  updateCompletedFilters,
  updateCancelledFilters,
} from "@/features/orders/ordersSlice";
import {
  toggleDeleteModal,
  toggleSuccessModal,
} from "@/features/shared/sharedSlice";
import { BRICK_TYPE_OPTIONS, errorNotify, successNotify } from "@/services";
import { useDebounce } from "./useDebounce";

const generateCacheKey = (page, filters) => {
  return `${page}_${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;
};

export const usePendingOrders = () => {
  const { pendingData } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const [loadingStaff, setLoadingStaff] = useState({});

  const { lists, meta, filters, cache, filterChangeId } = pendingData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetPendingOrdersQuery(
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

  const { data: staffList = [], isLoading: isLoadingStaff } =
    useGetStaffListQuery();
  const [assignStaff] = useAssignStaffToOrderMutation();

  const handleStaffChange = async (staffId, orderId) => {
    setLoadingStaff((prev) => ({ ...prev, [orderId]: true }));
    try {
      await assignStaff({ order_id: orderId, staff_id: staffId }).unwrap();
      successNotify("Staff assigned successfully");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to assign staff");
    } finally {
      setLoadingStaff((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handlePageChange = (page) => {
    dispatch(updatePendingPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleShowActionModal = (order) => {
    dispatch(setOrderSelectedData(order));
    dispatch(toggleDeleteModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updatePendingFilters({ search: value }));
    dispatch(updatePendingPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updatePendingFilters(filterUpdate));
    dispatch(updatePendingPage(1));
  };

  return {
    isFetching,
    isError,
    error,
    orders: cachedData?.data || lists || [],
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
    handleShowActionModal,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    staffList,
    isLoadingStaff,
    loadingStaff,
    handleStaffChange,
  };
};

export const useValidationOrders = () => {
  const { validationData } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const [loadingStaff, setLoadingStaff] = useState({});
  const [loadingPayment, setLoadingPayment] = useState({});

  const { lists, meta, filters, cache, filterChangeId } = validationData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetValidationOrdersQuery(
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

  const { data: staffList = [], isLoading: isLoadingStaff } =
    useGetStaffListQuery();
  const [assignStaff] = useAssignStaffToOrderMutation();
  const [updatePaymentStatus] = useUpdatePaymentStatusMutation();

  const handleStaffChange = async (staffId, orderId) => {
    setLoadingStaff((prev) => ({ ...prev, [orderId]: true }));
    try {
      await assignStaff({ order_id: orderId, staff_id: staffId }).unwrap();
      successNotify("Staff assigned successfully");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to assign staff");
    } finally {
      setLoadingStaff((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handlePaymentStatusChange = async (status, orderId) => {
    setLoadingPayment((prev) => ({ ...prev, [orderId]: true }));
    try {
      await updatePaymentStatus({ order_id: orderId, status }).unwrap();
      successNotify("Payment status updated successfully");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to update payment status");
    } finally {
      setLoadingPayment((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handlePageChange = (page) => {
    dispatch(updateValidationPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleShowActionModal = (order) => {
    dispatch(setOrderSelectedData(order));
    dispatch(toggleDeleteModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateValidationFilters({ search: value }));
    dispatch(updateValidationPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateValidationFilters(filterUpdate));
    dispatch(updateValidationPage(1));
  };

  return {
    isFetching,
    isError,
    error,
    orders: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    validationSearch: filters.search,
    validationFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    handleShowActionModal,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    staffList,
    isLoadingStaff,
    loadingStaff,
    loadingPayment,
    handleStaffChange,
    handlePaymentStatusChange,
  };
};

export const useProcessingOrders = () => {
  const { processingData } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const [loadingStaff, setLoadingStaff] = useState({});

  const { lists, meta, filters, cache, filterChangeId } = processingData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetProcessingOrdersQuery(
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

  const { data: staffList = [], isLoading: isLoadingStaff } =
    useGetStaffListQuery();
  const [assignStaff] = useAssignStaffToOrderMutation();

  const handleStaffChange = async (staffId, orderId) => {
    setLoadingStaff((prev) => ({ ...prev, [orderId]: true }));
    try {
      await assignStaff({ order_id: orderId, staff_id: staffId }).unwrap();
      successNotify("Staff assigned successfully");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to assign staff");
    } finally {
      setLoadingStaff((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handlePageChange = (page) => {
    dispatch(updateProcessingPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleShowActionModal = (order) => {
    dispatch(setOrderSelectedData(order));
    dispatch(toggleDeleteModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateProcessingFilters({ search: value }));
    dispatch(updateProcessingPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateProcessingFilters(filterUpdate));
    dispatch(updateProcessingPage(1));
  };

  return {
    isFetching,
    isError,
    error,
    orders: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    processingSearch: filters.search,
    processingFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    handleShowActionModal,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    staffList,
    isLoadingStaff,
    loadingStaff,
    handleStaffChange,
  };
};

// Continuation of ordersHooks.js

export const useCompletedOrders = () => {
  const { completedData } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingStaff, setLoadingStaff] = useState({});

  const { lists, meta, filters, cache, filterChangeId } = completedData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetCompletedOrdersQuery(
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

  const { data: staffList = [], isLoading: isLoadingStaff } =
    useGetStaffListQuery();
  const [assignStaff] = useAssignStaffToOrderMutation();

  const handleStaffChange = async (staffId, orderId) => {
    setLoadingStaff((prev) => ({ ...prev, [orderId]: true }));
    try {
      await assignStaff({ order_id: orderId, staff_id: staffId }).unwrap();
      successNotify("Staff assigned successfully");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to assign staff");
    } finally {
      setLoadingStaff((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleImageClick = (order) => {
    setSelectedOrder(order);
    setSelectedImage(order.payment_slip);
  };

  const handlePageChange = (page) => {
    dispatch(updateCompletedPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleShowActionModal = (order) => {
    dispatch(setOrderSelectedData(order));
    dispatch(toggleDeleteModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateCompletedFilters({ search: value }));
    dispatch(updateCompletedPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateCompletedFilters(filterUpdate));
    dispatch(updateCompletedPage(1));
  };

  return {
    isFetching,
    isError,
    error,
    orders: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    completedSearch: filters.search,
    completedFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    handleShowActionModal,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    selectedImage,
    setSelectedImage,
    selectedOrder,
    setSelectedOrder,
    loadingStaff,
    setLoadingStaff,
    staffList,
    isLoadingStaff,
    assignStaff,
    handleStaffChange,
    handleImageClick,
  };
};

export const useCancelledOrders = () => {
  const { cancelledData } = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingStaff, setLoadingStaff] = useState({});

  const { lists, meta, filters, cache, filterChangeId } = cancelledData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetCancelledOrdersQuery(
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

  const handlePageChange = (page) => {
    dispatch(updateCancelledPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleShowActionModal = (order) => {
    dispatch(setOrderSelectedData(order));
    dispatch(toggleDeleteModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateCancelledFilters({ search: value }));
    dispatch(updateCancelledPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateCancelledFilters(filterUpdate));
    dispatch(updateCancelledPage(1));
  };

  const { data: staffList = [], isLoading: isLoadingStaff } =
    useGetStaffListQuery();
  const [assignStaff] = useAssignStaffToOrderMutation();

  const handleStaffChange = async (staffId, orderId) => {
    setLoadingStaff((prev) => ({ ...prev, [orderId]: true }));
    try {
      await assignStaff({ order_id: orderId, staff_id: staffId }).unwrap();
      successNotify("Staff assigned successfully");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to assign staff");
    } finally {
      setLoadingStaff((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  const handleImageClick = (order) => {
    setSelectedOrder(order);
    setSelectedImage(order.payment_slip);
  };

  return {
    isFetching,
    isError,
    error,
    orders: cachedData?.data || lists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    cancelledSearch: filters.search,
    cancelledFilter: {
      division: filters.division,
      district: filters.district,
      upazila: filters.upazila,
    },
    updatePage: handlePageChange,
    handleShowActionModal,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
    staffList,
    isLoadingStaff,
    handleStaffChange,
    handleImageClick,
    selectedImage,
    setSelectedImage,
    selectedOrder,
    setSelectedOrder,
    loadingStaff,
  };
};

export const useEditOrder = () => {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { singleOrder, statusOptions } = useSelector((state) => state.orders);

  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBrickType, setSelectedBrickType] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSubStatus, setSelectedSubStatus] = useState("");

  const [quantity, setQuantity] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [brickTypePrices, setBrickTypePrices] = useState({});

  const subStatusOptions = useMemo(() => {
    return (
      statusOptions?.find((s) => s.id === selectedStatus)?.sub_status || []
    );
  }, [statusOptions, selectedStatus]);

  const { data: brickTypesData = [], isLoading: isLoadingBrickTypes } =
    useGetOrderBrickTypesQuery(id, {
      skip: !id,
    });

  const {
    isFetching: upIsFetching,
    isError: upIsError,
    error: upError,
  } = useGetSingleOrderQuery(
    { order_id: id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const { data: staffListData = [], isLoading: isLoadingStaff } =
    useGetStaffListQuery();
  const [updateOrder, { isLoading }] = useUpdateOrderMutation();

  const {
    divisions,
    districts,
    upazilas,
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
  } = useLocation(selectedDivision, selectedDistrict);

  const staffList = staffListData;

  const brickTypeOptions = useMemo(() => {
    if (!brickTypesData.length) return BRICK_TYPE_OPTIONS;

    return brickTypesData.map((brick) => {
      const localOption = BRICK_TYPE_OPTIONS.find(
        (opt) => opt.value === brick.brick_type || opt.id === brick.brick_type
      );
      return {
        id: brick.brick_type,
        value: brick.brick_type,
        label: localOption?.label || brick.brick_type,
        unit_price: brick.unit_price,
      };
    });
  }, [brickTypesData]);

  useEffect(() => {
    if (brickTypesData.length > 0) {
      const prices = {};
      brickTypesData.forEach((brick) => {
        prices[brick.brick_type] = brick.unit_price;
      });
      setBrickTypePrices(prices);
    }
  }, [brickTypesData]);

  useEffect(() => {
    if (selectedBrickType && brickTypePrices[selectedBrickType]) {
      const calculatedTotal =
        brickTypePrices[selectedBrickType] * quantity + deliveryCharge;
      setTotalPrice(calculatedTotal);
    }
  }, [selectedBrickType, brickTypePrices, quantity, deliveryCharge]);

  useEffect(() => {
    if (singleOrder && Object.keys(singleOrder).length > 0) {
      if (singleOrder.brick_type) {
        setSelectedBrickType(singleOrder.brick_type);
      }
      if (singleOrder.staff) {
        setSelectedStaff(singleOrder.staff);
      }
      if (singleOrder.status) {
        setSelectedStatus(singleOrder.status);
      }
      if (singleOrder.sub_status) {
        setSelectedSubStatus(singleOrder.sub_status);
      }
      if (singleOrder.order_quantity) {
        setQuantity(singleOrder.order_quantity);
      }
      if (singleOrder.delivery_charge) {
        setDeliveryCharge(singleOrder.delivery_charge);
      }
      if (singleOrder.total_price) {
        setTotalPrice(singleOrder.total_price);
      }
    }
  }, [singleOrder]);

  useEffect(() => {
    if (selectedStatus && singleOrder?.status !== selectedStatus) {
      setSelectedSubStatus("");
    }
  }, [selectedStatus, singleOrder?.status]);

  useEffect(() => {
    if (singleOrder && Object.keys(singleOrder).length > 0) {
      if (singleOrder.brick_type && !selectedBrickType) {
        setSelectedBrickType(singleOrder.brick_type);
      }
      if (singleOrder.staff && !selectedStaff) {
        setSelectedStaff(singleOrder.staff);
      }
      if (singleOrder.status && !selectedStatus) {
        setSelectedStatus(singleOrder.status);
      }
      if (singleOrder.sub_status && !selectedSubStatus) {
        setSelectedSubStatus(singleOrder.sub_status);
      }
    }
  }, [
    singleOrder,
    selectedBrickType,
    selectedStaff,
    selectedStatus,
    selectedSubStatus,
  ]);

  useEffect(() => {
    if (singleOrder && divisions.length > 0 && !selectedDivision) {
      const div = divisions.find(
        (d) =>
          d.bn_name === singleOrder.division ||
          d.en_name === singleOrder.division
      );
      if (div) setSelectedDivision(div.id);
    }
  }, [singleOrder, divisions, selectedDivision]);

  useEffect(() => {
    if (singleOrder && districts.length > 0 && !selectedDistrict) {
      const dist = districts.find(
        (d) =>
          d.bn_name === singleOrder.district ||
          d.en_name === singleOrder.district
      );
      if (dist) setSelectedDistrict(dist.id);
    }
  }, [singleOrder, districts, selectedDistrict]);

  useEffect(() => {
    if (singleOrder && upazilas.length > 0 && !selectedUpazila) {
      const upa = upazilas.find(
        (u) =>
          u.bn_name === singleOrder.sub_district ||
          u.en_name === singleOrder.sub_district
      );
      if (upa) setSelectedUpazila(upa.id);
    }
  }, [singleOrder, upazilas, selectedUpazila]);

  const getBackPath = () => {
    const orderStatus = slug || singleOrder?.status || "pending";
    return `/admin/orders/${orderStatus}`;
  };

  const handleBrickTypeChange = (value) => {
    setSelectedBrickType(value);
  };

  const handleStaffChange = (value) => {
    setSelectedStaff(value);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
    setSelectedSubStatus("");
  };

  const handleSubStatusChange = (value) => {
    setSelectedSubStatus(value);
  };

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    setSelectedDistrict("");
    setSelectedUpazila("");
  };

  const handleDistrictChange = (value) => {
    setSelectedDistrict(value);
    setSelectedUpazila("");
  };

  const handleUpazilaChange = (value) => {
    setSelectedUpazila(value);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setQuantity(value);
  };

  const handleDeliveryChargeChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setDeliveryCharge(value);
  };

  const handleTotalPriceChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    setTotalPrice(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const divisionName =
      divisions.find((d) => d.id === selectedDivision)?.bn_name ||
      singleOrder?.division ||
      "";
    const districtName =
      districts.find((d) => d.id === selectedDistrict)?.bn_name ||
      singleOrder?.district ||
      "";
    const upazilaName =
      upazilas.find((u) => u.id === selectedUpazila)?.bn_name ||
      singleOrder?.sub_district ||
      "";

    const orderData = {
      product_name: formData.get("product_name"),
      brick_type: selectedBrickType,
      name: formData.get("name"),
      phone: formData.get("phone"),
      delivery_address: formData.get("delivery_address"),
      order_quantity: quantity,
      delivery_charge: deliveryCharge,
      total_price: totalPrice,
      staff: selectedStaff,
      division: divisionName,
      district: districtName,
      sub_district: upazilaName,
      status: selectedStatus,
      sub_status: selectedSubStatus,
      order_id: id,
    };

    try {
      await updateOrder(orderData).unwrap();
      dispatch(toggleSuccessModal(true));
      navigate(getBackPath());
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update order");
    }
  };

  const isEnabled =
    singleOrder?.status === "pending" ||
    (singleOrder?.status === "validation" &&
      singleOrder?.sub_status === "unpaid");

  return {
    upIsFetching,
    upIsError,
    upError,
    singleOrder,
    isLoading,
    handleSubmit,
    staffList,
    isLoadingStaff,
    statusOptions,
    getBackPath,
    divisions,
    districts,
    upazilas,
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedBrickType,
    selectedStaff,
    selectedStatus,
    handleDivisionChange,
    handleDistrictChange,
    handleUpazilaChange,
    handleBrickTypeChange,
    handleStaffChange,
    handleStatusChange,
    selectedSubStatus,
    subStatusOptions,
    handleSubStatusChange,

    brickTypeOptions,
    isLoadingBrickTypes,
    quantity,
    deliveryCharge,
    totalPrice,
    handleQuantityChange,
    handleDeliveryChargeChange,
    handleTotalPriceChange,
    isEnabled,
  };
};
