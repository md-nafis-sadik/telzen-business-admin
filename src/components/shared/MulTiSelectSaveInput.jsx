import { cn } from "@/lib/utils";
import { DownArrowIconSvg, UpArrowIconSvg } from "@/services";
import * as Popover from "@radix-ui/react-popover";
import { Check } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function MultiSelectSaveInput({
  label,
  labelClass,
  labelKey = "timestamp",
  selector = "id",
  data = [],
  placeholder = "Select",
  value = [],
  onChange,
  disabled = false,
  className,
  contentClassName,
  chips = true,
}) {
  const [open, setOpen] = useState(false);
  const [internal, setInternal] = useState(Array.isArray(value) ? value : []);

  // Sync when value changes externally
  useEffect(() => {
    if (Array.isArray(value)) setInternal(value);
  }, [value]);

  const byId = useMemo(() => {
    const m = new Map();
    for (const item of data) m.set(item[selector], item);
    return m;
  }, [data, selector]);

  const selectedItems = useMemo(
    () =>
      (Array.isArray(value) ? value : [])
        .map((id) => byId.get(id))
        .filter(Boolean),
    [value, byId]
  );

  const toggle = (id) => {
    setInternal((prev) => {
      const exists = prev.includes(id);
      return exists ? prev.filter((v) => v !== id) : [...prev, id];
    });
  };

  const clearAll = () => setInternal([]);
  const selectAll = () => setInternal(data.map((d) => d[selector]));

  const handleSave = () => {
    onChange?.(internal);
    setOpen(false);
  };

  const triggerContent = useMemo(() => {
    if (selectedItems.length === 0) {
      return <span className="text-gray-800 text-left text-sm">{placeholder}</span>;
    }
    if (chips) {
      return (
        <div className="flex flex-wrap gap-2">
          {selectedItems.map((item) => (
            <span
              key={item[selector]}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-mainGradient text-white rounded-full text-sm font-medium"
            >
              {item.flag && <span className="twemoji">{item.flag}</span>}
              <span className="whitespace-nowrap">{item[labelKey]}</span>
            </span>
          ))}
        </div>
      );
    }
    return (
      <span className="truncate">
        {selectedItems.map((i) => i[labelKey]).join(", ")}
      </span>
    );
  }, [selectedItems, chips, labelKey, placeholder, selector]);

  return (
    <div className="flex flex-col gap-2 relative">
      {label && (
        <div className="flex items-center gap-2">
          <label className={cn("label", labelClass)}>{label}</label>
        </div>
      )}

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <button
            type="button"
            disabled={disabled}
            className="border w-full min-h-[48px] py-3.5 px-4 text-black-100 rounded-lg data-[placeholder]:text-gray-800 border-natural-400 focus:outline-none focus:ring-0 flex justify-between items-center"
          >
            {triggerContent}
            {open ? (
              <UpArrowIconSvg color="#000" />
            ) : (
              <DownArrowIconSvg color="#000" />
            )}
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            className={cn(
              "bg-white z-[9999] rounded-md border shadow-md p-1",
              "min-w-[240px] max-h-80 overflow-auto flex flex-col",
              contentClassName
            )}
          >
            {/* Top Actions */}
            <div className="flex items-center justify-between gap-2 px-2 py-2 border-b">
              <button
                type="button"
                className="text-xs text-gray-700 hover:underline"
                onClick={selectAll}
              >
                Select all
              </button>
              <button
                type="button"
                className="text-xs text-gray-700 hover:underline"
                onClick={clearAll}
              >
                Clear
              </button>
            </div>

            {/* Options */}
            <ul className="py-1 flex-1 overflow-auto">
              {data.map((item) => {
                const id = item[selector];
                const checked = internal.includes(id);
                return (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => toggle(id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-2 py-2 text-sm rounded-sm cursor-pointer",
                        "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded border",
                          checked
                            ? "bg-primary text-white border-primary"
                            : "border-gray-300 bg-white text-transparent"
                        )}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <div className="flex gap-2">
                        {item.flag && (
                          <span className="twemoji">{item.flag}</span>
                        )}
                        <span>{item[labelKey]}</span>
                      </div>
                    </button>
                  </li>
                );
              })}
              {data.length === 0 && (
                <li className="px-2 py-2 text-sm text-muted-foreground">
                  No options
                </li>
              )}
            </ul>

            {/* Save Button */}
            <div className="border-t px-2 py-2">
              <button
                type="button"
                onClick={handleSave}
                className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90"
              >
                Save
              </button>
            </div>

            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default MultiSelectSaveInput;
