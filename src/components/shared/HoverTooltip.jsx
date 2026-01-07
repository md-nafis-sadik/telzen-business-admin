import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

const HoverTooltip = ({
  items = [],
  label = "Items",
  groupName = "default",
  className = "",
}) => {
  const count = items?.length || 0;
  const hasItems = count > 0;
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    showAbove: false,
  });
  const triggerRef = useRef(null);

  useEffect(() => {
    if (isHovered && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const tooltipHeight = 248 + 32 + 16; // max-height + padding + margin estimate
      const spaceBelow = window.innerHeight - rect.bottom;
      const shouldShowAbove =
        spaceBelow < tooltipHeight && rect.top > tooltipHeight;

      setPosition({
        top: shouldShowAbove
          ? rect.top + window.scrollY - 8
          : rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + rect.width / 2,
        showAbove: shouldShowAbove,
      });
    }
  }, [isHovered]);

  return (
    <>
      <div
        ref={triggerRef}
        className={`relative inline-block ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <span className={`font-medium ${hasItems && "underline"}`}>
            {count} {label}
          </span>
        </div>
      </div>

      {hasItems &&
        isHovered &&
        createPortal(
          <div
            className="fixed z-[9999]"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              transform: position.showAbove
                ? "translate(-50%, -100%)"
                : "translate(-50%, 0)",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Triangle pointer - appears at opposite end */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent ${
                position.showAbove
                  ? "-bottom-2 border-t-[8px] border-t-white"
                  : "-top-2 border-b-[8px] border-b-white"
              }`}
              style={{
                filter: position.showAbove
                  ? "drop-shadow(0 2px 2px rgba(0,0,0,0.1))"
                  : "drop-shadow(0 -2px 2px rgba(0,0,0,0.1))",
              }}
            />

            {/* Tooltip content */}
            <div className="bg-white rounded-lg py-4 px-3 shadow-[0_0_15.6px_0_rgba(0,0,0,0.16)] min-w-[160px] max-w-[164px]">
              <div className="max-h-[248px] overflow-y-auto text-left font-inter">
                {items.map((item, idx) => (
                  <div
                    key={idx}
                    className="text-sm p-2 border-b last:border-b-0 border-natural-200 text-text-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default HoverTooltip;
