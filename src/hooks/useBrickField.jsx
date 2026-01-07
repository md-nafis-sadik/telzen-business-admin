import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import {
  useGetBrickFieldQuery,
  useAddBrickFieldMutation,
  useUpdateBrickFieldMutation,
  useDeleteBrickFieldMutation,
  useGetBrickFieldDetailsQuery,
} from "@/features/brickField/brickFieldApi";
import {
  changeFilter,
  changeSearch,
  setSelectedBrickField,
  setPageData,
  setLoading,
} from "@/features/brickField/brickFieldSlice";
import {
  toggleDeleteModal,
  toggleSuccessModal,
  showSuccessWithMessage,
  setSelectedSubDistricts,
  clearAllSelections,
  setDistrictsWithReset,
  setDivisionsWithReset,
  setSelectedDistricts,
  setSelectedDivisions,
} from "@/features/shared/sharedSlice";
import {
  useGetDivisionsQuery,
  useGetDistrictsQuery,
  useGetUpazilasQuery,
} from "@/features/location/locationApi";
import { errorNotify, successNotify } from "@/services";
import { useDebounce } from "./useDebounce";

export const useBrickField = () => {
  const {
    dataLists,
    pageData,
    filter,
    search,
    selectedBrickField,
    data,
    filterChangeId,
    isLoading,
  } = useSelector((state) => state.brickField);

  const { showDeleteModal, showSuccessModal, successMessage } = useSelector(
    (state) => state.shared
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const debouncedSearch = useDebounce(search, 500);
  const [addBrickField] = useAddBrickFieldMutation();
  const [updateBrickField] = useUpdateBrickFieldMutation();
  const [deleteBrickField] = useDeleteBrickFieldMutation();

  const { currentPage, pageSize } = pageData;
  const cacheKey = `page${currentPage}_${debouncedSearch}_${filter.division}_${filter.district}_${filter.sub_district}`;
  const cachedData = data[cacheKey];

  const { isFetching, isError, error } = useGetBrickFieldQuery(
    {
      current_page: currentPage,
      per_page: pageSize,
      division: filter.division,
      district: filter.district,
      sub_district: filter.sub_district,
      search: debouncedSearch,
      _filterChangeId: filterChangeId,
    },
    {
      refetchOnMountOrArgChange: false,
    }
  );

  useEffect(() => {
    if (location.state?.showSuccess && location.state?.message) {
      dispatch(showSuccessWithMessage(location.state.message));
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, dispatch, navigate, location.pathname]);

  const handlePageChange = (page) => {
    const updates = { currentPage: page.current_page };
    if (page.per_page && page.per_page !== pageData.pageSize) {
      updates.pageSize = page.per_page;
    }
    dispatch(setPageData({ ...pageData, ...updates }));
  };

  const handleFilterChange = (newFilter) => {
    dispatch(changeFilter(newFilter));
    dispatch(setPageData({ ...pageData, currentPage: 1 }));
  };

  const handleSearchChange = (searchTerm) => {
    dispatch(changeSearch(searchTerm));
    dispatch(setPageData({ ...pageData, currentPage: 1 }));
  };

  const handleAddBrickField = async (fieldData) => {
    dispatch(setLoading(true));
    try {
      const res = await addBrickField(fieldData).unwrap();
      successNotify(res?.message || "Brick Field added successfully");
      return res;
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to add brick field");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleUpdateBrickField = async (brick_field_id, fieldData) => {
    dispatch(setLoading(true));
    try {
      const res = await updateBrickField({
        brick_field_id,
        data: fieldData,
      }).unwrap();
      successNotify(res?.message || "Brick Field updated successfully");
      return res;
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update brick field");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDeleteBrickField = async (brick_field_id) => {
    dispatch(setLoading(true));
    try {
      const res = await deleteBrickField({ brick_field_id }).unwrap();
      successNotify(res?.message || "Brick Field deleted successfully");
      return res;
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete brick field");
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleShowDeleteModal = (field) => {
    dispatch(setSelectedBrickField(field));
    dispatch(toggleDeleteModal(true));
  };

  const deleteConfirmHandler = async () => {
    if (!selectedBrickField?._id) return;

    try {
      const res = await deleteBrickField({
        brick_field_id: selectedBrickField._id,
      }).unwrap();
      dispatch(toggleDeleteModal(false));
      dispatch(
        showSuccessWithMessage(
          res?.message || "Brick Field deleted successfully"
        )
      );
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete brick field");
    }
  };

  const successConfirmHandler = () => {
    dispatch(toggleSuccessModal(false));
  };

  return {
    isFetching,
    isError,
    error,
    brickFields: cachedData || dataLists || [],
    current_page: currentPage,
    per_page: pageSize,
    total_page: pageData.totalPages,
    total_items: pageData.totalItems,
    filter,
    search,
    selectedBrickField,
    isLoading,
    showDeleteModal,
    showSuccessModal,
    successMessage,
    updatePage: handlePageChange,
    handleFilterChange,
    handleSearchChange,
    handleAddBrickField,
    handleUpdateBrickField,
    handleDeleteBrickField,
    handleShowDeleteModal,
    deleteConfirmHandler,
    successConfirmHandler,
    dispatch,
    setSelectedBrickField,
  };
};

export const useAddBrickField = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addBrickField, { isLoading }] = useAddBrickFieldMutation();

  useEffect(() => {
    dispatch(clearAllSelections());
  }, [dispatch]);

  const { selectedDivisions, selectedDistricts, selectedSubDistricts } =
    useSelector((state) => state.shared);

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

  const handleDivisionChange = (newDivisions) => {
    dispatch(setDivisionsWithReset(newDivisions));
  };
  const handleDistrictChange = (newDistricts) => {
    dispatch(setDistrictsWithReset(newDistricts));
  };

  const handleSubDistrictChange = (newSubDistricts) => {
    dispatch(setSelectedSubDistricts(newSubDistricts));
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
      brick_field_name: form.brick_field_name.value,
      phone: form.phone.value,
      division: divisionSubmit,
      district: districtSubmit,
      sub_district: subDistrictSubmit,
    };

    try {
      await addBrickField(data).unwrap();
      navigate("/admin/brick-field", {
        state: {
          showSuccess: true,
          message: "Brick field added successfully.",
        },
      });
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to add brick field");
    }
  };

  return {
    handleSubmit,
    isLoading,
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
    dispatch,
  };
};

export const useEditBrickField = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isInitialized, setIsInitialized] = useState(false);

  const [updateBrickField, { isLoading }] = useUpdateBrickFieldMutation();

  const { selectedDivisions, selectedDistricts, selectedSubDistricts } =
    useSelector((state) => state.shared);

  const {
    data: brickFieldData,
    isFetching: upIsFetching,
    isError: upIsError,
    error: upError,
  } = useGetBrickFieldDetailsQuery(
    { brick_field_id: id },
    {
      skip: !id,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

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
      { skip: selectedDivisions.length === 0 || divisionNames.length === 0 }
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
      { skip: selectedDistricts.length === 0 || districtNames.length === 0 }
    );

  useEffect(() => {
    if (!brickFieldData?.data || !divisionsData?.data || isInitialized) {
      return;
    }

    const field = brickFieldData.data;

    const divisionIds = Array.isArray(field.division)
      ? field.division
          .map((name) => {
            const found =
              divisionsData.data.find((d) => d.bn_name === name) ||
              divisionsData.data.find((d) => d.en_name === name);
            return found?.id;
          })
          .filter(Boolean)
      : [];

    if (divisionIds.length > 0) {
      dispatch(setSelectedDivisions(divisionIds));
    }

    setIsInitialized(true);
  }, [brickFieldData, divisionsData, isInitialized, dispatch]);

  useEffect(() => {
    if (!brickFieldData?.data || !districtsData?.data || !isInitialized) {
      return;
    }

    const field = brickFieldData.data;

    if (Array.isArray(field.district)) {
      const districtIds = field.district
        .map((name) => {
          const found =
            districtsData.data.find((d) => d.bn_name === name) ||
            districtsData.data.find((d) => d.en_name === name);
          return found?.id;
        })
        .filter(Boolean);

      if (districtIds.length > 0) {
        dispatch(setSelectedDistricts(districtIds));
      }
    }
  }, [brickFieldData, districtsData, isInitialized, dispatch]);

  useEffect(() => {
    if (!brickFieldData?.data || !upazilasData?.data || !isInitialized) {
      return;
    }

    const field = brickFieldData.data;

    if (Array.isArray(field.sub_district)) {
      const upazilaIds = field.sub_district
        .map((name) => {
          const found =
            upazilasData.data.find((d) => d.bn_name === name) ||
            upazilasData.data.find((d) => d.en_name === name);
          return found?.id;
        })
        .filter(Boolean);

      if (upazilaIds.length > 0) {
        dispatch(setSelectedSubDistricts(upazilaIds));
      }
    }
  }, [brickFieldData, upazilasData, isInitialized, dispatch]);
  const handleDivisionChange = (newDivisions) => {
    dispatch(setDivisionsWithReset(newDivisions));
  };

  const handleDistrictChange = (newDistricts) => {
    dispatch(setDistrictsWithReset(newDistricts));
  };

  const handleSubDistrictChange = (newSubDistricts) => {
    dispatch(setSelectedSubDistricts(newSubDistricts));
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
      brick_field_name: form.brick_field_name.value,
      phone: form.phone.value,
      division: divisionSubmit,
      district: districtSubmit,
      sub_district: subDistrictSubmit,
    };

    try {
      await updateBrickField({ brick_field_id: id, data }).unwrap();
      navigate("/admin/brick-field", {
        state: {
          showSuccess: true,
          message: "Brick field updated successfully.",
        },
      });
    } catch (err) {
      errorNotify(err?.data?.message || "Failed to update brick field");
    }
  };

  return {
    upIsFetching,
    upIsError,
    upError,
    brickField: brickFieldData?.data,
    isLoading,
    handleSubmit,
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
  };
};
