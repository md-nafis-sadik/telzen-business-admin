import React from "react";
import { cn } from "@/services";

const SearchInput = ({
  value,
  onChange,
  placeholder = "Search",
  className,
  inputClassName,
  iconColor = "text-gray-400",
  isSearching = false,
  ...props
}) => {
  return (
    <div
      className={cn("relative flex items-center w-full md:max-w-sm", className)}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full px-3 py-2 min-h-[40px] pr-10 rounded-lg border border-natural-400 outline-none text-sm",
          "focus:ring-0 focus:border-main-600 transition-all duration-200",
          inputClassName
        )}
        {...props}
      />
      {!isSearching && value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          type="button"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchInput;
