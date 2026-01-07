import { useBrickList } from "@/hooks/useBrickList";
import { useSelector, useDispatch } from "react-redux";
import { toggleDetailsModal } from "@/features/shared/sharedSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function BrickListDetailsModal() {
  const dispatch = useDispatch();
  const { showDetailsModal } = useSelector((state) => state.shared);
  const { selectedBrickList, handleStatusChange, isStatusChanging } =
    useBrickList();

  const closeModal = () => {
    dispatch(toggleDetailsModal(false));
  };

  const handleComplete = () => {
    if (selectedBrickList?.withdrawal_id) {
      handleStatusChange(selectedBrickList.withdrawal_id, "completed");
    }
  };

  const handleReject = () => {
    if (selectedBrickList?.withdrawal_id) {
      handleStatusChange(selectedBrickList.withdrawal_id, "rejected");
    }
  };

  const getStatusColor = (status) => {
    if (typeof status === "boolean") {
      return status ? "text-[#00AE5B]" : "text-[#FF4646]";
    }
    switch (status?.toLowerCase()) {
      case "completed":
        return "text-[#00AE5B]";
      case "pending":
        return "text-[#FF9D00]";
      case "rejected":
        return "text-[#FF4646]";
      default:
        return "text-[#4F4F4F]";
    }
  };

  const isCompleted =
    selectedBrickList?.status === true ||
    (typeof selectedBrickList?.status === "string" &&
      selectedBrickList?.status?.toLowerCase() === "completed");
  const isRejected =
    selectedBrickList?.status === false ||
    (typeof selectedBrickList?.status === "string" &&
      selectedBrickList?.status?.toLowerCase() === "rejected");
  const isPending =
    typeof selectedBrickList?.status === "string" &&
    selectedBrickList?.status?.toLowerCase() === "pending";

  return (
    <Dialog open={showDetailsModal} onOpenChange={closeModal}>
      <DialogContent className="p-6 gap-0 select-none rounded-3xl w-full sm:w-[566px]">
        <DialogHeader>
          <DialogTitle className="self-stretch justify-center w-full text-center text-zinc-800 text-2xl font-bold leading-normal mb-6 font-hindSiliguri">
            BrickList Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="m-0" />

        <div className="flex flex-col gap-4 font-hindSiliguri">
          {/* BrickList Details */}
          <div className="space-y-3">
            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">Vendor:</span>
              <span className="text-[#4F4F4F] font-bold">
                {selectedBrickList?.vendor_name || "-"}
              </span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">SI ID:</span>
              <span className="text-[#4F4F4F] font-bold">
                {selectedBrickList?.withdrawal_id || "-"}
              </span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">Method:</span>
              <span className="text-[#4F4F4F] font-bold">
                {selectedBrickList?.method || "-"}
              </span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">Details:</span>
              <span className="text-[#4F4F4F] font-bold">
                {selectedBrickList?.details || "-"}
              </span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">Amount:</span>
              <span className="text-[#4F4F4F] font-bold">
                ${selectedBrickList?.amount || 0}
              </span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">Date:</span>
              <span className="text-[#4F4F4F] font-bold">
                {selectedBrickList?.date || "-"}
              </span>
            </div>

            <div className="grid grid-cols-2">
              <span className="font-medium text-[#4F4F4F]">Status:</span>
              <span
                className={`font-bold capitalize ${getStatusColor(
                  selectedBrickList?.status
                )}`}
              >
                {selectedBrickList?.status || "-"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            {isPending && (
              <>
                <button
                  className="px-6 py-3 bg-[#FF4646] hover:bg-red-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-[170px]"
                  onClick={handleReject}
                  disabled={isStatusChanging}
                >
                  {isStatusChanging ? "Processing..." : "Reject"}
                </button>
                <button
                  className="px-6 py-3 bg-[#00AE5B] hover:bg-green-600 text-white font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-[170px]"
                  onClick={handleComplete}
                  disabled={isStatusChanging}
                >
                  {isStatusChanging ? "Processing..." : "Complete"}
                </button>
              </>
            )}

            {(isCompleted || isRejected) && (
              <>
                <button
                  className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed opacity-50 w-[170px]"
                  disabled
                >
                  Reject
                </button>
                <button
                  className="px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed opacity-50 w-[170px]"
                  disabled
                >
                  Complete
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BrickListDetailsModal;
