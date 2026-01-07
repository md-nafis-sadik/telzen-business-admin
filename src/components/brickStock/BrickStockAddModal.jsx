import { useState, useEffect } from "react";
import CustomModal from "@/components/shared/CustomModal";
import SelectInput from "@/components/shared/SelectInput";
import Input from "@/components/shared/Input";
import LoadingInput from "@/components/shared/LoadingInput";
import { useGetBrickStockDetailsQuery } from "@/features/brickStock/brickStockApi";
import { BRICK_TYPE_OPTIONS } from "@/services/data";

function BrickStockAddModal({
  isOpen,
  onClose,
  selectedBrick,
  onConfirm,
  isSubmitting = false,
}) {
  const [selectedType, setSelectedType] = useState("");
  const [addedStock, setAddedStock] = useState("");

  const {
    data: stockDetails,
    isFetching,
    refetch,
  } = useGetBrickStockDetailsQuery(
    { brick_id: selectedBrick?._id },
    {
      skip: !isOpen || !selectedBrick?._id,
      refetchOnMountOrArgChange: true,
    }
  );

  // Reset fields when selectedBrick changes
  useEffect(() => {
    setSelectedType("");
    setAddedStock("");
  }, [selectedBrick?._id]);

  const currentStock =
    stockDetails?.data?.find((item) => item.brick_type === selectedType)
      ?.stock || 0;

  const handleSubmit = () => {
    if (selectedType && addedStock && selectedBrick?._id) {
      const quantity = parseInt(addedStock);
      if (isNaN(quantity) || quantity <= 0) {
        return;
      }
      onConfirm({
        _id: selectedBrick._id,
        brick_type: selectedType,
        quantity: quantity,
      });
    }
  };

  const handleClose = () => {
    setSelectedType("");
    setAddedStock("");
    onClose();
  };

  return (
    <CustomModal showModal={isOpen} onClose={handleClose} width="566px">
      <div className="flex flex-col gap-6 font-hindSiliguri">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-text-950 text-3xl font-bold leading-normal">
              {selectedBrick?.product_name || "-"}
            </h2>
            <p className="text-text-500 text-sm">
              {selectedBrick?.brick_id || "-"}
            </p>
          </div>
          <div className="text-right">
            <p className="text-main-600 text-base">
              {selectedBrick?.brick_field_name || "-"}
            </p>
          </div>
        </div>

        {/* Brick Type Select */}
        <div>
          <label className="block text-text-700 text-sm font-medium mb-2">
            Brick Type
          </label>
          {isFetching ? (
            <LoadingInput />
          ) : (
            <SelectInput
              value={selectedType}
              onValueChange={setSelectedType}
              data={BRICK_TYPE_OPTIONS}
              selector="id"
              labelKey="label"
              placeHolder="Select brick type"
            />
          )}
        </div>

        {/* Current Stock */}
        {selectedType && (
          <div>
            <label className="block text-text-700 text-sm font-medium mb-2">
              Current Stock
            </label>
            {isFetching ? (
              <LoadingInput />
            ) : (
              <Input
                type="number"
                value={currentStock}
                placeholder="0"
                readOnly
              />
            )}
          </div>
        )}

        {/* Add Stock */}
        <div>
          <label className="block text-text-700 text-sm font-medium mb-2">
            Add Stock
          </label>
          {isFetching ? (
            <LoadingInput />
          ) : (
            <Input
              type="number"
              value={addedStock}
              onChange={(e) => setAddedStock(e.target.value)}
              placeholder="Enter Number"
            />
          )}
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
            disabled={!selectedType || !addedStock || isSubmitting}
            className="flex-1 h-12 rounded-lg bg-main-600 text-white text-sm font-semibold hover:bg-main-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Update
          </button>
        </div>
      </div>
    </CustomModal>
  );
}

export default BrickStockAddModal;
