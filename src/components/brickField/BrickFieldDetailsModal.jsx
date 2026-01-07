import { useSelector, useDispatch } from "react-redux";
import { toggleDetailsModal } from "@/features/shared/sharedSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function BrickFieldDetailsModal() {
  const dispatch = useDispatch();
  const { showDetailsModal } = useSelector((state) => state.shared);
  const { selectedBrickField } = useSelector((state) => state.brickField);

  const closeModal = () => {
    dispatch(toggleDetailsModal(false));
  };

  return (
    <Dialog open={showDetailsModal} onOpenChange={closeModal}>
      <DialogContent className="p-10 gap-0 select-none rounded-3xl w-full sm:w-[566px]">
        <DialogHeader>
          <DialogTitle className="self-stretch w-full text-text-950 text-2xl font-bold leading-normal mb-6 font-hindSiliguri">
            Brick Field Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="m-0" />

        <div className="flex flex-col gap-4 font-hindSiliguri">
          <div className="font-bold text-text-950 text-lg">
            Brick Field Information
          </div>

          {/* BrickField Details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-700">Brick Field ID:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickField?.brick_field_id || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Brick Field Name:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickField?.brick_field_name || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Mobile Number:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickField?.phone || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Division:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickField?.division?.join(", ") || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">District:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickField?.district?.join(", ") || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Upazila:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickField?.sub_district?.join(", ") || "-"}
              </span>
            </div>
          </div>

          {/* Close Button */}
          {/* <div className="flex justify-end mt-6">
            <button
              onClick={closeModal}
              className="px-6 py-2 bg-main-600 text-white rounded-lg hover:bg-main-700 transition-colors"
            >
              Close
            </button>
          </div> */}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BrickFieldDetailsModal;
