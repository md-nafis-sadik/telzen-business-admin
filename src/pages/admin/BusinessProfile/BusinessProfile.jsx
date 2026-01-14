import { useState } from "react";
import ProfileSettingsForm from "@/components/businessProfile/ProfileSettingsForm";
import BusinessSettingsForm from "@/components/businessProfile/BusinessSettingsForm";
import { BuildingIconSvg, LockIconSvg } from "@/services";

function BusinessProfile() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <section className="w-full flex-1 flex flex-col overflow-auto rounded-2xl">
      <div className="w-full rounded-2xl overflow-hidden flex gap-6">
        {/* Tab Buttons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex items-center w-56 gap-2 px-6 py-4 rounded-xl text-sm transition-colors ${
              activeTab === "profile"
                ? "bg-main-700 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <LockIconSvg color={activeTab === "profile" ? "#fff" : "#4A4A4A"} />
            Profile Settings
          </button>

          <button
            onClick={() => setActiveTab("business")}
            className={`flex items-center w-56 gap-2 px-6 py-4 rounded-xl text-sm transition-colors ${
              activeTab === "business"
                ? "bg-main-700 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            <BuildingIconSvg
              color={activeTab === "business" ? "#fff" : "#4A4A4A"}
            />
            Business Settings
          </button>
        </div>

        {/* Form Content */}
        <div className="bg-white p-4 rounded-xl w-full">
          {activeTab === "profile" ? (
            <ProfileSettingsForm />
          ) : (
            <BusinessSettingsForm />
          )}
        </div>
      </div>
    </section>
  );
}

export default BusinessProfile;
