import CustomerActiveHeader from "@/components/customers/active/CustomerActiveHeader";
import CustomerActiveTable from "@/components/customers/active/CustomerActiveTable";
import Modal from "@/components/shared/Modal";
import RequestLoader from "@/components/shared/RequestLoader";
import { toggleDeleteModal } from "@/features/shared/sharedSlice";
import { useActiveCustomers } from "@/hooks/useCustomers";
import { DeletePopupIconSvg } from "@/services";
import { useDispatch, useSelector } from "react-redux";

function CustomersActive() {
  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const { blockConfirmHandler, isLoading } = useActiveCustomers();

  const successConfirmHandler = () => {};

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <CustomerActiveHeader />
      <CustomerActiveTable />

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

export default CustomersActive;
