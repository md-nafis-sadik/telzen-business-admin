import LoadingInput from "../shared/LoadingInput";

function BusinessSettingsSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Form Fields Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <LoadingInput
          label="Package Discount Rate(%)"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Package Price Markup(%)"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
      </div>

      {/* Submit Button Skeleton */}
      <div className="flex justify-start">
        <div className="w-28 h-12 bg-natural-200 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}

export default BusinessSettingsSkeleton;
