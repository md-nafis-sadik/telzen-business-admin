import React, { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const SelectInput = memo(function SelectInput({
  label,
  labelClass,
  labelKey = "timestamp",
  selector = "id",
  data = [],
  placeHolder = "Select",
  triggerClassName = "",
  dropdownClassName = "",
  parentClassName = "",
  value,
  onValueChange,
  isLoading = false,
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-2 relative ${parentClassName}`}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label ${labelClass}`}>{label}</label>
        </div>
      )}
      {isLoading ? (
        <div
          className={`relative h-[48px] w-full rounded-lg bg-natural-300 animate-pulse`}
        ></div>
      ) : (
        <Select value={value} onValueChange={onValueChange} {...rest}>
          <SelectTrigger
            className={`w-full py-3 min-h-[50px] px-4 text-black-100 rounded-lg data-[placeholder]:text-text-500 border-natural-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:bg-natural-200 ${triggerClassName}`}
          >
            <SelectValue placeholder={`${placeHolder}`} />
          </SelectTrigger>
          <SelectContent className={`bg-white z-[9999] ${dropdownClassName}`}>
            {data?.map((item) => (
              <SelectItem
                key={item[selector]}
                value={String(item[selector])}
                className="cursor-pointer"
              >
                <div className="flex gap-2 ">
                  {item.flag && <span className="twemoji">{item.flag}</span>}
                  <span>{item[labelKey]}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
});

export default SelectInput;
