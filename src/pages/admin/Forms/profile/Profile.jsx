import ProfileSkeleton from "@/components/profile/ProfileSkeleton";
import BackToPrev from "@/components/shared/BackToPrev";
import Input from "@/components/shared/Input";
import { useProfile } from "@/hooks";

function Profile() {
  const {
    isFetching,
    isError,
    isUploading,
    userData,
    getImageSrc,
    isNotFound,
    backPath,
    empty,
  } = useProfile();

  if (isFetching) {
    return <ProfileSkeleton />;
  }

  if (isError) {
    return (
      <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
        <div className="flex gap-1">
          <BackToPrev path={backPath} />
          <h1 className="self-stretch justify-start text-gray-700 text-lg font-semibold leading-relaxed">
            My Profile
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center py-12 px-4">
          <div className="w-24 h-24 mb-4 flex items-center justify-center">
            <img src={empty} alt="" className="w-48" />
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {isNotFound ? "Profile Not Available" : "Something went wrong"}
          </h3>

          <p className="text-gray-600 text-center mb-4 max-w-md">
            {isNotFound
              ? "Your profile information is currently unavailable."
              : "We couldn't load your profile information. Please try again later."}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-200 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  const userRole =
    userData.role === "super-admin"
      ? "Admin"
      : userData.role === "manager"
      ? "Manager"
      : "Customer Manager";

  return (
    <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
      <div className="flex gap-1">
        <BackToPrev path={backPath} />
        <h1 className="self-stretch justify-start text-gray-700 text-lg font-semibold leading-relaxed">
          My Profile
        </h1>
      </div>

      <div className="relative w-[105px] h-[105px]">
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center z-10">
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <img
          src={getImageSrc()}
          className="w-full h-full rounded-full object-cover"
        />

        {/* <button
          className="absolute right-[-11px] bottom-3 p-1 rounded-full hover:scale-105 transition-all"
          onClick={handleEditClick}
          disabled={isUploading}
        >
          <ProfileEditIconSvg className="w-5 h-5" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        /> */}
      </div>

      <div className="flex flex-col gap-10">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Name"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
            placeholder="Enter name"
            value={userData?.name || ""}
            readOnly
          />

          <Input
            label="User Role"
            type="user_role"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
            placeholder="Enter User Role"
            value={userRole || ""}
            readOnly
          />

          <Input
            label="Email"
            type="email"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
            placeholder="Enter Email"
            value={userData?.email || ""}
            readOnly
          />
        </div>
      </div>
    </section>
  );
}
export default Profile;
