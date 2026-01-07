import CustomerBlockedHeader from "@/components/customers/blocked/CustomerBlockedHeader";
import CustomerBlockedTable from "@/components/customers/blocked/CustomerBlockedTable";
import CustomerDetailsModal from "@/components/customers/CustomerDetailsModal";
import RequestLoader from "@/components/shared/RequestLoader";
import Modal from "@/components/shared/Modal";
import { useBlockedCustomers } from "@/hooks/useCustomers";
import { useSelector, useDispatch } from "react-redux";
import { toggleDeleteModal } from "@/features/shared/sharedSlice";
import { DeletePopupIconSvg } from "@/services";

function CustomersBlocked() {
  const dispatch = useDispatch();
  const { showDeleteModal } = useSelector((state) => state.shared);
  const { unblockConfirmHandler, isLoading } = useBlockedCustomers();

  const successConfirmHandler = () => {
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <CustomerBlockedHeader />
      <CustomerBlockedTable />
      <CustomerDetailsModal />

      <Modal
        confirmButtonClass="btn_green !bg-[#00AE5B] h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton="Unblock"
        title="Are you sure you want to unblock this customer?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="Once unblocked, the customer will regain access to their account."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showDeleteModal}
        onClose={() => {
          dispatch(toggleDeleteModal(false));
        }}
        confirmHandeler={unblockConfirmHandler}
      />

      {isLoading && <RequestLoader />}
    </div>
  );
}

export default CustomersBlocked;