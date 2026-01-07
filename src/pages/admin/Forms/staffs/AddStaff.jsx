import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import MultiSelectInput from "@/components/shared/MultiSelectInput";
import SelectSkeleton from "@/components/shared/SelectSkeleton";
import ImageUpload from "@/components/shared/ImageUpload";
import { useAddStaff } from "@/hooks/useStaff";
import { Link } from "react-router-dom";

function AddStaff() {
  const {
    handleSubmit,
    isLoading,
    divisions,
    districts,
    upazilas,
    divisionsLoading,
    districtsLoading,
    upazilasLoading,
    selectedDivisions,
    selectedDistricts,
    selectedSubDistricts,
    handleDivisionChange,
    handleDistrictChange,
    handleSubDistrictChange,
    imagePreviews,
    handleImageUpload,
    removeImage,
    imageInputKey,
  } = useAddStaff();

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path="/admin/staffs/active" />
        <h1 className="self-stretch justify-start text-text-700 text-lg font-bold leading-relaxed">
          Add New Staff
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col justify-end gap-10">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Full Name"
              labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
              placeholder="Enter staff full name"
              name="full_name"
              required
            />

            <Input
              label="Mobile Number"
              labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
              placeholder="Enter mobile number"
              name="phone"
              type="tel"
              required
            />

            <Input
              label="Commission Per Trip"
              labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
              placeholder="Enter commission per trip"
              name="commission_rate"
              type="number"
              required
            />
            <br />

            {divisionsLoading ? (
              <SelectSkeleton
                label="Division"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                triggerClassName="w-full min-h-[48px]"
              />
            ) : (
              <MultiSelectInput
                label="Division"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                data={divisions}
                placeholder="Select divisions"
                labelKey="bn_name"
                selector="id"
                value={selectedDivisions}
                onChange={handleDivisionChange}
                chips={true}
              />
            )}

            {districtsLoading ? (
              <SelectSkeleton
                label="District"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                triggerClassName="w-full min-h-[48px]"
              />
            ) : (
              <MultiSelectInput
                label="District"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                data={districts}
                placeholder="Select districts"
                labelKey="bn_name"
                selector="id"
                value={selectedDistricts}
                onChange={handleDistrictChange}
                chips={true}
                disabled={selectedDivisions.length === 0}
              />
            )}

            {upazilasLoading ? (
              <SelectSkeleton
                label="Upazila"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                triggerClassName="w-full min-h-[48px]"
              />
            ) : (
              <MultiSelectInput
                label="Upazila"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                data={upazilas}
                placeholder="Select upazilas"
                labelKey="bn_name"
                selector="id"
                value={selectedSubDistricts}
                onChange={handleSubDistrictChange}
                chips={true}
                disabled={selectedDistricts.length === 0}
              />
            )}
          </div>

          {/* Avatar Upload Section */}
          <div className="flex flex-col gap-4">
            <label className="text-text-700 self-stretch justify-start text-base font-medium leading-normal">
              Avatar
            </label>

            <ImageUpload
              key={imageInputKey}
              id="avatar-upload"
              multiple={false}
              maxFiles={1}
              previews={imagePreviews}
              onUpload={handleImageUpload}
              onRemove={removeImage}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Link to="/admin/staffs/active" className="btn_cancel !w-[112px]">
              Cancel
            </Link>
            <button type="submit" className="btn_save w-[112px]">
              Add
            </button>
          </div>
        </div>
      </form>
      {isLoading && <RequestLoader />}
    </section>
  );
}

export default AddStaff;
