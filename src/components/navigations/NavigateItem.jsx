import { cn } from "@/lib/utils";
import { SideMarkerSvg } from "@/services";
import { Link } from "react-router-dom";

function NavigateItem({
  isActive = false,
  menu = {},
  setter = () => {},
  path = null,
  icon,
  disabled = false,
  ...rest
}) {
  return disabled ? (
    <button
      type="button"
      className={`relative text-white flex items-center text-sm gap-2 w-full rounded-[8px] pr-4 py-3 duration-300 link-item transition-colors ease-in-out cursor-default z-[9999] self-stretch justify-start leading-none `}
      {...rest}
    >
      {icon}
      <span className="truncate ">{menu?.name}</span>
    </button>
  ) : (
    <Link
      to={path ? path : menu?.path}
      className={`relative text-white flex items-center gap-3 rounded-[8px] w-full pr-4 py-3 duration-300 group link-item transition-colors ease-in-out self-stretch justify-start leading-none text-sm ${
        isActive ? "bg-main-600" : "hover:bg-main-950"
      }`}
      onClick={() => setter(menu?.name?.toLowerCase())}
      {...rest}
    >
      <div className="relative w-1 h-6 flex items-center">
        <div
          className={cn(
            "w-1 rounded-full transition_common bg-white absolute top-1/2 -translate-y-1/2",
            isActive ? "h-6" : "h-0"
          )}
        />
      </div>
      {icon}
      <span className="">{menu?.name}</span>
    </Link>
  );
}

export default NavigateItem;