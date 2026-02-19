import { SuccessPopupIconSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { clearSuccessModal } from "@/features/users/usersSlice";
import Modal from "../shared/Modal";
import { useNavigate } from "react-router-dom";
import { adminRouteLinks } from "@/services";

const UsersSuccessModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successModal } = useSelector((state) => state.users);

  const handleClose = () => {
    dispatch(clearSuccessModal());
    // Navigate back to users active page after closing
    navigate(adminRouteLinks.usersActive.path);
  };

  const getTitle = () => {
    switch (successModal?.type) {
      case "addCustomer":
        return "Customer Added Successfully";
      case "bulkCustomer":
        return "Customers Uploaded Successfully";
      case "addGroup":
        return "Group Created Successfully";
      case "updateGroup":
        return "Group Updated Successfully";
      default:
        return "Operation Successful";
    }
  };

  const getMessage = () => {
    if (successModal?.message) {
      return successModal.message;
    }
    
    switch (successModal?.type) {
      case "addCustomer":
        return "The new customer has been added successfully.";
      case "bulkCustomer":
        return "The customers have been uploaded successfully.";
      case "addGroup":
        return "The new group has been created successfully.";
      case "updateGroup":
        return "The group information has been updated successfully.";
      default:
        return "The operation completed successfully.";
    }
  };

  return (
    <Modal 
      showModal={successModal?.show || false} 
      onClose={handleClose}
      title={getTitle()}
      actionPara={getMessage()}
      popupIcon={<SuccessPopupIconSvg />}
      confirmButton="OK"
      confirmButtonClass="w-full h-12 px-6 rounded-lg bg-main-700 text-white text-sm font-medium hover:bg-main-800 transition-colors"
      confirmHandeler={handleClose}
    />
  );
};

export default UsersSuccessModal;
