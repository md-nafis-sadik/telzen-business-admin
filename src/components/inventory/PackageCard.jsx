import {
  SmileGreenSvg,
  BoltrGreenSvg,
  HashTagsGreenSvg,
  PublicGreenSvg,
  StarGreenSvg,
  FireGreenSvg,
  GameControllerGreenSvg,
  GroupGreenSvg,
  Icon1GreenSvg,
  StarPointSvg,
} from "@/services";

const icons = [
  SmileGreenSvg,
  BoltrGreenSvg,
  HashTagsGreenSvg,
  PublicGreenSvg,
  StarGreenSvg,
  FireGreenSvg,
  GameControllerGreenSvg,
  GroupGreenSvg,
  Icon1GreenSvg,
];

function PackageCard({ packageItem, onClick, formatDataSize, index }) {
  const IconComponent = icons[index % icons.length];

  return (
    <div
      onClick={() => onClick(packageItem)}
      className="flex gap-3 cursor-pointer bg-natural-50 p-4 rounded-2xl w-full border border-natural-100 hover:bg-main-50 hover:border hover:border-main-700 transition-all duration-500 select-none active:scale-95"
    >
      <div className="flex flex-col w-full gap-3">
        <span>
          <IconComponent className="w-6 h-6 text-main-700" />
        </span>
        <div className="flex flex-col gap-1">
          <div className="text-base md:text-lg lg:text-xl xl:text-2xl tracking-wider">
            {formatDataSize(packageItem.total_data_plan_in_mb)} •{" "}
            {packageItem.validity}
          </div>
          <div className="flex items-center gap-2">
            <span>
              <StarPointSvg className="w-3.5 md:w-4.5 lg:w-6 h-3.5 md:h-4.5 lg:h-6" />
            </span>
            <span className="text-natural-500 text-base xl:text-lg">
              {packageItem.on_purchase_reward_point || 0} Points
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end justify-end">
        <div className="text-lg md:text-xl lg:text-2xl xl:text-[28px] font-semibold">
          ${packageItem.grand_total_selling_price?.toFixed(2) || "0.00"}
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
