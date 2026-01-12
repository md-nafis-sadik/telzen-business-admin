function PackageCardSkeleton() {
  return (
    <div className="flex gap-3 bg-natural-100 p-4 rounded-2xl w-full animate-pulse">
      <div className="flex flex-col w-full gap-3">
        <div className="w-6 h-6 bg-gray-300 rounded"></div>
        <div className="flex flex-col gap-1">
          <div className="h-6 md:h-7 bg-gray-300 rounded w-3/4"></div>
          <div className="flex items-center gap-1">
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="h-8 bg-gray-300 rounded w-16"></div>
      </div>
    </div>
  );
}

export default PackageCardSkeleton;
