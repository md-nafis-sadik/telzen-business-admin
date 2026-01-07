import { cn } from "@/lib/utils";

function LoadingTextarea({
  label = "",
  labelClass = "",
  wrapper = "",
  loadingClass = "",
}) {
  return (
    <div className={cn(`flex flex-col gap-2`, wrapper)}>
      {label && (
        <label className={`label ${labelClass}`} htmlFor="">
          {label}
        </label>
      )}
      <div
        className={`relative w-full  h-[200px] rounded-lg bg-white-300 animate-pulse ${loadingClass}`}
      ></div>
    </div>
  );
}

export default LoadingTextarea;
