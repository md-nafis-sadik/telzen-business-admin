import {
  clearAllSelections,
  setDistrictsWithReset,
  setDivisionsWithReset,
  setSelectedDistricts,
  setSelectedDivisions,
  setSelectedSubDistricts,
  toggleDeleteModal,
} from "@/features/shared/sharedSlice";
import {
  useAddStaffMutation,
  useGetActiveStaffQuery,
  useGetBlockedStaffQuery,
  useGetSingleStaffQuery,
  useGetStaffDetailsQuery,
  useGetStaffOrderDetailsQuery,
  usePayStaffCommissionMutation,
  useUpdateStaffMutation,
  useChangeStaffStatusMutation,
  useReassignStaffMutation,
  useGetReassignStaffListQuery,
} from "@/features/staffs/staffApi";
import {
  clearStaffOrderData,
  setOrderPageData,
} from "@/features/staffs/staffDetailsSlice";
import {
  updateActiveFilters,
  updateActivePage,
  updateBlockedFilters,
  updateBlockedPage,
  setStaffSelectedData,
  setSuccessModal,
  openReassignModal,
  closeReassignModal,
} from "@/features/staffs/staffSlice";
import { errorNotify, infoNotify } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { useState, useEffect, useMemo } from "react";
import {
  useGetDivisionsQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
} from "@/features/location/locationApi";

const generateCacheKey = (page, filters) => {
  return `${page}_${filters.division}_${filters.district}_${filters.upazila}_${filters.search}`;
};

export const useActiveStaffs = () => {
  const { activeData, selectedStaffForBlock, showReassignModal } = useSelector(
    (state) => state.staffs
  );

  const dispatch = useDispatch();

  const { lists, meta, filters, cache, filterChangeId } = activeData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(filters.search, 500);

  const currentFilters = {
    ...filters,
    search: debouncedSearch,
  };

  const cacheKey = generateCacheKey(currentPage, currentFilters);

  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetActiveStaffQuery(
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

  const {
    data: staffList = [],
    isLoading: isLoadingStaffList,
    isFetching: isFetchingStaffList,
  } = useGetReassignStaffListQuery(
    { staff_id: selectedStaffForBlock?._id },
    {
      skip: !selectedStaffForBlock?._id,
      refetchOnMountOrArgChange: true,
    }
  );

  const [changeStaffStatus, { isLoading: isBlocking }] =
    useChangeStaffStatusMutation();
  const [reassignStaff, { isLoading: isReassigning }] =
    useReassignStaffMutation();

  const handlePageChange = (page) => {
    dispatch(updateActivePage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const handleShowBlockModal = (staff) => {
    dispatch(openReassignModal(staff));
  };

  const handleReassignConfirm = async (selectedReplacementStaffId) => {
    if (!selectedStaffForBlock?._id) {
      errorNotify("No staff selected for blocking");
      return;
    }

    try {
      const res = await changeStaffStatus({
        _id: selectedStaffForBlock._id,
        status: "blocked",
        new_staff_id: selectedReplacementStaffId,
      }).unwrap();

      if (res?.success) {
        dispatch(setSuccessModal(res.message || "Staff blocked successfully"));
      } else {
        errorNotify(res?.message || "Failed to block staff");
      }

      dispatch(closeReassignModal());
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to block staff");
      dispatch(closeReassignModal());
    }
  };

  const handleCloseReassignModal = () => {
    dispatch(closeReassignModal());
  };

  const handleSearchChange = (value) => {
    dispatch(updateActiveFilters({ search: value }));
    dispatch(updateActivePage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateActiveFilters(filterUpdate));
    dispatch(updateActivePage(1));
  };

  return {
    isFetching,
    isError,
    error,
    staffs: cachedData?.data || lists || [],
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
    isLoading: isBlocking || isReassigning,
    handleShowBlockModal,
    showReassignModal,
    selectedStaff: selectedStaffForBlock,
    staffList,
    isLoadingStaffList,
    handleReassignConfirm,
    handleCloseReassignModal,
    handleSearchChange,
    handleFilterChange,
  };
};

export const useBlockedStaffs = () => {
  const { blockedData, selectedData } = useSelector((state) => state.staffs);

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

  const { isFetching, isError, error } = useGetBlockedStaffQuery(
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

  const [changeStaffStatus, { isLoading }] = useChangeStaffStatusMutation();

  const handlePageChange = (page) => {
    dispatch(updateBlockedPage(page.current_page));

    if (page.per_page && page.per_page !== pageSize) {
    }
  };

  const blockConfirmHandler = async () => {
    dispatch(toggleDeleteModal(false));

    if (!selectedData?._id) {
      errorNotify("No staff selected");
      return;
    }

    try {
      const res = await changeStaffStatus({
        _id: selectedData._id,
        status: "active",
      }).unwrap();

      if (res?.success) {
        dispatch(
          setSuccessModal(res.message || "Staff unblocked successfully")
        );

        setTimeout(() => {}, 100);
      } else {
        errorNotify(res?.message || "Failed to unblock staff");
      }
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to unblock staff");
    }
  };
  const handleShowBlockModal = (staff) => {
    dispatch(setStaffSelectedData(staff));
    dispatch(toggleDeleteModal(true));
  };

  const handleSearchChange = (value) => {
    dispatch(updateBlockedFilters({ search: value }));
    dispatch(updateBlockedPage(1));
  };

  const handleFilterChange = (filterUpdate) => {
    dispatch(updateBlockedFilters(filterUpdate));
    dispatch(updateBlockedPage(1));
  };

  return {
    isFetching,
    isError,
    error,
    staffs: cachedData?.data || lists || [],
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
    blockConfirmHandler,
    isLoading,
    handleShowBlockModal,
    showDeleteModal,
    handleSearchChange,
    handleFilterChange,
  };
};

export const useAddStaff = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { roleOptions, statusOptions } = useSelector((state) => state.staffs);

  const { selectedDivisions, selectedDistricts, selectedSubDistricts } =
    useSelector((state) => state.shared);

  const [addStaff, { isLoading }] = useAddStaffMutation();

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageInputKey, setImageInputKey] = useState(Date.now());

  const { data: divisionsData, isLoading: divisionsLoading } =
    useGetDivisionsQuery();

  const divisionNames = useMemo(
    () =>
      selectedDivisions
        .map(
          (divId) => divisionsData?.data?.find((d) => d.id === divId)?.bn_name
        )
        .filter(Boolean),
    [selectedDivisions, divisionsData]
  );

  const { data: districtsData, isLoading: districtsLoading } =
    useGetDistrictsQuery(
      { divisionId: divisionNames },
      { skip: divisionNames.length === 0 }
    );

  const districtNames = useMemo(
    () =>
      selectedDistricts
        .map(
          (distId) => districtsData?.data?.find((d) => d.id === distId)?.bn_name
        )
        .filter(Boolean),
    [selectedDistricts, districtsData]
  );

  const { data: upazilasData, isLoading: upazilasLoading } =
    useGetUpazilasQuery(
      { districtId: districtNames },
      { skip: districtNames.length === 0 }
    );

  useEffect(() => {
    dispatch(clearAllSelections());
  }, [dispatch]);

  const handleDivisionChange = (newDivisions) => {
    dispatch(setDivisionsWithReset(newDivisions));
  };

  const handleDistrictChange = (newDistricts) => {
    dispatch(setDistrictsWithReset(newDistricts));
  };

  const handleSubDistrictChange = (newSubDistricts) => {
    dispatch(setSelectedSubDistricts(newSubDistricts));
  };

  const handleImageUpload = (files) => {
    const file = files[0];
    if (file) {
      setImageFiles([file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews([reader.result]);
      };
      reader.readAsDataURL(file);
      setImageInputKey(Date.now());
    }
  };

  const removeImage = (index) => {
    setImagePreviews([]);
    setImageFiles([]);
    setImageInputKey(Date.now());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const divisionSubmit = selectedDivisions
      .map((id) => divisionsData?.data?.find((d) => d.id === id)?.bn_name)
      .filter(Boolean);

    const districtSubmit = selectedDistricts
      .map((id) => districtsData?.data?.find((d) => d.id === id)?.bn_name)
      .filter(Boolean);

    const subDistrictSubmit = selectedSubDistricts
      .map((id) => upazilasData?.data?.find((d) => d.id === id)?.bn_name)
      .filter(Boolean);

    const data = {
      full_name: form.full_name.value,
      phone: form.phone.value,
      commission_rate: Number(form.commission_rate.value),
      division: divisionSubmit,
      district: districtSubmit,
      sub_district: subDistrictSubmit,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (imageFiles.length > 0) {
      formData.append("image", imageFiles[0]);
    }

    try {
      const res = await addStaff(formData).unwrap();
      dispatch(setSuccessModal(res.message || "Staff added successfully."));
      dispatch(clearAllSelections());
      navigate("/admin/staffs/active");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to add staff");
    }
  };

  return {
    handleSubmit,
    isLoading,
    roleOptions,
    statusOptions,
    divisions: divisionsData?.data || [],
    districts: districtsData?.data || [],
    upazilas: upazilasData?.data || [],
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
    selectedDivisions,
    selectedDistricts,
    selectedSubDistricts,

    handleDivisionChange,
    handleDistrictChange,
    handleSubDistrictChange,

    imagePreviews,
    handleImageUpload,
    removeImage,
    imageInputKey,
    dispatch,
  };
};

export const useEditStaff = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { roleOptions, statusOptions } = useSelector((state) => state.staffs);

  const { selectedDivisions, selectedDistricts, selectedSubDistricts } =
    useSelector((state) => state.shared);

  const {
    data: staffData,
    isFetching: upIsFetching,
    isError: upIsError,
    error: upError,
  } = useGetSingleStaffQuery(
    { staff_id: id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );

  const singleStaff = staffData?.data;

  const [updateStaff, { isLoading }] = useUpdateStaffMutation();

  const [isInitialized, setIsInitialized] = useState(false);

  const [imagePreviews, setImagePreviews] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageInputKey, setImageInputKey] = useState(Date.now());

  useEffect(() => {
    dispatch(clearAllSelections());
    setIsInitialized(false);
    setImagePreviews([]);
    setImageFiles([]);
  }, [id, dispatch]);

  const { data: divisionsData, isLoading: divisionsLoading } =
    useGetDivisionsQuery();

  const divisionNames = useMemo(
    () =>
      selectedDivisions
        .map(
          (divId) => divisionsData?.data?.find((d) => d.id === divId)?.bn_name
        )
        .filter(Boolean),
    [selectedDivisions, divisionsData]
  );

  const { data: districtsData, isLoading: districtsLoading } =
    useGetDistrictsQuery(
      { divisionId: divisionNames },
      { skip: divisionNames.length === 0 }
    );

  const districtNames = useMemo(
    () =>
      selectedDistricts
        .map(
          (distId) => districtsData?.data?.find((d) => d.id === distId)?.bn_name
        )
        .filter(Boolean),
    [selectedDistricts, districtsData]
  );

  const { data: upazilasData, isLoading: upazilasLoading } =
    useGetUpazilasQuery(
      { districtId: districtNames },
      { skip: districtNames.length === 0 }
    );

  useEffect(() => {
    if (!singleStaff || !divisionsData?.data || isInitialized) {
      return;
    }

    const divIds = (singleStaff.division || [])
      .map((name) => {
        const foundByBn = divisionsData.data.find((d) => d.bn_name === name);
        const foundByEn = divisionsData.data.find((d) => d.en_name === name);
        return (foundByBn || foundByEn)?.id;
      })
      .filter(Boolean);

    if (divIds.length > 0) {
      dispatch(setSelectedDivisions(divIds));
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, [singleStaff, divisionsData, isInitialized, dispatch]);

  useEffect(() => {
    if (!singleStaff || !districtsData?.data || !isInitialized) {
      return;
    }

    const distIds = (singleStaff.district || [])
      .map((name) => {
        const foundByBn = districtsData.data.find((d) => d.bn_name === name);
        const foundByEn = districtsData.data.find((d) => d.en_name === name);
        return (foundByBn || foundByEn)?.id;
      })
      .filter(Boolean);

    if (distIds.length > 0) {
      dispatch(setSelectedDistricts(distIds));
    }
  }, [singleStaff, districtsData, isInitialized, dispatch]);

  useEffect(() => {
    if (!singleStaff || !upazilasData?.data || !isInitialized) {
      return;
    }

    const upazIds = (singleStaff.sub_district || [])
      .map((name) => {
        const foundByBn = upazilasData.data.find((d) => d.bn_name === name);
        const foundByEn = upazilasData.data.find((d) => d.en_name === name);
        return (foundByBn || foundByEn)?.id;
      })
      .filter(Boolean);

    if (upazIds.length > 0) {
      dispatch(setSelectedSubDistricts(upazIds));
    }
  }, [singleStaff, upazilasData, isInitialized, dispatch]);

  useEffect(() => {
    if (singleStaff?.avatar) {
      setImagePreviews([singleStaff.avatar]);
    }
  }, [singleStaff]);

  useEffect(() => {
    return () => {
      // Optional: Clear selections when component unmounts
      // dispatch(clearAllSelections());
    };
  }, [dispatch]);

  const handleDivisionChange = (newDivisions) => {
    dispatch(setDivisionsWithReset(newDivisions));
  };

  const handleDistrictChange = (newDistricts) => {
    dispatch(setDistrictsWithReset(newDistricts));
  };

  const handleSubDistrictChange = (newSubDistricts) => {
    dispatch(setSelectedSubDistricts(newSubDistricts));
  };

  const handleImageUpload = (files) => {
    const file = files[0];
    if (file) {
      setImageFiles([file]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews([reader.result]);
      };
      reader.readAsDataURL(file);
      setImageInputKey(Date.now());
    }
  };

  const removeImage = (index) => {
    setImagePreviews([]);
    setImageFiles([]);
    setImageInputKey(Date.now());
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const divisionSubmit = selectedDivisions
      .map((id) => divisionsData?.data?.find((d) => d.id === id)?.bn_name)
      .filter(Boolean);

    const districtSubmit = selectedDistricts
      .map((id) => districtsData?.data?.find((d) => d.id === id)?.bn_name)
      .filter(Boolean);

    const subDistrictSubmit = selectedSubDistricts
      .map((id) => upazilasData?.data?.find((d) => d.id === id)?.bn_name)
      .filter(Boolean);

    const data = {
      full_name: form.full_name.value,
      phone: form.phone.value,
      commission_rate: Number(form.commission_rate.value),
      division: divisionSubmit,
      district: districtSubmit,
      sub_district: subDistrictSubmit,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    if (imageFiles.length > 0) {
      formData.append("image", imageFiles[0]);
    }

    try {
      const res = await updateStaff({ data: formData, staff_id: id }).unwrap();
      dispatch(setSuccessModal(res.message || "Staff updated successfully."));
      navigate("/admin/staffs/active");
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to update staff");
    }
  };

  return {
    upIsFetching,
    upIsError,
    upError,
    singleStaff,
    isLoading,
    handleSubmit,
    roleOptions,
    statusOptions,
    divisions: divisionsData?.data || [],
    districts: districtsData?.data || [],
    upazilas: upazilasData?.data || [],
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
    selectedDivisions,
    selectedDistricts,
    selectedSubDistricts,

    handleDivisionChange,
    handleDistrictChange,
    handleSubDistrictChange,

    imagePreviews,
    handleImageUpload,
    removeImage,
    imageInputKey,
  };
};

export const useStaffDetails = () => {
  const { id, slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearStaffOrderData());
  }, [slug, dispatch]);

  const {
    staffDetails: cachedStaffDetails,
    orderDataLists,
    orderPageData,
    orderData,
  } = useSelector((state) => state.staffDetails);

  const cacheKey = `page${orderPageData.currentPage}_${orderPageData.pageSize}`;
  const cachedOrderData = orderData[cacheKey];

  const {
    data: staffDetails = {},
    isFetching,
    isError,
    error,
    refetch,
  } = useGetStaffDetailsQuery(
    { staff_id: id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
    }
  );
  const {
    data: staffOrderDetails = {},
    isFetching: isFetchingOrder,
    isError: isErrorOrder,
    error: errorOrder,
    refetch: refetchOrder,
  } = useGetStaffOrderDetailsQuery(
    { 
      staff_id: id,
      current_page: orderPageData.currentPage,
      per_page: orderPageData.pageSize,
    },
    {
      skip: !id,
      refetchOnMountOrArgChange: false,
    }
  );

  const [payCommission, { isLoading: isPayingCommission }] =
    usePayStaffCommissionMutation();

  const handlePayCommission = async (amount) => {
    try {
      const result = await payCommission({
        staff_id: id,
        amount: parseFloat(amount),
      }).unwrap();

      infoNotify(result.message || "Commission paid successfully");

      refetch();

      return result;
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to pay commission");
      throw error;
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
    staffDetails: cachedStaffDetails,
    staffOrderDetails: cachedOrderData || orderDataLists,
    isFetching,
    isError,
    error,
    isFetchingOrder,
    isErrorOrder,
    errorOrder,
    isPayingCommission,
    handlePayCommission,
    refetch,
    orderPageData,
    handleOrdersPageChange,
  };
};
