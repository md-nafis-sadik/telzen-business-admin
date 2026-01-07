import LoadingInput from "../shared/LoadingInput";

function OrderSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      <div className="grid grid-cols-2 gap-4">
        <LoadingInput
          label="Product Name"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Customer Name"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Phone Number"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />

        <LoadingInput
          label="Brick Type"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Address"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Product Quantity"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Delivery Charge"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Total Price"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Staff Assign"
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
        <LoadingInput
          label="Status"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
        <LoadingInput
          label="Sub Status"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
        />
      </div>

      <div className="flex justify-end gap-3">
        <div className="w-28 h-12 bg-main-50 rounded animate-pulse" />
        <div className="w-28 h-12 bg-main-600 rounded animate-pulse" />
      </div>
    </div>
  );
}

export default OrderSkeleton;
