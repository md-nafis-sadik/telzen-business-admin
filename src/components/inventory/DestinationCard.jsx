import { getSymbol } from "@/services";

function DestinationCard({ item, onClick, index }) {
  const displayImage = item?.image || "";
  const displayName = item?.name || "";
  const displayPrice = item?.start_from || 0;

  const formattedPrice =
    typeof displayPrice === "number" ? displayPrice.toFixed(2) : displayPrice;

  const encodedImage = displayImage ? encodeURI(displayImage) : "";

  return (
    <div
      onClick={onClick}
      className="relative rounded-xl aspect-[5/6] overflow-hidden cursor-pointer group transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 select-none"
      style={{
        backgroundImage: encodedImage ? `url(${encodedImage})` : "none",
        backgroundColor: !encodedImage ? "#e5e7eb" : "transparent",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient overlay */}
      <div
        className="absolute bottom-0 w-full rounded-b-xl"
        style={{
          height: "177.778px",
          background:
            "linear-gradient(0deg, #042855 0%, rgba(4, 40, 85, 0) 100%)",
        }}
      ></div>

      {/* Content sticker */}
      <div
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] rounded-lg px-3 pt-1 pb-2 transition-transform duration-300 ease-out group-hover:-translate-y-1 ${
          index % 2 === 0 ? "bg-main-700" : "bg-[#FFB94A]"
        }`}
      >
        <div className="text-xl sm:text-3xl  font-barlowCondensed font-[900] uppercase text-white leading-tight">
          {displayName}
        </div>
        <div className="text-sm sm:text-base text-white">
          Start from {getSymbol(item?.currency || "USD")}{formattedPrice}
        </div>
      </div>
    </div>
  );
}

export default DestinationCard;
