import Modal from "@/components/shared/Modal";
import RequestLoader from "@/components/shared/RequestLoader";
import StaffHeader from "@/components/staffs/StaffHeader";
import StaffTable from "@/components/staffs/StaffTable";
import { DeletePopupIconSvg, SuccessPopupIconSvg } from "@/services";
import { useStaffs } from "@/hooks";
import {
  closeBlockModal,
  closeUnblockModal,
  closeDeleteModal,
} from "@/features/staffs/staffSlice";

function Staff() {
  const {
    showBlockModal,
    showUnblockModal,
    showDeleteModal,
    isBlockLoading,
    isUnblockLoading,
    isDeletingStaff,
    handleBlockStaff,
    handleUnblockStaff,
    handleDeleteStaff,
    dispatch,
  } = useStaffs();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <StaffHeader />
      <StaffTable />

      {(isBlockLoading || isUnblockLoading || isDeletingStaff) && <RequestLoader />}

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton={isBlockLoading ? "Blocking..." : "Block"}
        title="Are you sure you want to block this staff?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="The staff will no longer have access to their account."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showBlockModal}
        onClose={() => {
          dispatch(closeBlockModal());
        }}
        confirmHandeler={handleBlockStaff}
        isLoading={isBlockLoading}
      />

      <Modal
        confirmButtonClass="btn_green !bg-[#00AE5B] h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton={isUnblockLoading ? "Unblocking..." : "Unblock"}
        title="Are you sure you want to unblock this staff?"
        actionPara="Once unblocked, this staff will regain access to their account."
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionText="unblock"
        typeText="staff"
        popupIcon={<DeletePopupIconSvg />}
        confirmHandeler={handleUnblockStaff}
        showModal={showUnblockModal}
        onClose={() => dispatch(closeUnblockModal())}
        isLoading={isUnblockLoading}
      />

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton={isDeletingStaff ? "Deleting..." : "Delete"}
        title="Are you sure you want to delete this staff?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="This action cannot be undone. The staff will be permanently removed."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showDeleteModal}
        onClose={() => {
          dispatch(closeDeleteModal());
        }}
        confirmHandeler={handleDeleteStaff}
        isLoading={isDeletingStaff}
      />


    </div>
  );
}

export default Staff;