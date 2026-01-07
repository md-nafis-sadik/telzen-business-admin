import { useSelector, useDispatch } from "react-redux";
import { toggleDetailsModal } from "@/features/shared/sharedSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function BrickStockDetailsModal() {
  const dispatch = useDispatch();
  const { showDetailsModal } = useSelector((state) => state.shared);
  const { selectedBrickStock } = useSelector((state) => state.brickStock);

  const closeModal = () => {
    dispatch(toggleDetailsModal(false));
  };

  return (
    <Dialog open={showDetailsModal} onOpenChange={closeModal}>
      <DialogContent className="p-10 gap-0 select-none rounded-3xl w-full sm:w-[566px]">
        <DialogHeader>
          <DialogTitle className="self-stretch w-full text-text-950 text-2xl font-bold leading-normal mb-6 font-hindSiliguri">
            Brick Stock Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="m-0" />

        <div className="flex flex-col gap-4 font-hindSiliguri">
          <div className="font-bold text-text-950 text-lg">
            Stock Information
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-700">Product ID:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.withdrawal_id || "DR-23121"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Name:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.name || "সান এক নাম্বার ইট"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Brick Field:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.brick_field || "আলিফ ইট ভাটা"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">১ হাজার:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.brick_type_1 || "5000"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">২ হাজার:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.brick_type_2 || "3000"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">৩০০০:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.brick_type_3 || "2000"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">গিলান:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.brick_type_4 || "1000"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">আপালা:</span>
              <span className="text-text-700 font-bold">
                {selectedBrickStock?.brick_type_5 || "500"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BrickStockDetailsModal;
