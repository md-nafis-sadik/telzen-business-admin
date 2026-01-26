import { useSelector } from "react-redux";
import Input from "@/components/shared/Input";
import { BigBuildingIconSvg, successNotify, errorNotify } from "@/services";
import DocumentShow from "@/components/shared/DocumentShow";
import {
  useUpdateBusinessProfileMutation,
  useGetUserProfileQuery,
} from "@/features/auth/authApi";
import BusinessProfileHelper from "./BusinessProfileHelper";
import RequestLoader from "@/components/shared/RequestLoader";

function ProfileSettingsForm() {
  const { profile } = useSelector((state) => state.auth);
  const [updateBusinessProfile, { isLoading: isUpdating }] =
    useUpdateBusinessProfileMutation();
  const { isFetching, isError, error } = useGetUserProfileQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const businessName = e.target.businessName.value;
    const contactPerson = e.target.contactPerson.value;

    const dataToSend = {
      business_name: businessName,
      contact_person_name: contactPerson,
    };

    try {
      await updateBusinessProfile(dataToSend).unwrap();
      successNotify("Profile updated successfully");
    } catch (error) {
      console.error("Failed to update profile:", error);
      errorNotify(error?.data?.message || "Failed to update profile");
    }
  };

  return (
    <BusinessProfileHelper
      isFetching={isFetching}
      isError={isError}
      error={error}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Icon */}
        <div className="flex mb-6">
          <div className="w-32 h-32 bg-natural-100 rounded-full flex items-center justify-center">
            <BigBuildingIconSvg />
          </div>
        </div>

        {/* Business Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Business Name"
            type="text"
            name="businessName"
            defaultValue={profile?.business?.name || ""}
            placeholder="Enter business name"
            className="w-full"
            required
          />
        </div>
        {/* Email and Country - Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Email"
            type="email"
            name="email"
            value={profile?.business?.email || profile?.email || ""}
            placeholder="business@email.com"
            className="w-full"
            disabled
          />

          <Input
            label="Country"
            type="text"
            name="country"
            value={profile?.country?.name || ""}
            placeholder="Select country"
            className="w-full"
            disabled
          />

          {/* Phone Number and Contact Person - Row */}

          <Input
            label="Phone"
            type="tel"
            name="phoneNumber"
            value={profile?.phone || ""}
            placeholder="+44 1234567890"
            className="w-full"
            disabled
          />

          <Input
            label="Contact Person"
            type="text"
            name="contactPerson"
            defaultValue={profile?.business?.contact_person_name || ""}
            placeholder="Enter contact person name"
            className="w-full"
            required
          />
        </div>

        {/* Document */}
        {profile?.business?.document && (
          <div>
              <DocumentShow
                title={profile?.business?.document?.original_name || "Document"}
                fileUrl={profile?.business?.document?.path || ""}
              />
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button type="submit" className="btn_save" disabled={isUpdating}>
            {isUpdating ? "UPDATING..." : "SUBMIT"}
          </button>
        </div>
      </form>
      {isUpdating && <RequestLoader />}
    </BusinessProfileHelper>
  );
}

export default ProfileSettingsForm;
