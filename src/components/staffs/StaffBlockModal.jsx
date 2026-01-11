// import { Modal } from "@/components/ui/modal";
import { BlockPopupIconSvg } from "@/services";
import { useStaffs } from "@/hooks";
import Modal from "../shared/Modal";

const StaffBlockModal = () => {
  const {
    showBlockModal,
    selectedStaffForBlock,
    isChangingStatus,
    handleCloseBlockModal,
    handleBlockStaff,
  } = useStaffs();

  return (
    <Modal open={showBlockModal} onOpenChange={handleCloseBlockModal}>
      <div className="w-full max-w-md p-6 rounded-lg bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center items-center">
            <BlockPopupIconSvg />
          </div>

          <div className="flex flex-col items-center gap-3">
            <h3 className="text-gray-100 text-xl font-semibold text-center">
              Block Staff?
            </h3>
            <p className="text-black-600 text-sm text-center">
              Are you sure you want to block{" "}
              <span className="font-semibold">
                {selectedStaffForBlock?.full_name || "this staff"}
              </span>
              ? They will not be able to access their account.
            </p>
          </div>

          <div className="w-full flex gap-4">
            <button
              onClick={handleCloseBlockModal}
              disabled={isChangingStatus}
              className="flex-1 h-12 px-6 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleBlockStaff}
              disabled={isChangingStatus}
              className="flex-1 h-12 px-6 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isChangingStatus ? "Blocking..." : "Block"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StaffBlockModal;
