import { cn } from "@/lib/utils";

function LoadingInput({
  label = "",
  labelClass = "",
  wrapper = "",
  loadingClass = "",
  labelChildrenClass = "",
  labelChildren = "",
}) {
  return (
    <div className={cn(`flex flex-col w-full gap-2`, wrapper)}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label ${labelClass}`} htmlFor="">
            {label}
          </label>
          {labelChildren && (
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          )}
        </div>
      )}
      <div
        className={`relative h-[48px] w-full  rounded-lg bg-natural-200 animate-pulse ${loadingClass}`}
      ></div>
    </div>
  );
}

export default LoadingInput;
