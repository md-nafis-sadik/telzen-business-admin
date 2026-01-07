import CustomerPendingHeader from "@/components/customers/pending/CustomerPendingHeader";
import CustomerPendingTable from "@/components/customers/pending/CustomerPendingTable";
import Modal from "@/components/shared/Modal";
import RequestLoader from "@/components/shared/RequestLoader";
import { toggleDeleteModal } from "@/features/shared/sharedSlice";
import { usePendingCustomers } from "@/hooks/useCustomers";
import { DeletePopupIconSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";

function CustomersPending() {
  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const { blockConfirmHandler, isLoading } = usePendingCustomers();

  const successConfirmHandler = () => {};

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <CustomerPendingHeader />
      <CustomerPendingTable />

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton="Block"
        title="Are you sure you want to block this customer?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="Once blocked, the customer will not be able to access their account."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showDeleteModal}
        onClose={() => {
          dispatch(toggleDeleteModal(false));
        }}
        confirmHandeler={blockConfirmHandler}
      />

      {isLoading && <RequestLoader />}
    </div>
  );
}

export default CustomersPending;
