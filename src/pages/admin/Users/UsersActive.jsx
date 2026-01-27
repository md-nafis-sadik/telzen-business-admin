import UsersActiveHeader from "@/components/users/active/UsersActiveHeader";
import UsersActiveRegularTable from "@/components/users/active/UsersActiveRegularTable";
import { useActiveUsers } from "@/hooks";
import Modal from "@/components/shared/Modal";
import { DeletePopupIconSvg } from "@/services";
import {
  closeBlockModal,
  closeDeleteGroupModal,
} from "@/features/users/usersSlice";
import RequestLoader from "@/components/shared/RequestLoader";
import UsersGroupTable from "@/components/users/UsersGroupTable";

function UsersActive() {
  const {
    currentTab,
    isBlockLoading,
    isDeleteLoading,
    showBlockModal,
    handleBlockConfirm,
    showDeleteGroupModal,
    handleDeleteGroupConfirm,
    dispatch,
  } = useActiveUsers();

  return (
    <div className="w-full flex-1 flex flex-col gap-6">
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
          <UsersGroupTable />
        )}
      </div>

      {(isBlockLoading || isDeleteLoading) && <RequestLoader />}

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton={isBlockLoading ? "Blocking..." : "Block"}
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
        isLoading={isBlockLoading}
      />

      <Modal
        confirmButtonClass="btn_delete h-12 !w-full text-sm"
        cancelButtonClass="btn_cancel h-12 !w-full text-sm focus:outline-none"
        confirmButton={isDeleteLoading ? "Deleting..." : "Delete"}
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
        isLoading={isDeleteLoading}
      />
    </div>
  );
}

export default UsersActive;
