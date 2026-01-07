import { cn } from "@/lib/utils";
import { DownArrowIconSvg, SideMarkerSvg, UpArrowIconSvg } from "@/services";
import { forwardRef } from "react";
import { NavLink } from "react-router-dom";

const NavigationDropdownItem = forwardRef(
  (
    {
      onClick = () => {},
      name = "",
      title = "",
      links = [],
      icon,
      isSubmenuOpen = {},
      isActive = false,
      maxHeightClass = "120px",
    },
    ref
  ) => {
    return (
      <div className="w-full overflow-hidden capitalize shrink-0 cursor-pointer">
        <div
          className={`relative text-white flex items-center gap-3 w-full pr-4 py-3 duration-300 group link-item transition-colors ease-in-out self-stretch text-sm leading-none ${
            isActive ? "bg-main-700" : "hover:bg-main-950"
          } ${isSubmenuOpen[name] ? "rounded-t-[8px]" : "rounded-[8px]"}`}
          onClick={onClick}
        >
          <div className="relative w-1 h-6 flex items-center">
            <div
              className={cn(
                "w-1 rounded-full transition_common bg-white absolute top-1/2 -translate-y-1/2",
                isActive ? "h-6" : "h-0"
              )}
            />
          </div>
          <div className="flex flex-1 justify-between items-center">
            <div className="flex items-center gap-2">
              {icon}
              <p className={`flex-1 shrink-0`}>
                <span>{title}</span>
              </p>
            </div>
            {isSubmenuOpen[name] ? <UpArrowIconSvg /> : <DownArrowIconSvg />}
          </div>
        </div>
        {/* submenu  */}

        <div
          ref={(el) => ref?.current && (ref.current[name] = el)}
          className={`flex flex-col gap-1 duration-200 overflow-hidden ${
            isActive ? "rounded-b-[8px] bg-main-950" : ""
          }`}
          style={{
            maxHeight: isSubmenuOpen[name] ? maxHeightClass : "0",
          }}
        >
          {/* Submenu items */}
          {links.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="py-3 pl-11 text-white hover:bg-main-950 hover:text-main-700 transition-colors duration-300 text-sm rounded-md transition_common"
            >
              <p>{link.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    );
  }
);

NavigationDropdownItem.displayName = "NavigationDropdownItem";

export default NavigationDropdownItem;
