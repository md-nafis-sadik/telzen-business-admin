import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import RequestLoader from "@/components/shared/RequestLoader";
import PhoneInput from "@/components/shared/PhoneInput";
import SelectInput from "@/components/shared/SelectInput";
import { useStaffMutations, usePhoneInput } from "@/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";

function AddStaff() {
  const { handleAddStaff, isAdding } = useStaffMutations();
  const [selectedRole, setSelectedRole] = useState("");
  const { phone, handlePhoneChange } = usePhoneInput("", "bd");

  const roleOptions = [
    { id: "manager", name: "Manager" },
    { id: "admin", name: "Admin" },
    { id: "supervisor", name: "Supervisor" },
    { id: "staff", name: "Staff" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.set("role", selectedRole);
    formData.set("phone", phone);
    const data = Object.fromEntries(formData);
    await handleAddStaff(data);
  };

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path="/admin/staffs" />
        <h1 className="self-stretch justify-start text-text-700 text-lg font-bold leading-relaxed">
          Add New Staff
        </h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-2 gap-6">
            <Input
              label="Full Name"
              labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
              placeholder="Enter staff full name"
              name="full_name"
              required
            />

            <Input
              label="Email"
              labelClass="self-stretch justify-start text-text-700 text-sm font-normal leading-normal"
              placeholder="Enter email address"
              name="email"
              type="email"
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

          <div className="flex gap-3">
            <Link to="/admin/staffs" className="btn_cancel !w-[112px]">
              CANCEL
            </Link>
            <button type="submit" className="btn_save w-[112px]" disabled={isAdding}>
              {isAdding ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </div>
        </div>
      </form>
      {isAdding && <RequestLoader />}
    </section>
  );
}

export default AddStaff;
