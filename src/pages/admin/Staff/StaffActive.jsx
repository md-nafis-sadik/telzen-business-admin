import StaffActiveHeader from "@/components/staffs/active/StaffActiveHeader";
import StaffActiveTable from "@/components/staffs/active/StaffActiveTable";
import Modal from "@/components/shared/Modal";
import InputModal from "@/components/shared/InputModal";
import RequestLoader from "@/components/shared/RequestLoader";
import { useActiveStaffs } from "@/hooks/useStaff";
import { ExclaimPopupIconSvg, SuccessPopupIconSvg } from "@/services";
import { useSelector, useDispatch } from "react-redux";
import { clearSuccessModal } from "@/features/staffs/staffSlice";

function StaffActive() {
  const dispatch = useDispatch();
  const { showSuccessModal, successMessage } = useSelector(
    (state) => state.staffs
  );

  const {
    isLoading,
    showReassignModal,
    selectedStaff,
    staffList,
    isLoadingStaffList,
    handleReassignConfirm,
    handleCloseReassignModal,
  } = useActiveStaffs();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <StaffActiveHeader />
      <StaffActiveTable />

      {/* Reassign Modal */}
      <InputModal
        isOpen={showReassignModal}
        onClose={handleCloseReassignModal}
        title="Reassign Required"
        subtitle="To block this staff, you must first assign their active orders to another staff member."
        inputLabel="Assign Replacement Staff"
        inputType="select"
        placeholder="Select replacement staff"
        selectOptions={staffList}
        onConfirm={handleReassignConfirm}
        confirmText="Continue to Block"
        cancelText="Cancel"
        popupIcon={<ExclaimPopupIconSvg />}
        showIcon={true}
        isLoading={isLoadingStaffList}
      />

      {/* API Success Modal */}
      <Modal
        confirmButtonClass="btn_green h-12 !w-full text-sm"
        confirmButton="OK"
        title="Success!"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara={successMessage}
        popupIcon={<SuccessPopupIconSvg />}
        showModal={showSuccessModal}
        onClose={() => dispatch(clearSuccessModal())}
        confirmHandeler={() => dispatch(clearSuccessModal())}
      />

      {isLoading && <RequestLoader />}
    </div>
  );
}

export default StaffActive;
