import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

function SelectHelper({
  isLoading = false,
  isError = false,
  status = 404,
  errorText = "Failed to load data",
  emptyText = "No data found",
  heightClass = "",
  length = 0,
  children,
  label = "",
  labelClass = "",
  wrapper = "",
  labelChildren,
  labelChildrenClass = "",
}) {
  if (isLoading) {
    return (
      <div className={`flex flex-col gap-2 w-full ${wrapper}`}>
        {label && (
          <div className="flex items-center gap-2">
            <label className={`label ${labelClass}`} htmlFor="">
              {label}
            </label>
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          </div>
        )}
        <div className={cn("h-[48px] pulse rounded-lg", heightClass)}></div>
      </div>
    );
  } else if (isError && status !== 404) {
    return (
      <div className={`flex flex-col gap-2 w-full ${wrapper}`}>
        {label && (
          <div className="flex items-center gap-2">
            <label className={`label ${labelClass}`} htmlFor="">
              {label}
            </label>
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          </div>
        )}
        <div
          className={cn(
            "h-[48px] px-4 text-status-error border border-red-400 gap-2 rounded-lg flex items-center",
            heightClass
          )}
        >
          <CircleAlert className="w-5 h-5" />
          <span className="text-sm ">{errorText}</span>
        </div>
      </div>
    );
  } else if (length === 0 || (isError && status === 404)) {
    return (
      <div className={`flex flex-col gap-2 w-full ${wrapper}`}>
        {label && (
          <div className="flex items-center gap-2">
            <label className={`label ${labelClass}`} htmlFor="">
              {label}
            </label>
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          </div>
        )}
        <div
          className={cn(
            "h-[48px] px-4 text-secondary-400 border border-natural-400 gap-2 rounded-lg flex items-center",
            heightClass
          )}
        >
          <CircleAlert className="w-5 h-5" />
          <span className="text-sm">{emptyText}</span>
        </div>
      </div>
    );
  } else {
    return children;
  }
}

export default SelectHelper;
