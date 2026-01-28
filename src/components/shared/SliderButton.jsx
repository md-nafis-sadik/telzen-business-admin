import { cn } from "@/lib/utils";

function SliderButton({ value, onChange, options = [] }) {
  return (
    <div className="flex bg-natural-100 rounded-full p-1 w-max">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200",
            value === option.value
              ? "bg-main-700 text-white shadow-sm"
              : "text-text-700 hover:text-text-900"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SliderButton;
