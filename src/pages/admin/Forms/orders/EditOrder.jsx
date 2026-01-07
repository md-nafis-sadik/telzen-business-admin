import OrderHelper from "@/components/orders/OrderHelper";
import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import SelectInput from "@/components/shared/SelectInput";
import LoadingInput from "@/components/shared/LoadingInput";
import { useEditOrder } from "@/hooks/useOrders";
import { Link } from "react-router-dom";

function EditOrder() {
  const {
    upIsFetching,
    upIsError,
    upError,
    singleOrder,
    isLoading,
    handleSubmit,
    staffList,
    isLoadingStaff,
    statusOptions,
    getBackPath,
    divisions,
    districts,
    upazilas,
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
    selectedDivision,
    selectedDistrict,
    selectedUpazila,
    selectedBrickType,
    selectedStaff,
    selectedStatus,
    handleDivisionChange,
    handleDistrictChange,
    handleUpazilaChange,
    handleBrickTypeChange,
    handleStaffChange,
    handleStatusChange,
    selectedSubStatus,
    subStatusOptions,
    handleSubStatusChange,
    brickTypeOptions,
    isLoadingBrickTypes,
    quantity,
    deliveryCharge,
    totalPrice,
    handleQuantityChange,
    handleDeliveryChargeChange,
    handleTotalPriceChange,
    isEnabled,
  } = useEditOrder();

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path={getBackPath()} />
        <h1 className="self-stretch justify-start text-gray-700 text-lg font-semibold leading-relaxed">
          Order ID #{upIsFetching ? "Loading..." : singleOrder?.order_id || "-"}
        </h1>
      </div>
      <OrderHelper
        isFetching={upIsFetching}
        isError={upIsError}
        error={upError}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-10">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Product Name"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter product name"
                name="product_name"
                defaultValue={singleOrder?.product_name || ""}
                required
                disabled
              />
              <Input
                label="Customer Name"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter customer name"
                name="name"
                disabled
                defaultValue={singleOrder?.name || ""}
                required
              />

              <Input
                label="Phone Number"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter phone number"
                name="phone"
                type="tel"
                disabled
                defaultValue={singleOrder?.phone || ""}
                required
              />

              <div>
                <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                  Brick Type
                </label>
                {upIsFetching || isLoadingBrickTypes ? (
                  <LoadingInput />
                ) : (
                  <SelectInput
                    value={selectedBrickType}
                    onValueChange={handleBrickTypeChange}
                    data={brickTypeOptions}
                    selector="id"
                    labelKey="label"
                    placeHolder="Select brick type"
                    disabled={!isEnabled}
                    name="brick_type"
                  />
                )}
              </div>

              <Input
                label="Address"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter address"
                name="delivery_address"
                disabled={!isEnabled}
                defaultValue={singleOrder?.delivery_address || ""}
                required
              />

              <Input
                label="Product Quantity"
                type="number"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter quantity"
                name="order_quantity"
                disabled={!isEnabled}
                value={quantity}
                onChange={handleQuantityChange}
                required
              />

              <Input
                label="Delivery Charge"
                type="number"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter delivery charge"
                name="delivery_charge"
                disabled={!isEnabled}
                value={deliveryCharge}
                onChange={handleDeliveryChargeChange}
                required
              />

              <Input
                label="Total Price"
                type="number"
                labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
                placeholder="Enter total price"
                name="total_price"
                disabled={!isEnabled}
                value={totalPrice}
                onChange={handleTotalPriceChange}
                required
              />

              <div>
                <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                  Division
                </label>
                {divisionsLoading ? (
                  <LoadingInput />
                ) : (
                  <SelectInput
                    value={selectedDivision}
                    onValueChange={handleDivisionChange}
                    data={divisions}
                    selector="id"
                    labelKey="bn_name"
                    placeHolder="Select division"
                    disabled={!isEnabled}
                    name="division"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                  District
                </label>
                {districtsLoading ? (
                  <LoadingInput />
                ) : (
                  <SelectInput
                    value={selectedDistrict}
                    onValueChange={handleDistrictChange}
                    data={districts}
                    selector="id"
                    labelKey="bn_name"
                    placeHolder="Select district"
                    name="district"
                    disabled={!selectedDivision || !isEnabled}
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                  Upazila
                </label>
                {upazilasLoading ? (
                  <LoadingInput />
                ) : (
                  <SelectInput
                    value={selectedUpazila}
                    onValueChange={handleUpazilaChange}
                    data={upazilas}
                    selector="id"
                    labelKey="bn_name"
                    placeHolder="Select upazila"
                    name="sub_district"
                    disabled={!selectedDistrict || !isEnabled}
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                  Staff Assign
                </label>
                {upIsFetching || isLoadingStaff ? (
                  <LoadingInput />
                ) : (
                  <SelectInput
                    value={selectedStaff}
                    onValueChange={handleStaffChange}
                    data={staffList}
                    placeHolder={isLoadingStaff ? "Loading..." : "Select Staff"}
                    labelKey="label"
                    selector="id"
                    disabled={!isEnabled}
                    name="staff"
                  />
                )}
              </div>

              <div>
                <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                  Status
                </label>
                {upIsFetching ? (
                  <LoadingInput />
                ) : (
                  <SelectInput
                    value={selectedStatus}
                    onValueChange={handleStatusChange}
                    data={statusOptions}
                    placeHolder="Select Status"
                    labelKey="label"
                    selector="id"
                    name="status"
                  />
                )}
              </div>

              {subStatusOptions && subStatusOptions.length > 0 && (
                <div>
                  <label className="block text-gray-700 text-base font-normal leading-normal mb-2">
                    Sub Status
                  </label>
                  {upIsFetching ? (
                    <LoadingInput />
                  ) : (
                    <SelectInput
                      value={selectedSubStatus}
                      onValueChange={handleSubStatusChange}
                      data={subStatusOptions}
                      placeHolder="Select Sub Status"
                      labelKey="label"
                      selector="id"
                      name="sub_status"
                    />
                  )}
                </div>
              )}

              {singleOrder?.payment_slip && (
                <div className="col-span-2">
                  <label className="self-stretch justify-start text-gray-700 text-base font-normal leading-normal mb-2 block">
                    Payment Proof
                  </label>
                  <img
                    src={singleOrder.payment_slip}
                    alt="Payment Proof"
                    className="w-24 h-24 object-cover rounded border border-gray-200"
                  />
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3">
              <Link to={getBackPath()} className="btn_cancel w-[112px]">
                Cancel
              </Link>
              <button
                type="submit"
                className="btn_save w-[112px]"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </OrderHelper>
      {isLoading && <RequestLoader />}
    </section>
  );
}

export default EditOrder;
