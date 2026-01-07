import React from "react";
import { cn } from "@/services";

const ToggleSwitch = ({
  checked = false,
  onChange = () => {},
  className,
  activeColor = "bg-main-600",
  blockedColor = "bg-natural-500",
  knobColor = "bg-white",
  isLoading = false,
}) => {
  if (isLoading)
    return <span className={cn("w-6 h-4 animate-spin bg-main-600")}></span>;
  return (
    <button
      onClick={onChange}
      className={cn(
        "relative flex items-center rounded-full transition-colors duration-300 focus:outline-none",
        checked ? activeColor : blockedColor,
        "w-[35px] h-[18px]",
        className
      )}
    >
      <span
        className={cn(
          "absolute left-[2px] rounded-full transition-transform duration-300",
          knobColor,
          "w-[13px] h-[13px]",
          checked && "translate-x-[18px]"
        )}
      />
    </button>
  );
};

export default ToggleSwitch;
