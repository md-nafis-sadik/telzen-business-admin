import LoadingInput from "./LoadingInput";

function SelectSkeleton({
  label,
  triggerClassName = "w-full md:w-[169px] p-3.5",
  labelClass,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <label className={`label ${labelClass || ""}`}>{label}</label>}
      <div
        className={`h-[42px] bg-white-300 animate-pulse rounded-lg ${triggerClassName}`}
      />
    </div>
  );
}

export default SelectSkeleton;
