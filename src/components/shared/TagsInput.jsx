import { cn } from "@/services";
import { X } from "lucide-react";
import { useRef, useState } from "react";

const TagsInput = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
  icon = null,
  labelChildren = null,
  isLoading = false,
  labelChildrenClass = "",
  value = [],
  onChange = () => {},
  selector = null,
  placeholder = "Type and press Enter to add tags...",
  tagSelectedClassName = "",
  ...rest
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  const addTag = (tagText) => {
    if (selector) {
      onChange([...value, tagText]);
      setInputValue("");
    } else {
      const trimmedTag = tagText.trim();
      if (trimmedTag && !value.includes(trimmedTag)) {
        onChange([...value, trimmedTag]);
        setInputValue("");
      }
    }
  };

  const removeTag = (tagToRemove) => {
    onChange(
      value.filter((tag) => {
        const tagValue = selector ? tag[selector] : tag;
        return tagValue !== tagToRemove;
      })
    );
  };

  // const handleKeyDown = (e) => {
  //   const tagValue = selector
  //     ? value[value.length - 1][selector]
  //     : value[value.length - 1];
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     addTag(selector ? { [selector]: inputValue } : inputValue);
  //   } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
  //     removeTag(tagValue);
  //   }
  // };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(selector ? { [selector]: inputValue } : inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      const lastTag = value[value.length - 1];
      const tagValue = selector && lastTag ? lastTag[selector] : lastTag;
      removeTag(tagValue);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${wrapper}`}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label ${labelClass}`}>{label}</label>
          {labelChildren && (
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="relative h-[48px] w-full rounded-lg bg-white animate-pulse "></div>
      ) : (
        <div className="relative w-full">
          <div
            className={`input relative min-h-[48px] p-3 flex items-center cursor-text !bg-white ${className} ${
              icon ? "pl-10" : ""
            }`}
            onClick={focusInput}
          >
            <div className="flex flex-wrap gap-2 items-center">
              {value.map((tag, index) => (
                <span
                  key={index}
                  className={cn(
                    "inline-flex items-center gap-1 px-[10px] py-1 bg-natural-50 text-text-700 border border-natural-200 rounded-md text-sm font-medium hover:bg-main-50 transition-colors",
                    tagSelectedClassName
                  )}
                >
                  {selector ? tag[selector] : tag}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(selector ? tag[selector] : tag);
                    }}
                    className="hover:bg-main-100 text-main-700 hover:text-main-700 rounded-full p-0.5 transition-colors ml-1"
                    aria-label={`Remove ${selector ? tag[selector] : tag} tag`}
                    type="button"
                  >
                    <X className="" size={16} />
                  </button>
                </span>
              ))}

              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={value.length === 0 ? placeholder : ""}
                className="flex-1 min-w-32 outline-none bg-transparent text-gray-700 placeholder-gray-800 read-only:!cursor-default"
                {...rest}
              />
            </div>
          </div>

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

export default TagsInput;
