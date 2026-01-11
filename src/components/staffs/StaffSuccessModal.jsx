// import { Modal } from "@/components/ui/modal";
import { GreenTickIconSvg } from "@/services";
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
    switch (successModal.type) {
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
    switch (successModal.type) {
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
    <Modal open={successModal.show} onOpenChange={handleClose}>
      <div className="w-full max-w-md p-6 rounded-lg bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center items-center">
            <GreenTickIconSvg />
          </div>

          <div className="flex flex-col items-center gap-3">
            <h3 className="text-gray-100 text-xl font-semibold text-center">
              {getTitle()}
            </h3>
            <p className="text-black-600 text-sm text-center">{getMessage()}</p>
          </div>

          <div className="w-full">
            <button
              onClick={handleClose}
              className="w-full h-12 px-6 rounded-lg bg-main-700 text-white text-sm font-medium hover:bg-main-800 transition-colors"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StaffSuccessModal;
