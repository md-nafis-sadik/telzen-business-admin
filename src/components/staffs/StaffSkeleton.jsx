import LoadingInput from "../shared/LoadingInput";

function StaffSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4">
        <LoadingInput
          label="Staff Name"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Mobile Number"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Commission Per Trip"
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

      <div className="flex gap-3 w-36 h-24 animate-pulse bg-natural-200 rounded-lg"></div>

      <div className="flex justify-end gap-3">
        <div className="w-28 h-12 bg-main-50 rounded animate-pulse" />
        <div className="w-28 h-12 bg-main-600 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default StaffSkeleton;
