import UsersActiveHeader from "@/components/users/active/UsersActiveHeader";
import UsersActiveRegularTable from "@/components/users/active/UsersActiveRegularTable";
import UsersActiveGroupTable from "@/components/users/active/UsersActiveGroupTable";
import { useUserTabs } from "@/hooks";
import Modal from "@/components/shared/Modal";
import { DeletePopupIconSvg, successNotify, errorNotify } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import {
  closeBlockModal,
  closeDeleteGroupModal,
  transferUserBetweenLists,
  removeGroupFromLists,
} from "@/features/users/usersSlice";
import {
  useUpdateCustomerBlockStatusMutation,
  useDeleteCustomerGroupMutation,
} from "@/features/users/usersApi";
import RequestLoader from "@/components/shared/RequestLoader";

function UsersActive() {
  const { currentTab } = useUserTabs("active");
  const dispatch = useDispatch();
  const { showBlockModal, showDeleteGroupModal, selectedData } = useSelector(
    (state) => state.users
  );

  const [updateCustomerBlockStatus, { isLoading: isBlockLoading }] =
    useUpdateCustomerBlockStatusMutation();
  const [deleteCustomerGroup, { isLoading: isDeleteLoading }] =
    useDeleteCustomerGroupMutation();

  const handleBlockConfirm = async () => {
    if (!selectedData?._id) return;

    try {
      const response = await updateCustomerBlockStatus({
        customer_id: selectedData._id,
        is_blocked: true,
      }).unwrap();

      dispatch(
        transferUserBetweenLists({
          userId: selectedData._id,
          toBlocked: true,
        })
      );

      dispatch(closeBlockModal());
      successNotify(response?.message || "User blocked successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to block user");
    }
  };

  const handleDeleteGroupConfirm = async () => {
    if (!selectedData?._id) return;

    try {
      const response = await deleteCustomerGroup({
        group_id: selectedData._id,
      }).unwrap();

      dispatch(
        removeGroupFromLists({
          groupId: selectedData._id,
          isBlocked: false,
        })
      );

      dispatch(closeDeleteGroupModal());
      successNotify(response?.message || "Group deleted successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to delete group");
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <UsersActiveHeader />
      <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
        <div>
          {currentTab === "regular" ? (
            <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
              Users
            </h1>
          ) : (
            <h1 className="self-stretch justify-start text-gray-100 text-lg font-semibold leading-relaxed">
              Groups
            </h1>
          )}
        </div>
        {currentTab === "regular" ? (
          <UsersActiveRegularTable />
        ) : (
          <UsersActiveGroupTable />
        )}
      </div>

      {isBlockLoading && <RequestLoader />}
      {isDeleteLoading && <RequestLoader />}

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton="Block"
        title="Are you sure you want to block this user?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="The user will no longer have access to their account."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showBlockModal}
        onClose={() => {
          dispatch(closeBlockModal());
        }}
        confirmHandeler={handleBlockConfirm}
      />

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton="Delete"
        title="Are you sure you want to delete this group?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="The group will no longer be available once deleted."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showDeleteGroupModal}
        onClose={() => {
          dispatch(closeDeleteGroupModal());
        }}
        confirmHandeler={handleDeleteGroupConfirm}
      />
    </div>
  );
}

export default UsersActive;
