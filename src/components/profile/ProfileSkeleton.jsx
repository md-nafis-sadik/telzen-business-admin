import { adminRouteLinks, images } from "@/services";
import BackToPrev from "../shared/BackToPrev";
import LoadingInput from "../shared/LoadingInput";
import { empty } from "@/services/images";

function ProfileSkeleton() {
  return (
    <>
      <section className="bg-white p-4 flex flex-col gap-4 rounded-2xl">
        <div className="flex gap-1">
          <BackToPrev path={adminRouteLinks.dashboard.path} />
          <h1 className="self-stretch justify-start text-gray-700 text-lg font-semibold leading-relaxed">
            My Profile
          </h1>
        </div>
        <div className="w-[105px] h-[105px] animate-pulse rounded-full bg-neutral-400 flex items-center justify-center"></div>

        <div className="grid grid-cols-2 gap-4">
          <LoadingInput
            label="Name"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          />
          <LoadingInput
            label="User Role"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          />
          <LoadingInput
            label="Email"
            labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          />
        </div>
      </section>
    </>
  );
}

export default ProfileSkeleton;
