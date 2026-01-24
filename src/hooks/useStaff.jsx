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
  openBlockModal,
  setSuccessModal,
  updateStaffPage,
  updateStaffSearch,
} from "@/features/staffs/staffSlice";
import { errorNotify, roleOptions, successNotify } from "@/services";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebounce } from "./useDebounce";
import { usePhoneInput } from "./usePhoneInput";

export const useStaffs = () => {
  const dispatch = useDispatch();
  const { staffData, showBlockModal, successModal, selectedStaffForBlock } =
    useSelector((state) => state.staffs);

  const { lists, meta, search } = staffData;
  const { currentPage, pageSize, totalPages, totalItems } = meta;

  const debouncedSearch = useDebounce(search, 500);

  const isTyping = search !== debouncedSearch;

  const { isFetching, isError, error } = useGetStaffQuery({
    current_page: currentPage,
    limit: pageSize,
    search: debouncedSearch,
  });

  const [changeStaffStatus, { isLoading: isChangingStatus }] =
    useChangeStaffStatusMutation();
  const [deleteStaff, { isLoading: isDeletingStaff }] =
    useDeleteStaffMutation();

  const displayData = isTyping ? [] : lists;

  const handleSearchChange = (searchValue) => {
    dispatch(updateStaffSearch(searchValue));
  };

  const handlePageChange = (page) => {
    dispatch(updateStaffPage(page));
  };

  const handleOpenBlockModal = (staff) => {
    dispatch(openBlockModal(staff));
  };

  const handleCloseBlockModal = () => {
    dispatch(closeBlockModal());
  };

  const handleBlockStaff = async () => {
    if (!selectedStaffForBlock) return;

    try {
      await changeStaffStatus({
        id: selectedStaffForBlock._id,
        status: "blocked",
        staffData: selectedStaffForBlock,
      }).unwrap();

      dispatch(setSuccessModal({ show: true, type: "block" }));
      handleCloseBlockModal();
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to block staff");
    }
  };

  const handleUnblockStaff = async (staffId) => {
    try {
      await changeStaffStatus({
        id: staffId,
        status: "active",
      }).unwrap();

      successNotify("Staff unblocked successfully");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to unblock staff");
    }
  };

  const handleDeleteStaff = async (staffId) => {
    try {
      await deleteStaff(staffId).unwrap();
      successNotify("Staff deleted successfully");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete staff");
    }
  };

  return {
    staffList: displayData,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    search,
    isFetching: isFetching || isTyping,
    isError,
    error,
    showBlockModal,
    successModal,
    selectedStaffForBlock,
    isChangingStatus,
    isDeletingStaff,
    handleSearchChange,
    handlePageChange,
    handleOpenBlockModal,
    handleCloseBlockModal,
    handleBlockStaff,
    handleUnblockStaff,
    handleDeleteStaff,
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
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");
  const { phone, countryInfo, handlePhoneChange } = usePhoneInput("", "bd");
  const [addStaff, { isLoading: isAdding }] = useAddStaffMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const data = {
      name,
      email,
      role: selectedRole,
      phone,
      country: countryInfo,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      await addStaff(formData).unwrap();
      successNotify("Staff added successfully");
      navigate("/admin/staffs");
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
  };
};

export const useEditStaff = () => {
  const navigate = useNavigate();
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

  console.log("singleStaff:", singleStaff);

  const [selectedRole, setSelectedRole] = useState(getRoleValue());
  const { phone, countryInfo, handlePhoneChange } = usePhoneInput(
    singleStaff?.phone,
    singleStaff?.country?.code,
    singleStaff?.country?.dial_code,
    singleStaff?.country?.name,
  );

  const handleSubmit = async (e) => {
    // console.log("countryInfo:", countryInfo);
    e.preventDefault();
    const name = e.target.name.value;
    const data = {
      name,
      role: selectedRole,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));

    try {
      await updateStaff({ id: singleStaff._id, data: formData }).unwrap();
      successNotify("Staff updated successfully");
      navigate("/admin/staffs");
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
  };
};
