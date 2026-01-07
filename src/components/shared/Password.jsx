import { cn } from "@/lib/utils";
import { EyeCloseIconSvg, EyeOpenIconSvg } from "@/services";
import { useState } from "react";

function Password({
  label = "",
  labelClass = "",
  wrapper = "",
  innerWrapper = "",
  className = "",
  type = "text",
  icon = null,
  id = "password",
  value = "",
  onChange,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Show/hide icon based on whether there's a value
  const isShowIcon = value && value.length > 0;

  return (
    <div className={cn("flex flex-col gap-2", wrapper)}>
      {label && (
        <label className={cn(labelClass)} htmlFor={id}>
          {label}
        </label>
      )}
      <label
        htmlFor={id}
        className={cn(
          "flex items-center justify-between gap-1 bg-white border border-natural-400 px-4 py-3.5 rounded-[8px] cursor-text",
          innerWrapper
        )}
      >
        <input
          type={showPassword ? "text" : "password"}
          className={cn("input-none", className)}
          autoComplete="false"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          id={id}
          name={rest.name || id}
          value={value}
          onChange={onChange}
          {...rest}
        />
        <button
          type="button"
          className={cn(
            "transition-opacity duration-200",
            isShowIcon
              ? "opacity-100"
              : "opacity-0 invisible pointer-events-none"
          )}
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOpenIconSvg /> : <EyeCloseIconSvg />}
        </button>
      </label>
    </div>
  );
}

export default Password;
