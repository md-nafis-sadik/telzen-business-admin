import { cn } from "@/lib/utils";

const Input = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
  type = "text",
  icon = null,
  labelChildren = null,
  isLoading = false,
  labelChildrenClass = "",
  id = "",
  ...rest
}) => {
  return (
    <div className={`flex flex-col w-full gap-2 font-inter ${wrapper}`}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label font-inter ${labelClass}`} htmlFor={id}>
            {label}
          </label>
          {labelChildren && (
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          )}
        </div>
      )}
      {isLoading ? (
        <div
          className={`relative h-[48px] w-full rounded-lg bg-white animate-pulse`}
        ></div>
      ) : (
        <div className="relative w-full">
          <input
            type={type}
            id={id}
            name={rest.name || id}
            className={`input disabled:opacity-60 relative font-inter ${className} ${
              icon ? "pl-10" : ""
            }`}
            onWheel={(e) => e.target.blur()}
            {...rest}
          />
          {icon && (
            <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden absolute top-1/2 -translate-y-1/2 left-4 z-50">
              <img src={icon} className="w-full h-full object-contain" alt="" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
