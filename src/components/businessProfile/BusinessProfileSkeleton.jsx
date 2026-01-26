import LoadingInput from "../shared/LoadingInput";

function BusinessProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Business Icon Skeleton */}
      <div className="flex">
        <div className="w-32 h-32 bg-natural-200 rounded-full animate-pulse" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LoadingInput
          label="Business Name"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LoadingInput
          label="Email"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Country"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Phone"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Contact Person"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <div className="flex justify-start">
        <div className="w-40 h-6 bg-natural-200 rounded-lg animate-pulse" />
      </div>
      </div>

      {/* Submit Button Skeleton */}
      <div className="flex justify-start">
        <div className="w-28 h-12 bg-natural-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export default BusinessProfileSkeleton;
