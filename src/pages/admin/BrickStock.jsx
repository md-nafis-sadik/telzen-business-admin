import BrickStockHeader from "@/components/brickStock/BrickStockHeader";
import BrickStockTable from "@/components/brickStock/BrickStockTable";
import BrickStockDetailsModal from "@/components/brickStock/BrickStockDetailsModal";
import RequestLoader from "@/components/shared/RequestLoader";
import { useBrickStock } from "@/hooks";
import Modal from "@/components/shared/Modal";
import {
  DeletePopupIconSvg,
  SuccessPopupIconSvg,
} from "@/services";
import {
  toggleDeleteModal,
  toggleSuccessModal,
} from "@/features/shared/sharedSlice";

function BrickStock() {
  const { isLoading, deleteConfirmHandler, successConfirmHandler, showDeleteModal, showSuccessModal, dispatch } =
    useBrickStock();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <BrickStockHeader />
      <BrickStockTable />
      <BrickStockDetailsModal />
      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton="Block"
        title="Are you sure you want to delete this stock?"
        cancelButton="No, Thanks"
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
        actionPara="The selected Brick Stock has been permanently removed from the list."
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

export default BrickStock;
