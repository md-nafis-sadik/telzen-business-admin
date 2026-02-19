import {
  ArrowBothIconSvg,
  ClockIconSvg,
  getSymbol,
  images,
  RectanglesIconSvg,
  SimIconSvg,
  WorldIconSvg,
} from "@/services";
import { UserRoundIcon } from "lucide-react";

function CheckoutCard({
  packageData,
  quantity,
  setQuantity,
  getCoverageText,
  formatDataSize,
  subtotal,
  grandTotal,
  customerCount,
}) {
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  return (
    <div className="bg-white rounded-3xl p-4 lg:p-6 w-full h-max">
      {/* Responsibility Banner */}
      {/* <div className="flex flex-col xl:flex-row justify-between bg-[#9FE2D1] rounded-lg overflow-hidden mb-6">
        <div className=" p-4 text-center xl:text-left">
          <div className="text-xl lg:text-3xl font-[900] font-barlowCondensed uppercase mb-2">
            RESPONSIBILITY
          </div>
          <div className="text-sm text-[#042855] max-w-[320px]">
            We keep our commitment toward green world. We plant a tree on each
            package purchased.
          </div>
        </div>
        <div className="flex items-center justify-center relative overflow-hidden">
          <img
            src={images.palmTree || "/palm-tree.png"}
            alt="Palm Tree"
            className="w-32 h-32 object-contain mb-[-20px] xl:mt-[10px] min-w-[132px] mr-4"
          />
        </div>
      </div> */}

      {/* Package Details */}
      <div className="flex flex-col gap-4 text-sm lg:text-base">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <WorldIconSvg className="w-5 h-5" />
            <span>Coverage</span>
          </div>
          <div className="font-bold capitalize">
            {packageData?.coverage_type === "country"
              ? packageData?.coverage_countries?.join(", ")
              : packageData?.coverage_region}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowBothIconSvg className="w-5 h-5" />
            <span>Plan</span>
          </div>
          <div className="font-bold">
            {packageData
              ? formatDataSize(packageData?.total_data_plan_in_mb)
              : "N/A"}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RectanglesIconSvg className="w-5 h-5" />
            <span>Type</span>
          </div>
          <div className="font-bold">Data Only</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClockIconSvg className="w-5 h-5" />
            <span>Validity</span>
          </div>
          <div className="font-bold">{packageData?.validity || "N/A"}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserRoundIcon className="w-5.5 h-5.5 text-[#006752]" />
            <span>Customer</span>
          </div>
          <div className="font-bold">{customerCount || 1}</div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SimIconSvg className="w-5 h-5" />
            <span>Quantity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-bold">{quantity || 1}</div>
            {/* <button
              onClick={decrementQuantity}
              className="w-8 h-8 rounded bg-main-50 border border-main-700 text-black hover:bg-main-100 transition-colors flex items-center justify-center font-bold"
            >
              −
            </button>
            <span className="w-8 h-8 flex justify-center items-center rounded font-bold border border-natural-400">
              <span>{quantity}</span>
            </span>
            <button
              onClick={incrementQuantity}
              className="w-8 h-8 rounded bg-main-50 border border-main-700 text-black hover:bg-main-100 transition-colors flex items-center justify-center font-bold"
            >
              +
            </button> */}
          </div>
        </div>
      </div>

      {/* Totals */}
      <div className="border-t border-natural-200 pt-4 mt-4 flex flex-col gap-3 text-sm lg:text-base">
        <div className="flex items-center justify-between">
          <span>Sub total</span>
          <div className="font-bold">
            {getSymbol(packageData?.currency || "USD")}
            {subtotal.toFixed(2)}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>Grand Total</span>
          <div className="font-bold">
            {getSymbol(packageData?.currency || "USD")}
            {grandTotal.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
