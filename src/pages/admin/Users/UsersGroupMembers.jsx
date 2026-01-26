import Modal from "@/components/shared/Modal";
import UsersGroupMembersTable from "@/components/users/UsersGroupMembersTable";
import { DeletePopupIconSvg, successNotify, errorNotify } from "@/services";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeDeleteGroupModal } from "@/features/users/usersSlice";
import { useRemoveUserFromGroupMutation } from "@/features/users/usersApi";
import RequestLoader from "@/components/shared/RequestLoader";

function UsersGroupMembers() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { showDeleteGroupModal, selectedData } = useSelector((state) => state.users);

  const [removeUserFromGroup, { isLoading: isRemoveLoading }] =
    useRemoveUserFromGroupMutation();

  const handleRemoveConfirm = async () => {
    if (!selectedData?._id || !id) return;

    try {
      const response = await removeUserFromGroup({
        group_id: id,
        customer_id: selectedData._id,
      }).unwrap();

      dispatch(closeDeleteGroupModal());
      successNotify(response?.message || "User removed from group successfully!");
    } catch (error) {
      errorNotify(error?.data?.message || "Failed to remove user from group");
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <div className="mb-4">
        <h1 className="text-lg font-semibold">Group Users</h1>
        <p className="text-black-600 text-sm">View group members</p>
      </div>
      <UsersGroupMembersTable />
      {isRemoveLoading && <RequestLoader />}
      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton="Remove"
        title="Are you sure you want to remove this user from group?"
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara="The user will be removed from this group."
        popupIcon={<DeletePopupIconSvg />}
        showModal={showDeleteGroupModal}
        onClose={() => {
          dispatch(closeDeleteGroupModal());
        }}
        confirmHandeler={handleRemoveConfirm}
      />
    </div>
  );
}

export default UsersGroupMembers;
