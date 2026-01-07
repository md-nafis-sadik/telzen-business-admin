import { cn } from "@/lib/utils";
import { DownArrowIconSvg, UpArrowIconSvg } from "@/services";
import * as Popover from "@radix-ui/react-popover";
import { Check, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

function MultiSelectInput({
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

  useEffect(() => {
    if (Array.isArray(value)) setInternal(value);
  }, [value]);

  const byId = useMemo(() => {
    const m = new Map();
    for (const item of data) m.set(item[selector], item);
    return m;
  }, [data, selector]);

  const selectedItems = useMemo(
    () => internal.map((id) => byId.get(id)).filter(Boolean),
    [internal, byId]
  );

  const toggle = (id) => {
    setInternal((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((v) => v !== id) : [...prev, id];
      onChange?.(next);
      return next;
    });
  };

  const clearAll = () => {
    setInternal([]);
    onChange?.([]);
  };

  const selectAll = () => {
    const all = data.map((d) => d[selector]);
    setInternal(all);
    onChange?.(all);
  };

  const triggerContent = useMemo(() => {
    if (selectedItems.length === 0) {
      return <span className="text-gray-800 text-left text-sm">{placeholder}</span>;
    }
    if (chips) {
      return (
        <div className="flex flex-wrap gap-2 font-hindSiliguri">
          {selectedItems.map((item) => (
            <span
              key={item[selector]}
              className="inline-flex items-center gap-1 px-[10px] py-1 bg-natural-50 text-text-700 border border-natural-200 rounded-md text-sm font-medium hover:bg-main-50 transition-colors"
            >
              {item.flag && <span className="twemoji">{item.flag}</span>}
              <span className="whitespace-nowrap">{item[labelKey]}</span>
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(item[selector]);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    toggle(item[selector]);
                  }
                }}
                className="hover:bg-main-100 text-main-600 hover:text-main-600 rounded-full p-0.5 transition-colors ml-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-main-300"
              >
                <X className="h-3 w-3" />
              </span>
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
  }, [selectedItems, chips, labelKey, placeholder, selector, toggle]);

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
            className="border w-full min-h-[48px] py-2.5 px-4 text-black-100 rounded-lg data-[placeholder]:text-gray-800 border-natural-400 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 flex justify-between items-center"
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
          <Popover.Content align="end" sideOffset={8} className="z-[9999]">
            {/* Triangle pointer positioned on the right */}
            <div
              className="absolute -top-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-white z-10"
              style={{ filter: "drop-shadow(0 -2px 2px rgba(0,0,0,0.08))" }}
            />

            <div
              className={cn(
                "bg-white rounded-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] px-3 py-4 overflow-hidden",
                "min-w-[164px] max-h-72",
                contentClassName
              )}
            >
              <div className="font-hindSiliguri flex items-center justify-between gap-2 px-2 py-2 border-b border-natural-200 text-text-700">
                <button
                  type="button"
                  className="text-xs hover:underline"
                  onClick={selectAll}
                >
                  Select all
                </button>
                <button
                  type="button"
                  className="text-xs hover:underline"
                  onClick={clearAll}
                >
                  Clear
                </button>
              </div>

              <ul className="overflow-auto max-h-60">
                {data.map((item) => {
                  const id = item[selector];
                  const checked = internal.includes(id);
                  return (
                    <li
                      key={id}
                      className="font-hindSiliguri border-b last:border-b-0 border-natural-200 text-text-700"
                    >
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
                            "flex h-3.5 w-3.5 items-center justify-center rounded-sm border",
                            checked
                              ? "bg-main-600 text-white border-main-600"
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
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}

export default MultiSelectInput;
