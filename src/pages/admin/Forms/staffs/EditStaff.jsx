import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import PhoneInput from "@/components/shared/PhoneInput";
import RequestLoader from "@/components/shared/RequestLoader";
import SelectInput from "@/components/shared/SelectInput";
import StaffHelper from "@/components/staffs/StaffHelper";
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
        <h1 className="self-stretch justify-start text-text-700 text-lg font-semibold leading-relaxed">
          Edit Staff
        </h1>
      </div>
      <StaffHelper isFetching={isFetching} isError={isError} error={error}>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-end gap-10">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Staff Name"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter staff Staff name"
                name="name"
                defaultValue={singleStaff?.name}
                required
              />

              <Input
                label="Email"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter email address"
                name="email"
                type="email"
                defaultValue={singleStaff?.email}
                disabled
              />

              <PhoneInput
                label="Phone"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Enter number"
                name="phone"
                value={singleStaff?.phone}
                onChange={handlePhoneChange}
                country="bd"
                disabled
              />

              <SelectInput
                label="Role"
                labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
                placeholder="Select role"
                data={roleOptions}
                labelKey="name"
                selector="id"
                value={singleStaff?.role}
                onValueChange={setSelectedRole}
              />
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/admin/staffs" className="btn_cancel">
                CANCEL
              </Link>
              <button type="submit" className="btn_save" disabled={isUpdating}>
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
