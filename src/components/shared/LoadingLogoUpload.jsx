import { cn } from "@/lib/utils";

function LoadingLogoUpload({ wrapper = "", size = "w-[218px] h-[218px]" }) {
  return (
    <div className={cn(`relative inline-block`, wrapper)}>
      {/* Skeleton container */}
      <div
        className={cn(
          `flex items-center justify-center rounded-full bg-white-300 relative animate-pulse`,
          size
        )}
      ></div>
    </div>
  );
}

export default LoadingLogoUpload;
