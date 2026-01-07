import { OrderCancelledHeader, OrderCancelledTable } from "@/components/orders";
import Modal from "@/components/shared/Modal";
import { SuccessPopupIconSvg } from "@/services";
import { useSelector, useDispatch } from "react-redux";
import { toggleSuccessModal } from "@/features/shared/sharedSlice";
import { useNavigate } from "react-router-dom";

function OrdersCancelled() {
  const dispatch = useDispatch();
  const { showSuccessModal } = useSelector((state) => state.shared);

  const handleSuccessConfirm = () => {
    dispatch(toggleSuccessModal(false));
  };

  return (
    <>
      <section className="bg-white p-4 flex flex-col rounded-2xl h-full">
        <OrderCancelledHeader />
        <OrderCancelledTable />
      </section>
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
        confirmHandeler={handleSuccessConfirm}
      />
    </>
  );
}

export default OrdersCancelled;
