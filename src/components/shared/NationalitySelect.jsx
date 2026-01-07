import { ArrowDownIconSvg, ArrowUpIconSvg } from "@/services";
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FixedSizeList as List } from "react-window";

const ITEM_HEIGHT = 54;

const NationalitySelect = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
  options = [],
  value = null,
  onChange = () => {},
  placeholder = "Select nationality",
  searchable = true,
  maxHeight = 240,
  labelChildren = null,
  isLoading = false,
  labelChildrenClass = "",
  ...rest
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSelect = useCallback(
    (option) => {
      onChange(option);
      setIsOpen(false);
      setSearchTerm("");
      setFocusedIndex(-1);
    },
    [onChange]
  );

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (["Enter", " ", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, filteredOptions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(filteredOptions[focusedIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSearchTerm("");
      setFocusedIndex(-1);
    }
  };

  // Combined effect for click-outside & focus search on open
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setSearchTerm("");
        setFocusedIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus();
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, searchable]);

  // Row rendering for react-window
  const Row = ({ index, style }) => {
    const option = filteredOptions[index];
    const isFocused = index === focusedIndex;
    const isSelected = value && value.id === option.id;

    return (
      <div
        style={style}
        className={`px-4 cursor-pointer flex items-center gap-3 
          ${isFocused ? "bg-blue-50 text-black-100" : "hover:bg-gray-50"}
          ${
            isSelected
              ? "bg-main-600 text-white font-medium"
              : "text-black-100"
          }
        `}
        onClick={() => handleSelect(option)}
        onMouseEnter={() => setFocusedIndex(index)}
      >
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <div className={`flex flex-col w-full gap-2 ${wrapper}`} ref={dropdownRef}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label ${labelClass}`}>{label}</label>
          {labelChildren && (
            <span className={`${labelChildrenClass}`}>{labelChildren}</span>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="relative h-[48px] w-full rounded-lg bg-white animate-pulse"></div>
      ) : (
        <div className="relative w-full ">
          <div
            className={`input relative cursor-pointer !bg-white ${className}`}
            onClick={() => setIsOpen((prev) => !prev)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            {...rest}
          >
            <div className="flex items-center justify-between h-full">
              {value ? (
                <span className="flex items-center gap-2">
                  <span>{value.label}</span>
                </span>
              ) : (
                <span className="text-gray-500">{placeholder}</span>
              )}
              {isOpen ? <ArrowUpIconSvg /> : <ArrowDownIconSvg />}
            </div>
          </div>

          {isOpen && (
            <div className="absolute z-50 w-full mt-2 bg-white border border-natural-400 rounded-lg shadow-xl">
              {searchable && (
                <div className="p-3 border-b border-natural-400">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder="Search Nationality"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setFocusedIndex(-1);
                      }}
                      onKeyDown={handleKeyDown}
                      className="w-full pl-10 pr-4 py-2 border border-natural-400 rounded-md focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {filteredOptions.length === 0 ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  No Nationality found
                </div>
              ) : (
                <List
                  height={maxHeight}
                  itemCount={filteredOptions.length}
                  itemSize={ITEM_HEIGHT}
                  width="100%"
                >
                  {Row}
                </List>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NationalitySelect;
