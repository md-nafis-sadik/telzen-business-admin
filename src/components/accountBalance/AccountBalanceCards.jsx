import { useAccountBalance } from "@/hooks";

function AccountBalanceCards() {
  const { dataList, summaryCards, isFetching } = useAccountBalance();
  return (
    <div className="w-full bg-white p-4 rounded-2xl mb-6">
      <div className="bg-white">
        <h4 className="text-lg text-text-700 font-semibold mb-4">Overview</h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4">
          {isFetching && dataList.length === 0
            ? // Skeleton for loading state
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-neutral-100 p-5 rounded-lg animate-pulse"
                >
                  <div className="h-5 w-3/4 bg-neutral-300 rounded mb-[14px]"></div>
                  <div className="h-7 w-1/2 bg-neutral-400 rounded"></div>
                </div>
              ))
            : // Actual content when loaded
              summaryCards?.map((item, i) => (
                <div
                  key={i}
                  className={`${item.bgColor} p-5 rounded-lg flex flex-col justify-between h-full`}
                >
                  <div className="mb-2 text-xs font-medium text-text-700">
                    {item?.title}
                  </div>
                  <div className="text-base font-semibold text-text-900">
                    {item?.number}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default AccountBalanceCards;
