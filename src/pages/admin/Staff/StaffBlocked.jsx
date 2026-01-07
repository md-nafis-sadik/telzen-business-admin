import StaffBlockedHeader from "@/components/staffs/blocked/StaffBlockedHeader";
import StaffBlockedTable from "@/components/staffs/blocked/StaffBlockedTable";
import Modal from "@/components/shared/Modal";
import RequestLoader from "@/components/shared/RequestLoader";
import { useBlockedStaffs } from "@/hooks/useStaff";
import { DeletePopupIconSvg, SuccessPopupIconSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { toggleDeleteModal } from "@/features/shared/sharedSlice";
import { clearSuccessModal } from "@/features/staffs/staffSlice";

function StaffBlocked() {
  const dispatch = useDispatch();
  const { showSuccessModal, successMessage } = useSelector(
    (state) => state.staffs
  );

  const { blockConfirmHandler, isLoading, showDeleteModal } =
    useBlockedStaffs();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <StaffBlockedHeader />
      <StaffBlockedTable />
      <Modal
        confirmButtonClass="btn_green !bg-[#00AE5B] h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton="Unblock Now"
        title="Are you sure you want to unblock this staff member?"
        actionPara="Once unblocked, this staff will regain access to their account and tasks."
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionText="unblock"
        typeText="staff"
        popupIcon={<DeletePopupIconSvg />}
        confirmHandeler={blockConfirmHandler}
        showModal={showDeleteModal}
        onClose={() => dispatch(toggleDeleteModal(false))}
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

export default StaffBlocked;
