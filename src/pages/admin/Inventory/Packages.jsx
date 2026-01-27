import PackageCard from "@/components/inventory/PackageCard";
import PackageCardSkeleton from "@/components/inventory/PackageCardSkeleton";
import { usePackages } from "@/hooks";

function Packages() {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    name,
    formatDataSize,
    handlePackageClick,
  } = usePackages();

  const packages = data?.data?.packages || [];

  const encodedImage = data?.data?.country?.image ? encodeURI(data?.data?.country?.image) : encodeURI(data?.data?.region?.image);

  return (
    <section className="w-full flex-1 flex flex-col rounded-2xl">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Country/Region Image */}
        <div className="w-full md:w-[300px] lg:w-[330px] xl:w-[386px] md:shrink-0">
          {isLoading ? (
            <div className="w-full aspect-[5/6] rounded-2xl bg-gray-200 animate-pulse"></div>
          ) : (
            <div className="sticky top-0">
              <div
                className="aspect-[5/6] relative rounded-3xl overflow-hidden"
                style={{
                  backgroundImage: `url(${encodedImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {!data?.data?.country?.image && !data?.data?.region?.image && (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Packages List */}
        <div className="w-full">
          {isLoading ? (
            <div className="flex flex-col gap-2">
              <div className="h-7 bg-gray-200 rounded w-32 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-64 mb-6 animate-pulse"></div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl lg:text-[32px] font-[900] font-barlowCondensed text-main-700 uppercase mb-2">
                {name || "Packages"}
              </h2>
              <p className="text-text-700 mb-6 text-sm lg:text-base">
                Here is the list of packages. You can see details upon selecting a package.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <PackageCardSkeleton key={index} />
                ))
              : packages.map((packageItem, index) => (
                  <PackageCard
                    key={packageItem._id}
                    packageItem={packageItem}
                    onClick={handlePackageClick}
                    formatDataSize={formatDataSize}
                    index={index}
                  />
                ))}
          </div>

          {!isLoading && !isError && packages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No packages found</p>
            </div>
          )}

          {isError && (
            <div className="text-center py-12">
              <p className="text-red-600">Failed to load packages. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Packages;
