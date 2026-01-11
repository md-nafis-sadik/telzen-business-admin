import StaffHelper from "@/components/staffs/StaffHelper";
import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import PhoneInput from "@/components/shared/PhoneInput";
import SelectInput from "@/components/shared/SelectInput";
import { useEditStaff } from "@/hooks";
import { Link } from "react-router-dom";

function EditStaff() {
  const {
    singleStaff,
    isFetching,
    isError,
    error,
    selectedRole,
    setSelectedRole,
    phone,
    handlePhoneChange,
    roleOptions,
    handleSubmit,
    isUpdating,
  } = useEditStaff();

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path="/admin/staffs" />
        <h1 className="self-stretch justify-start text-text-700 text-lg font-bold leading-relaxed">
          Edit Staff
        </h1>
      </div>
      <StaffHelper
        isFetching={isFetching}
        isError={isError}
        error={error}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-end gap-10">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Full Name"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter staff full name"
                name="full_name"
                defaultValue={singleStaff?.full_name}
                required
              />

              <Input
                label="Email"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter email address"
                name="email"
                type="email"
                defaultValue={singleStaff?.email}
                required
              />

              <PhoneInput
                label="Phone"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter number"
                name="phone"
                value={phone}
                onChange={handlePhoneChange}
                country="bd"
                required
              />

              <SelectInput
                label="Role"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Select role"
                data={roleOptions}
                labelKey="name"
                selector="id"
                value={selectedRole}
                onValueChange={setSelectedRole}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/admin/staffs" className="btn_cancel !w-[112px]">
                CANCEL
              </Link>
              <button type="submit" className="btn_save w-[112px]" disabled={isUpdating}>
                {isUpdating ? "UPDATING..." : "UPDATE"}
              </button>
            </div>
          </div>
        </form>
      </StaffHelper>
      {isUpdating && <RequestLoader />}
    </section>
  );
}

export default EditStaff;
