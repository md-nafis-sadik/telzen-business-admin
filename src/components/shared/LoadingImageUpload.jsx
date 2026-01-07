import { cn } from "@/lib/utils";

function LoadingImageUpload({ wrapper = "", height = "h-[220px]" }) {
  return (
    <div className={cn(`flex flex-col gap-2`, wrapper)}>
      {/* Upload box skeleton */}
      <div
        className={cn(
          `w-full border-2 border-dashed border-gray-300 rounded-lg bg-gray-200 flex flex-col items-center justify-center animate-pulse`,
          height
        )}
      >
        <div className="w-12 h-12 bg-gray-300 rounded-full mb-4"></div>
        <div className="w-32 h-4 bg-gray-300 rounded mb-1"></div>
        <div className="w-40 h-3 bg-gray-300 rounded mb-1"></div>
        <div className="w-36 h-3 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
}

export default LoadingImageUpload;
