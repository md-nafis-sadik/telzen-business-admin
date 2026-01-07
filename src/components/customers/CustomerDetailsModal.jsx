import { useSelector, useDispatch } from "react-redux";
import { toggleDetailsModal } from "@/features/shared/sharedSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getCapitalFirstLetter } from "@/services";

function CustomerDetailsModal() {
  const dispatch = useDispatch();
  const { showDetailsModal } = useSelector((state) => state.shared);
  const { selectedData } = useSelector((state) => state.customers);

  const closeModal = () => {
    dispatch(toggleDetailsModal(false));
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "text-[#00AE5B]";
      case "blocked":
        return "text-[#FF4646]";
      default:
        return "text-text-700";
    }
  };

  return (
    <Dialog open={showDetailsModal} onOpenChange={closeModal}>
      <DialogContent className="p-10 gap-0 select-none rounded-3xl w-full sm:w-[566px]">
        <DialogHeader>
          <DialogTitle className="self-stretch w-full text-text-950 text-2xl font-bold leading-normal mb-6 font-hindSiliguri">
            Customer Details
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="m-0" />

        <div className="flex flex-col gap-4 font-hindSiliguri">
          <div className="font-bold text-text-950 text-lg">
            Customer Information
          </div>

          {/* Customer Details */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-text-700">Customer Name:</span>
              <span className="text-text-700 font-bold">
                {selectedData?.name || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Email:</span>
              <span className="text-text-700 font-bold">
                {selectedData?.email || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Phone:</span>
              <span className="text-text-700 font-bold">
                {selectedData?.phone || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">District:</span>
              <span className="text-text-700 font-bold">
                {selectedData?.district || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Upazila:</span>
              <span className="text-text-700 font-bold">
                {selectedData?.upazila || "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Join Date:</span>
              <span className="text-text-700 font-bold">
                {selectedData?.created_at
                  ? new Date(selectedData.created_at).toLocaleDateString()
                  : "-"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-text-700">Status:</span>
              <span
                className={`font-bold ${getStatusColor(selectedData?.status)}`}
              >
                {getCapitalFirstLetter(selectedData?.status) || "-"}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CustomerDetailsModal;
