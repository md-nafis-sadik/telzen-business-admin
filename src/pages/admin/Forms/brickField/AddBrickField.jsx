import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import MultiSelectInput from "@/components/shared/MultiSelectInput";
import SelectSkeleton from "@/components/shared/SelectSkeleton";
import { Link } from "react-router-dom";
import { useAddBrickField } from "@/hooks/useBrickField";

function AddBrickField() {
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
  } = useAddBrickField();

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path="/admin/brick-field" />
        <h1 className="self-stretch justify-start text-gray-700 text-lg font-semibold leading-relaxed">
          Add New Field
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Brick Field Name"
              labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
              placeholder="Enter brick field name"
              name="brick_field_name"
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

          <div className="flex justify-end gap-3">
            <Link to="/admin/brick-field" className="btn_cancel !w-[112px]">
              Cancel
            </Link>
            <button type="submit" className="btn_save w-[112px]">
              Save
            </button>
          </div>
        </div>
      </form>
      {isLoading && <RequestLoader />}
    </section>
  );
}

export default AddBrickField;
