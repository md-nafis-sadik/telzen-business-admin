import { useState, useEffect } from "react";
import CustomModal from "@/components/shared/CustomModal";
import SelectInput from "@/components/shared/SelectInput";
import LoadingInput from "@/components/shared/LoadingInput";
import { EditPenIconSvg } from "@/services";
import { useGetBrickStockHistoryQuery } from "@/features/brickStock/brickStockApi";
import { BRICK_TYPE_OPTIONS } from "@/services/data";

function BrickStockHistoryModal({ isOpen, onClose, selectedBrick, onEdit }) {
  const [selectedType, setSelectedType] = useState("ek_no_et");

  const { data: historyData, isFetching } = useGetBrickStockHistoryQuery(
    { brick_id: selectedBrick?._id },
    {
      skip: !isOpen || !selectedBrick?._id,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setSelectedType("ek_no_et");
  }, [selectedBrick?._id]);

  const currentHistory = historyData?.data?.[selectedType] || [];

  const formatDate = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <CustomModal showModal={isOpen} onClose={onClose} width="566px">
      <div className="flex flex-col gap-6 font-inter">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-text-700 text-3xl font-bold leading-normal">
              {selectedBrick?.product_name || "-"}
            </h2>
            <p className="text-text-500 text-sm">
              {selectedBrick?.brick_id || "-"}
            </p>
          </div>
          <div>
            <h2 className="text-main-700 text-lg leading-normal">
              {selectedBrick?.brick_field_name || "-"}
            </h2>
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

        {/* History List */}
        <div className="pr-2 border border-natural-400 rounded-xl p-4">
          <div className="max-h-[300px] overflow-y-auto ">
            {isFetching ? (
              <div className="flex items-center justify-center py-8">
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-main-500 border-r-transparent"
                  role="status"
                ></div>
              </div>
            ) : currentHistory.length > 0 ? (
              currentHistory.map((item, index) => (
                <div
                  key={item._id || index}
                  className="flex items-center justify-between px-4 py-2 bg-white-700 group hover:bg-white-900 transition-colors border-b last:border-b-0 border-natural-200"
                >
                  <div>
                    <p className="text-text-500 text-sm mb-1">
                      Date: {formatDate(item.created_at)}
                    </p>
                    <p className="text-text-950 font-semibold">
                      Quantity: {item.stock?.toLocaleString() || 0}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      onEdit(item);
                    }}
                    className="opacity-100 transition-opacity"
                    title="Edit"
                  >
                    <EditPenIconSvg />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-text-700 py-4 text-sm">
                No history available for this brick type
              </p>
            )}
          </div>
        </div>

        {/* Okay Button */}
        <button
          onClick={onClose}
          className="w-full h-12 rounded-lg bg-main-700 text-white text-sm font-semibold hover:bg-main-700 transition-colors"
        >
          Okay
        </button>
      </div>
    </CustomModal>
  );
}

export default BrickStockHistoryModal;
