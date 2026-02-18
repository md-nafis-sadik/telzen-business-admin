import {
  useAddStaffMutation,
  useChangeStaffStatusMutation,
  useDeleteStaffMutation,
  useGetSingleStaffQuery,
  useGetStaffQuery,
  useUpdateStaffMutation,
} from "@/features/staffs/staffApi";
import {
  closeBlockModal,
  closeUnblockModal,
  closeDeleteModal,
  openBlockModal,
  openUnblockModal,
  openDeleteModal,
  setSuccessModal,
  clearSuccessModal,
  updateStaffPage,
  updateStaffPageSize,
  updateStaffSearch,
} from "@/features/staffs/staffSlice";
import { errorNotify, roleOptions, successNotify } from "@/services";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { usePhoneInput } from "./usePhoneInput";
import { addStaffValidation } from "@/services/validations/staff.validation";

const generateCacheKey = (page, search) => {
  return `${page}_${search}`;
};

export const useStaffs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    staffData,
    showBlockModal,
    showUnblockModal,
    showDeleteModal,
    successModal,
    selectedStaffForBlock,
    selectedStaffForDelete,
  } = useSelector((state) => state.staffs);

  const { lists, meta, search, cache, filterChangeId } = staffData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const cacheKey = generateCacheKey(currentPage, debouncedSearch);
  const cachedData = cache[cacheKey];

  const { isFetching, isError, error } = useGetStaffQuery(
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

  const [changeStaffStatus, { isLoading: isChangingStatus }] =
    useChangeStaffStatusMutation();
  const [deleteStaffMutation, { isLoading: isDeletingStaff }] =
    useDeleteStaffMutation();

  const isTyping = search !== debouncedSearch;
  const displayData = cachedData?.data || lists || [];

  const handleSearchChange = (searchValue) => {
    dispatch(updateStaffSearch(searchValue));
    dispatch(updateStaffPage(1));
  };

  const handlePageChange = (page) => {
    dispatch(updateStaffPage(page.current_page));
    const newPageSize = page.per_page || page.limit;
    if (newPageSize && newPageSize !== pageSize) {
      dispatch(updateStaffPageSize(newPageSize));
    }
  };

  const handleOpenBlockModal = (staff) => {
    dispatch(openBlockModal(staff));
  };

  const handleOpenUnblockModal = (staff) => {
    dispatch(openUnblockModal(staff));
  };

  const handleOpenDeleteModal = (staff) => {
    dispatch(openDeleteModal(staff));
  };

  const handleCloseBlockModal = () => {
    dispatch(closeBlockModal());
  };

  const handleCloseUnblockModal = () => {
    dispatch(closeUnblockModal());
  };

  const handleCloseDeleteModal = () => {
    dispatch(closeDeleteModal());
  };

  const handleBlockStaff = async () => {
    if (!selectedStaffForBlock) return;

    try {
      const response = await changeStaffStatus({
        id: selectedStaffForBlock._id,
        is_blocked: true,
        staffData: selectedStaffForBlock,
      }).unwrap();

      dispatch(closeBlockModal());
      successNotify("Staff blocked successfully");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to block staff");
    }
  };

  const handleUnblockStaff = async () => {
    if (!selectedStaffForBlock) return;

    try {
      const response = await changeStaffStatus({
        id: selectedStaffForBlock._id,
        is_blocked: false,
      }).unwrap();

      dispatch(closeUnblockModal());
      successNotify("Staff unblocked successfully");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to unblock staff");
    }
  };

  const handleDeleteStaff = async () => {
    if (!selectedStaffForDelete) return;

    try {
      const response = await deleteStaffMutation(
        selectedStaffForDelete._id,
      ).unwrap();

      dispatch(closeDeleteModal());
      successNotify("Staff deleted successfully");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete staff");
    }
  };

  const handleCloseSuccessModal = () => {
    dispatch(clearSuccessModal());
    navigate("/admin/staffs");
  };

  return {
    staffList: isTyping || isError ? [] : displayData,
    current_page: currentPage,
    limit: pageSize,
    total_page: totalPages,
    total_items: totalItems,
    search,
    isFetching: isFetching || isTyping,
    isLoading: false,
    isError,
    error,
    showBlockModal,
    showUnblockModal,
    showDeleteModal,
    successModal,
    selectedStaffForBlock,
    selectedStaffForDelete,
    isBlockLoading: isChangingStatus,
    isUnblockLoading: isChangingStatus,
    isDeletingStaff,
    handleSearchChange,
    updatePage: handlePageChange,
    handleOpenBlockModal,
    handleOpenUnblockModal,
    handleOpenDeleteModal,
    handleCloseBlockModal,
    handleCloseUnblockModal,
    handleCloseDeleteModal,
    handleBlockStaff,
    handleUnblockStaff,
    handleDeleteStaff,
    handleCloseSuccessModal,
    dispatch,
  };
};

export const useSingleStaff = () => {
  const { id } = useParams();
  const { singleStaff } = useSelector((state) => state.staffs);

  const { isFetching, isError, error } = useGetSingleStaffQuery(id, {
    skip: !id,
  });

  return {
    staff: singleStaff,
    isFetching,
    isError,
    error,
  };
};

export const useStaffMutations = () => {
  const navigate = useNavigate();
  const [addStaff, { isLoading: isAdding }] = useAddStaffMutation();
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();

  const handleAddStaff = async (data) => {
    try {
      await addStaff(data).unwrap();
      successNotify("Staff added successfully");
      navigate("/admin/staffs");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to add staff");
      throw error;
    }
  };

  const handleUpdateStaff = async (id, data) => {
    try {
      await updateStaff({ id, data }).unwrap();
      successNotify("Staff updated successfully");
      navigate("/admin/staffs");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update staff");
      throw error;
    }
  };

  return {
    handleAddStaff,
    handleUpdateStaff,
    isAdding,
    isUpdating,
  };
};

export const useAddStaff = () => {
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});
  const { phone, countryInfo, handlePhoneChange } = usePhoneInput("", "bd");
  const [addStaff, { isLoading: isAdding }] = useAddStaffMutation();

  // Validate form on changes
  const validateForm = () => {
    
    try {
      addStaffValidation.parse({
        name: formData.name,
        email: formData.email,
        phone: phone,
        role: selectedRole,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error.errors) {
        const newErrors = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  // Check if form is valid for button disable
  const isFormValid = () => {
    return (
      formData.name.trim().length >= 3 &&
      formData.email.includes("@") &&
      phone.length >= 10 &&
      selectedRole.length > 0
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate before submit
    if (!validateForm()) {
      errorNotify("Please fill in all required fields correctly");
      return;
    }

    const data = {
      name: formData.name,
      email: formData.email,
      role: selectedRole,
      phone,
      country: countryInfo,
    };

    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(data));

    try {
      const response = await addStaff(formDataToSend).unwrap();
      dispatch(
        setSuccessModal({
          show: true,
          type: "add",
          message: response?.message || "Staff added successfully!",
        }),
      );
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to add staff");
    }
  };

  return {
    selectedRole,
    setSelectedRole,
    phone,
    handlePhoneChange,
    roleOptions,
    handleSubmit,
    isAdding,
    dispatch,
    formData,
    handleInputChange,
    errors,
    isFormValid: isFormValid(),
  };
};

export const useEditStaff = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { singleStaff } = useSelector((state) => state.staffs);
  const [updateStaff, { isLoading: isUpdating }] = useUpdateStaffMutation();

  const { isFetching, isError, error } = useGetSingleStaffQuery(id, {
    skip: !id,
  });

  const getRoleValue = () => {
    if (!singleStaff?.role) return "";
    const roleValue =
      typeof singleStaff.role === "object"
        ? singleStaff.role.id || singleStaff.role.name
        : singleStaff.role;
    return roleValue?.toLowerCase() || "";
  };

  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    if (singleStaff?.role) {
      setSelectedRole(getRoleValue());
    }
  }, [singleStaff?.role]);
  const { phone, countryInfo, handlePhoneChange } = usePhoneInput(
    singleStaff?.phone,
    singleStaff?.country?.code,
    singleStaff?.country?.dial_code,
    singleStaff?.country?.name,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    
    const roleToSend = selectedRole || getRoleValue();
    
    const data = {
      name,
      role: roleToSend,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      const response = await updateStaff({
        id: singleStaff._id,
        data: formData,
      }).unwrap();
      dispatch(
        setSuccessModal({
          show: true,
          type: "update",
          message: response?.message || "Staff updated successfully!",
        }),
      );
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to update staff");
    }
  };

  return {
    singleStaff,
    isFetching,
    isError,
    error,
    selectedRole,
    setSelectedRole,
    phone,
    handlePhoneChange,
    roleOptions,
    handleSubmit,
    isUpdating,
    dispatch,
  };
};
