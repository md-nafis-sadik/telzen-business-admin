import { cn } from "@/lib/utils";
import {
  CalendarIconSvg,
  timestampConverter,
  TimestampConvertTypeEnum,
  errorNotify,
} from "@/services";
import { X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";

const DatePicker = ({
  label,
  id,
  inputCss,
  selectedDate,
  setSelectedDate,
  onCancelSeletedDate,
  wrapper,
  labelClass,
  isLoading = false,
  isIcon = true,
  pickerHandler,
  onRemoveDate,
  labelChildren,
  labelChildrenClass,
  isMultiple = false,
  placeholder,
  ...props
}) => {
  const mode = isMultiple ? "multiple" : "single";

  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [tempSelectedDate, setTempSelectedDate] = useState(selectedDate);

  useEffect(() => {
    if (isMultiple && Array.isArray(selectedDate)) {
      const dateObjects = selectedDate.map((timestamp) =>
        typeof timestamp === "number" ? new Date(timestamp * 1000) : timestamp
      );
      setTempSelectedDate(dateObjects);
    } else if (!isMultiple && selectedDate) {
      const dateObject =
        typeof selectedDate === "number"
          ? new Date(selectedDate * 1000)
          : selectedDate;
      setTempSelectedDate(dateObject);
    } else {
      setTempSelectedDate(isMultiple ? [] : undefined);
    }
  }, [selectedDate, isMultiple]);

  const handleSave = () => {
    setSelectedDate(tempSelectedDate);
    setIsPickerOpen(false);
  };

  const handleCancel = () => {
    if (onCancelSeletedDate) onCancelSeletedDate();
    else {
      if (isMultiple && Array.isArray(selectedDate)) {
        const dateObjects = selectedDate.map((timestamp) =>
          typeof timestamp === "number" ? new Date(timestamp * 1000) : timestamp
        );
        setTempSelectedDate(dateObjects);
      } else if (!isMultiple && selectedDate) {
        const dateObject =
          typeof selectedDate === "number"
            ? new Date(selectedDate * 1000)
            : selectedDate;
        setTempSelectedDate(dateObject);
      } else {
        setTempSelectedDate(isMultiple ? [] : undefined);
      }
    }

    setIsPickerOpen(false);
  };

  // remove chip
  const removeChip = (originalTimestamp) => {
    if (!isMultiple || !onRemoveDate) {
      errorNotify("Please pass the handler");
      return;
    }

    const updatedDates = tempSelectedDate.filter((dateObj) => {
      const dateTimestamp = dateObj.getTime() / 1000;
    });

    setTempSelectedDate(updatedDates);
    onRemoveDate(originalTimestamp);
  };

  const chips = useMemo(() => {
    if (isMultiple && Array.isArray(selectedDate) && selectedDate.length > 0) {
      return selectedDate.map((timestamp, i) => (
        <span
          key={`${timestamp}-${i}`}
          className="inline-flex items-center gap-1 px-3 py-1 bg-main-700 text-white rounded-full text-sm font-medium"
        >
          {timestampConverter(
            timestamp,
            TimestampConvertTypeEnum.From_Unix_To_MMM_DD_YYYY
          )}
          {onRemoveDate && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                removeChip(timestamp);
              }}
              className="ml-1 inline-flex items-center justify-center w-4 h-4 hover:bg-blue-300 p-0.5 rounded-full hover:cursor-pointer transition-colors"
              role="button"
              aria-label="Remove date"
            >
              <X size={12} />
            </span>
          )}
        </span>
      ));
    }
    if (!isMultiple && selectedDate) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-main-700 text-white rounded-full text-sm font-medium">
          {timestampConverter(
            selectedDate,
            TimestampConvertTypeEnum.From_Unix_To_MMM_DD_YYYY
          )}
        </span>
      );
    }
    return null;
  }, [selectedDate, isMultiple, onRemoveDate]);

  return (
    <div className="relative">
      <div className={cn("flex flex-col w-full gap-2", wrapper)}>
        {label && (
          <div className="flex items-center gap-2">
            <label className={cn("label", labelClass)} htmlFor={id}>
              {label}
            </label>
            {labelChildren && (
              <span className={cn(labelChildrenClass)}>{labelChildren}</span>
            )}
          </div>
        )}

        {isLoading ? (
          <div
            className={cn(
              "relative h-[48px] w-full rounded-lg bg-white animate-pulse"
            )}
          ></div>
        ) : (
          <div className="relative w-full">
            <button
              type="button"
              id={id}
              name={id}
              className={cn(
                "input relative flex min-h-[48px] w-full items-center gap-2 flex-wrap text-left",
                "placeholder:text-muted-foreground",
                "read-only:bg-white",
                inputCss
              )}
              onClick={() => setIsPickerOpen((o) => !o)}
              {...props}
            >
              {(isMultiple && chips && chips.length > 0) ||
              (!isMultiple && chips) ? (
                <div className="flex flex-wrap gap-1 items-center">{chips}</div>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </button>

            {isIcon ? (
              <button
                type="button"
                className={cn("absolute bottom-4 right-[18px] trans")}
                onClick={() => setIsPickerOpen(!isPickerOpen)}
              >
                <CalendarIconSvg className="w-6 h-6 trans" color="#353535" />
              </button>
            ) : null}
          </div>
        )}
      </div>

      {isPickerOpen && (
        <div className="relative">
          <div className="absolute z-10 bg-white border border-neutral-300 rounded-[8px] p-4 mt-2 right-0 min-w-[320px]">
            <DayPicker
              mode={mode}
              selected={tempSelectedDate}
              onSelect={setTempSelectedDate}
              modifiersClassNames={{
                selected: "rdp-selected",
              }}
              showOutsideDays
            />
            <div className="flex justify-between gap-x-3 mt-4">
              <button onClick={handleCancel} className="btn_cancel w-1/2">
                Cancel
              </button>
              <button onClick={handleSave} className="btn_save w-1/2">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
