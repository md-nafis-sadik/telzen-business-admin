import LoadingInput from "../shared/LoadingInput";

function BrickSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4">
        <LoadingInput
          label="Product Name"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Brick Field"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Brick Class"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Brick Type"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <div className="grid grid-cols-3 gap-4 col-span-2">
          <LoadingInput
            label="Price Per Thousand"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          />

          <LoadingInput
            label="Minimum Order Quantity"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          />

          <LoadingInput
            label="Stock"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          />
        </div>

        <div className="col-span-2 flex flex-col gap-2">
          <label className="self-stretch justify-start text-gray-700 text-base font-normal leading-normal">
            Details
          </label>
          <div className="w-full h-[120px] bg-natural-200 rounded-md animate-pulse" />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-gray-700 text-base font-normal leading-normal">
            Preview Images (Upto 5)
          </label>
          <div className="flex gap-3 flex-wrap">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-[80px] h-[80px] bg-natural-200 rounded-md animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <div className="w-28 h-12 bg-main-50 rounded animate-pulse" />
        <div className="w-28 h-12 bg-main-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default BrickSkeleton;
