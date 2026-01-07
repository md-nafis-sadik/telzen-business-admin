const Textarea = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
  icon = null,
  labelChildren = null,
  isLoading = false,
  labelChildrenClass = "",
  height = "h-[120px]",
  ...rest
}) => {
  return (
    <div className={`flex flex-col gap-2 ${wrapper}`}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label ${labelClass}`} htmlFor="">
            {label}
          </label>
          <span className={`${labelChildrenClass}`}>{labelChildren}</span>
        </div>
      )}
      {isLoading ? (
        <div
          className={`relative ${height} w-full rounded-lg bg-white animate-pulse`}
        ></div>
      ) : (
        <div className="relative w-full">
          <textarea
            className={`input ${height} relative resize-none ${className} ${
              icon ? "pl-10" : ""
            }`}
            {...rest}
          />
          {icon && (
            <div className="w-5 h-5 flex items-center justify-center rounded-full overflow-hidden absolute top-4 left-4 z-50 ">
              <img src={icon} className="w-full h-full object-contain" alt="" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Textarea;
