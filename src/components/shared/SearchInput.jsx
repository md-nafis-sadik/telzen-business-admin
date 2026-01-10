import React from "react";
import { cn, SearchIconSvg } from "@/services";

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
      className={cn(
        "relative flex items-center w-full md:max-w-[200px]",
        className
      )}
    >
      <span className="absolute left-4 z-10 w-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15.755 14.2549H14.965L14.685 13.9849C15.665 12.8449 16.255 11.3649 16.255 9.75488C16.255 6.16488 13.345 3.25488 9.755 3.25488C6.165 3.25488 3.255 6.16488 3.255 9.75488C3.255 13.3449 6.165 16.2549 9.755 16.2549C11.365 16.2549 12.845 15.6649 13.985 14.6849L14.255 14.9649V15.7549L19.255 20.7449L20.745 19.2549L15.755 14.2549ZM9.755 14.2549C7.26501 14.2549 5.255 12.2449 5.255 9.75488C5.255 7.26488 7.26501 5.25488 9.755 5.25488C12.245 5.25488 14.255 7.26488 14.255 9.75488C14.255 12.2449 12.245 14.2549 9.755 14.2549Z"
            fill="#9E9E9E"
          />
        </svg>
      </span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full pl-11 py-3 min-h-[40px] pr-10 rounded-lg border border-natural-400 outline-none text-sm",
          "focus:ring-0 focus:border-main-700 transition-all duration-200",
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
