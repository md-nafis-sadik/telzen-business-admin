import { useSelector } from "react-redux";
import Input from "@/components/shared/Input";
import {
  useUpdateBusinessProfileMutation,
  useGetUserProfileQuery,
} from "@/features/auth/authApi";
import { successNotify, errorNotify } from "@/services";
import BusinessSettingsHelper from "./BusinessSettingsHelper";
import RequestLoader from "@/components/shared/RequestLoader";

function BusinessSettingsForm() {
  const { profile } = useSelector((state) => state.auth);
  const [updateBusinessProfile, { isLoading: isUpdating }] =
    useUpdateBusinessProfileMutation();
  const { isFetching, isError, error } = useGetUserProfileQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const discountRate = e.target.discountRate.value;
    const priceMarkup = e.target.priceMarkup.value;

    const dataToSend = {
      markup_percentage: {
        discount: parseInt(discountRate) || 0,
        price_increase: parseInt(priceMarkup) || 0,
      },
    };

    try {
      await updateBusinessProfile(dataToSend).unwrap();
      successNotify("Business settings updated successfully");
    } catch (error) {
      console.error("Failed to update business settings:", error);
      errorNotify(error?.data?.message || "Failed to update business settings");
    }
  };

  return (
    <BusinessSettingsHelper
      isFetching={isFetching}
      isError={isError}
      error={error}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Package Discount Rate and Package Price Markup - Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Package Discount Rate(%)"
            type="text"
            name="discountRate"
            defaultValue={
              profile?.business?.markup_percentage?.discount?.toString() || ""
            }
            placeholder="10"
            className="w-full"
            disabled
          />

          <Input
            label="Package Price Markup(%)"
            type="text"
            name="priceMarkup"
            defaultValue={
              profile?.business?.markup_percentage?.price_increase?.toString() ||
              ""
            }
            placeholder="10"
            className="w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="">
          <button type="submit" className="btn_save" disabled={isUpdating}>
            {isUpdating ? "UPDATING..." : "SUBMIT"}
          </button>
        </div>
      </form>
      {isUpdating && <RequestLoader />}
    </BusinessSettingsHelper>
  );
}

export default BusinessSettingsForm;
