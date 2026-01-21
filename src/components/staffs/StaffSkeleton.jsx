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
          label="Email"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Phone"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Role"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
      </div>

      {/* <div className="flex gap-3 w-36 h-24 animate-pulse bg-natural-200 rounded-lg"></div> */}
      <div className="flex justify-end gap-3">
        <div className="w-28 h-12 bg-natural-200 rounded-lg animate-pulse" />
        <div className="w-28 h-12 bg-natural-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export default StaffSkeleton;
