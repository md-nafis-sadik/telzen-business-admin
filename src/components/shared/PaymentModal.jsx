import { useState, useEffect } from "react";
import { errorNotify } from "@/services";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

function PaymentModal({
  isOpen,
  onClose,
  title = "Commission Information",
  totalCommission = 10000,
  pendingCommission = 7000,
  onSubmit,
  isLoading = false,
}) {
  const [commissionAmount, setCommissionAmount] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setCommissionAmount("");
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    const amount = parseFloat(commissionAmount);
    
    if (!commissionAmount || amount <= 0) {
      errorNotify("Please enter a valid commission amount");
      return;
    }

    if (amount > pendingCommission) {
      errorNotify(`Amount cannot exceed pending commission (${pendingCommission.toLocaleString()})`);
      return;
    }

    try {
      await onSubmit(amount);
      setCommissionAmount("");
      onClose();
    } catch (error) {
      // Error already handled in parent
    }
  };

  const handleClose = () => {
    setCommissionAmount("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="p-8 gap-6 select-none rounded-2xl w-full max-w-xl font-hindSiliguri">
        <DialogHeader>
          <DialogTitle className="text-[28px] font-bold text-text-950 text-center font-hindSiliguri">
            {title}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="m-0" />

        <div className="space-y-6">
          <div className="space-y-3">
            {/* Commission Information Display */}
            <div className="flex justify-between items-center">
              <span className="text-text-700">Total Commission:</span>
              <span className="font-semibold text-text-950">
                {totalCommission.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-text-700">Pending Commission:</span>
              <span className="font-semibold text-text-950">
                {pendingCommission.toLocaleString()}
              </span>
            </div>

            {/* Input Field */}
            <div className="pt-2 flex items-center justify-between">
              <label className="block text-text-700 mb-3">
                Pay Commission:
              </label>
              <input
                type="number"
                placeholder="Commission Amount"
                className="w-full px-4 py-3 border border-natural-400 rounded-lg focus:outline-none focus:ring-0 focus:border-natural-500 max-w-[230px]"
                value={commissionAmount}
                onChange={(e) => setCommissionAmount(e.target.value)}
                min="0"
                max={pendingCommission}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 border-t border-natural-200 pt-6">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-main-600 text-main-600 rounded-lg font-medium hover:bg-main-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading || !commissionAmount}
              className="flex-1 py-3 px-4 bg-main-600 text-white rounded-lg font-medium hover:bg-main-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
