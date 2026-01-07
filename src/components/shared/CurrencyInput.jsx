import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { countriesCurrency } from "@/services";


const CurrencyInput = ({
  label = "",
  labelClass = "",
  wrapper = "",
  className = "",
  labelChildren = null,
  isLoading = false,
  labelChildrenClass = "",
  id = "",
  currencyValue = "USD",
  onCurrencyChange = () => {},
  numberValue = "",
  onNumberChange = () => {},
  placeholder = "0.00",
  ...rest
}) => {
  const selectedCurrency =
    countriesCurrency.find((curr) => curr.code === currencyValue) ||
    countriesCurrency[0];

  return (
    <div className={`flex flex-col w-full gap-2 ${wrapper}`}>
      {label && (
        <div className="flex items-center gap-2">
          <label className={`label ${labelClass}`} htmlFor={id}>
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
        <div className="relative w-full flex">
          {/* Currency Select */}
          <div className="flex-shrink-0">
            <Select value={currencyValue} onValueChange={onCurrencyChange}>
              <SelectTrigger
                className={cn(
                  "border-grey-200 py-[26px] px-3 text-black-100 rounded-l-lg rounded-r-none",
                  "data-[placeholder]:text-gray-800 border-natural-400 focus:outline-none focus:ring-0",
                  "focus-visible:outline-none focus-visible:ring-0 border-r-0 min-w-[80px] w-[80px]"
                )}
              >
                <SelectValue>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">
                      {selectedCurrency.code}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white z-[9999]">
                {countriesCurrency.map((item, index) => (
                  <SelectItem
                    key={index}
                    value={item.code}
                    className="cursor-pointer"
                  >
                    <div className="flex gap-2 items-center">
                      <div className="flex gap-2">
                        <span className="font-medium">{item.code}</span>
                        <span className="text-xs text-gray-500">
                          {item.symbol}
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Number Input */}
          <div className="flex-1">
            <input
              type="number"
              id={id}
              name={id}
              value={numberValue}
              onChange={onNumberChange}
              placeholder={placeholder}
              className={cn(
                "input relative w-full rounded-r-lg rounded-l-none border-l-0",
                "focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none",
                className
              )}
              onWheel={(e) => e.target.blur()}
              step="0.01"
              min="0"
              {...rest}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyInput;
