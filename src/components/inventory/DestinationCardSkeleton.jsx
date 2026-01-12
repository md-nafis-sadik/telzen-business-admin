function DestinationCardSkeleton({ index = 0 }) {
  return (
    <div className="relative rounded-xl aspect-[5/6] overflow-hidden animate-pulse">
      {/* Background skeleton */}
      <div className="w-full h-full bg-gray-300" />

      {/* Gradient overlay skeleton */}
      <div
        className="absolute bottom-0 w-full rounded-b-xl bg-gradient-to-t from-gray-400 to-transparent"
        style={{ height: "177.778px" }}
      />

      {/* Sticker skeleton */}
      <div
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] rounded-lg px-3 pt-1 pb-2 ${
          index % 2 === 0 ? "bg-gray-400" : "bg-gray-500"
        }`}
      >
        {/* Title skeleton */}
        <div className="h-6 sm:h-8 bg-gray-300 rounded mb-1 w-3/4" />

        {/* Price skeleton */}
        <div className="h-4 sm:h-5 bg-gray-300 rounded w-1/2" />
      </div>
    </div>
  );
}

export default DestinationCardSkeleton;
