import { useState, useEffect } from "react";
import CustomModal from "@/components/shared/CustomModal";
import Input from "@/components/shared/Input";
import { getBrickTypeLabel } from "@/services/helper/common.helper";

function BrickStockEditModal({
  isOpen,
  onClose,
  selectedHistory,
  selectedBrick,
  onConfirm,
  isSubmitting = false,
}) {
  const [editedStock, setEditedStock] = useState("");

  useEffect(() => {
    if (isOpen && selectedHistory?.stock !== undefined) {
      setEditedStock(selectedHistory.stock.toString());
    }
  }, [isOpen, selectedHistory]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB");
  };

  const handleSubmit = () => {
    if (editedStock && selectedHistory?._id) {
      onConfirm({
        _id: selectedHistory._id,
        quantity: parseInt(editedStock),
      });
    }
  };

  const handleClose = () => {
    setEditedStock("");
    onClose();
  };

  return (
    <CustomModal showModal={isOpen} onClose={handleClose} width="566px">
      <div className="flex flex-col gap-6 font-hindSiliguri">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-text-700 text-2xl font-bold leading-normal">
              {selectedBrick?.product_name || "-"}
            </h2>
            <p className="text-text-700 text-sm">
              {getBrickTypeLabel(selectedHistory?.brick_type)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-text-700 text-sm">
              Date: {formatDate(selectedHistory?.created_at)}
            </p>
          </div>
        </div>

        {/* Added Stock */}
        <div>
          <label className="block text-text-700 text-sm font-medium mb-2">
            Stock Quantity
          </label>
          <Input
            type="number"
            value={editedStock}
            onChange={(e) => setEditedStock(e.target.value)}
            placeholder="Enter Number"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={handleClose}
            className="flex-1 h-12 rounded-lg border border-main-600 text-main-600 text-sm font-semibold hover:bg-main-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!editedStock || isSubmitting}
            className="flex-1 h-12 rounded-lg bg-main-600 text-white text-sm font-semibold hover:bg-main-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Update
          </button>
        </div>
      </div>
    </CustomModal>
  );
}

export default BrickStockEditModal;
