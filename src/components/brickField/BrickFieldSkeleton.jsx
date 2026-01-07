import LoadingInput from "../shared/LoadingInput";

function BrickFieldSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4">
        <LoadingInput
          label="Brick Field Name"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Mobile Number"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Division"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="District"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Upazila"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
      </div>

      <div className="flex justify-end gap-3">
        <div className="w-28 h-12 bg-main-50 rounded animate-pulse" />
        <div className="w-28 h-12 bg-main-700 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default BrickFieldSkeleton;
