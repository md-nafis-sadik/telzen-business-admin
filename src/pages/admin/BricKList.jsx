import BrickListHeader from "@/components/brickList/BrickListHeader";
import BrickListTable from "@/components/brickList/BrickListTable";
import BrickListDetailsModal from "@/components/brickList/BrickListDetailsModal";
import RequestLoader from "@/components/shared/RequestLoader";
import { useBrickList } from "@/hooks";
import Modal from "@/components/shared/Modal";
import { DeletePopupIconSvg, SuccessPopupIconSvg } from "@/services";
import {
  toggleDeleteModal,
  toggleSuccessModal,
} from "@/features/shared/sharedSlice";

function BrickList() {
  const {
    isLoading,
    deleteConfirmHandler,
    successConfirmHandler,
    showDeleteModal,
    showSuccessModal,
    dispatch,
    successMessage,
  } = useBrickList();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <BrickListHeader />
      <BrickListTable />
      <BrickListDetailsModal />
      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton="Delete Now"
        title="Are you sure you want to delete this product?"
        cancelButton="Cancel"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara=" Once deleted, this action cannot be undone."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showDeleteModal}
        onClose={() => {
          dispatch(toggleDeleteModal(false));
        }}
        confirmHandeler={deleteConfirmHandler}
      />
      <Modal
        confirmButtonClass="btn_success h-12 !w-full text-sm"
        confirmButton="Okay"
        title="Successful!"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara={successMessage}
        popupIcon={<SuccessPopupIconSvg />}
        showModal={showSuccessModal}
        onClose={() => {
          dispatch(toggleSuccessModal(false));
        }}
        confirmHandeler={successConfirmHandler}
      />
      {isLoading && <RequestLoader />}
    </div>
  );
}

export default BrickList;
