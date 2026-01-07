import EditOrder from "@/pages/admin/Forms/orders/EditOrder";
import Modal from "@/components/shared/Modal";
import { SuccessPopupIconSvg } from "@/services";
import { useEditOrder } from "@/hooks/useOrders";
import { toggleSuccessModal } from "@/features/shared/sharedSlice";
import { useDispatch } from "react-redux";

function OrderEdit() {
  const {
    showSuccessModal,
    handleSuccessModalClose,
  } = useEditOrder();

  const dispatch = useDispatch();

  return (
    <>
      <EditOrder />
      <Modal
        confirmButtonClass="btn_success h-12 !w-full text-sm"
        confirmButton="Okay"
        title="Successful!"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="Order has been updated successfully!"
        popupIcon={<SuccessPopupIconSvg />}
        showModal={showSuccessModal}
        onClose={() => {
          dispatch(toggleSuccessModal(false));
        }}
        confirmHandeler={handleSuccessModalClose}
      />
    </>
  );
}

export default OrderEdit;
