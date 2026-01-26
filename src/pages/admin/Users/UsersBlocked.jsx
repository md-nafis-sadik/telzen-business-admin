import UsersBlockedHeader from "@/components/users/blocked/UsersBlockedHeader";
import UsersBlockedRegularTable from "@/components/users/blocked/UsersBlockedRegularTable";
import { useBlockedUsers } from "@/hooks";
import Modal from "@/components/shared/Modal";
import { DeletePopupIconSvg } from "@/services";
import {
  closeUnblockModal,
  closeDeleteGroupModal,
} from "@/features/users/usersSlice";
import RequestLoader from "@/components/shared/RequestLoader";
import UsersGroupTable from "@/components/users/UsersGroupTable";

function UsersBlocked() {
  const {
    currentTab,
    isUnblockLoading,
    isDeleteLoading,
    handleUnblockConfirm,
    showUnblockModal,
    showDeleteGroupModal,
    handleDeleteGroupConfirm,
    dispatch,
  } = useBlockedUsers();

  return (
    <div className="w-full flex flex-col gap-6">
      <UsersBlockedHeader />
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
          <UsersBlockedRegularTable />
        ) : (
          <UsersGroupTable />
        )}
      </div>

      {isUnblockLoading && <RequestLoader />}
      {isDeleteLoading && <RequestLoader />}

      <Modal
        confirmButtonClass="btn_green !bg-[#00AE5B] h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm"
        confirmButton="Unblock"
        title="Are you sure you want to unblock this user?"
        actionPara="Once unblocked, this user will regain access to their account."
        cancelButton="No, Thanks"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionText="unblock"
        typeText="user"
        popupIcon={<DeletePopupIconSvg />}
        confirmHandeler={handleUnblockConfirm}
        showModal={showUnblockModal}
        onClose={() => dispatch(closeUnblockModal())}
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

export default UsersBlocked;
