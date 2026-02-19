// import { Modal } from "@/components/ui/modal";
import { SuccessPopupIconSvg } from "@/services";
import { useStaffs } from "@/hooks";
import { useDispatch } from "react-redux";
import { setSuccessModal } from "@/features/staffs/staffSlice";
import Modal from "../shared/Modal";

const StaffSuccessModal = () => {
  const dispatch = useDispatch();
  const { successModal } = useStaffs();

  const handleClose = () => {
    dispatch(setSuccessModal({ show: false, type: "" }));
  };

  const getTitle = () => {
    switch (successModal?.type) {
      case "block":
        return "Staff Blocked Successfully";
      case "unblock":
        return "Staff Unblocked Successfully";
      case "add":
        return "Staff Added Successfully";
      case "update":
        return "Staff Updated Successfully";
      case "delete":
        return "Staff Deleted Successfully";
      default:
        return "Operation Successful";
    }
  };

  const getMessage = () => {
    switch (successModal?.type) {
      case "block":
        return "The staff member has been blocked successfully and will not be able to access their account.";
      case "unblock":
        return "The staff member has been unblocked successfully and can now access their account.";
      case "add":
        return "The new staff member has been added successfully.";
      case "update":
        return "The staff member information has been updated successfully.";
      case "delete":
        return "The staff member has been removed successfully.";
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

export default StaffSuccessModal;
