import {
  ArrowAboveIconSvg,
  CommissionIconSvg,
  DueIconSvg,
  SpinnerAnimatedIcon,
  TakaIconSvg,
} from "@/services";

function StaffDetailsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between bg-white border border-natural-200 rounded-2xl p-3 md:p-5">
        <div className="flex w-full justify-between items-start">
          <div className="flex items-center gap-4 mb-4">
            <span className="w-16 h-16 rounded-full skeleton"></span>
            <div className="flex flex-col gap-2">
              <h2 className="skeleton min-w-80 h-4"></h2>
              <p className="skeleton min-w-80 h-4"></p>
              <p className="skeleton min-w-80 h-4"></p>
            </div>
          </div>
        </div>

        <button className="w-[132px] h-11 skeleton"></button>
      </div>

      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
          <div className="border border-natural-200 px-3 md:px-5 py-3 md:py-6 rounded-xl flex flex-col gap-5 md:gap-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
              <div className="w-10 h-10 bg-[#F64D00] rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-sm">
                  <ArrowAboveIconSvg />
                </span>
              </div>
              <p className="text-text-700 text-base font-medium mb-1">
                Total Order Completed
              </p>
            </div>

            <div className="text-3xl md:text-4xl font-bold ">
              <SpinnerAnimatedIcon className="text-red" />
            </div>
          </div>

          <div className="border border-natural-200 px-3 md:px-5 py-3 md:py-6 rounded-xl flex flex-col gap-5 md:gap-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
              <div className="w-10 h-10 bg-[#007DDD] rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-sm">
                  <TakaIconSvg />
                </span>
              </div>
              <p className="text-text-700 text-base font-medium mb-1">
                Total Sale
              </p>
            </div>

            <div className="text-3xl md:text-4xl font-bold ">
              <SpinnerAnimatedIcon className="text-red" />
            </div>
          </div>

          <div className="border border-natural-200 px-3 md:px-5 py-3 md:py-6 rounded-xl flex flex-col gap-5 md:gap-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
              <div className="w-10 h-10 bg-[#FF9D00] rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-sm">
                  <CommissionIconSvg />
                </span>
              </div>
              <p className="text-text-700 text-base font-medium mb-1">
                Total Commission
              </p>
            </div>

            <div className="text-3xl md:text-4xl font-bold ">
              <SpinnerAnimatedIcon className="text-red" />
            </div>
          </div>

          <div className="border border-natural-200 px-3 md:px-5 py-3 md:py-6 rounded-xl flex flex-col gap-5 md:gap-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
              <div className="w-10 h-10 bg-[#36AC59] rounded-full flex items-center justify-center mb-2">
                <span className="text-white text-sm">
                  <DueIconSvg />
                </span>
              </div>
              <p className="text-text-700 text-base font-medium mb-1">
                Due Commission
              </p>
            </div>

            <div className="text-3xl md:text-4xl font-bold ">
              <SpinnerAnimatedIcon className="text-red" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 border border-natural-200 rounded-2xl p-6">
          <div className="pr-6 lg:border-r border-natural-200">
            <h3 className="text-lg font-semibold text-text-950 mb-4">
              Basic Information
            </h3>
            <div className="space-y-3">
              <div className="flex">
                <span className="w-[40%] text-text-700">
                  Commission Per Trip:
                </span>
                <span className="w-[60%] font-medium skeleton"></span>
              </div>
              <div className="flex">
                <span className="w-[40%] text-text-700">Division:</span>
                <div className="flex flex-wrap gap-2 w-[60%] h-6 skeleton"></div>
              </div>
              <div className="flex">
                <span className="w-[40%] text-text-700">District:</span>
                <div className="flex flex-wrap gap-2 w-[60%] h-6 skeleton"></div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-text-950 mb-4">
              Assigned Upazila
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex gap-2 items-center">
                <span className="text-text-700">Upazila:</span>
                <div className="flex flex-wrap gap-2 skeleton w-full h-6"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-text-700 mb-4">
            Order Handled
          </h3>
          <div className="flex-1 overflow-auto">
            <table className="table">
              <thead className="table_head sticky top-0">
                <tr className="table_row bg-white-700">
                  <th className="table_th_first w-[100px]">Order ID</th>
                  <th className="table_th w-[150px]">Product Name</th>
                  <th className="table_th w-[130px]">Customer Name</th>
                  <th className="table_th w-[120px]">Phone Number</th>
                  <th className="table_th w-[150px]">Address</th>
                  <th className="table_th w-[100px]">Product Quantity</th>
                  <th className="table_th w-[100px]">Delivery Charge</th>
                  <th className="table_th w-[100px]">Total Price</th>
                  <th className="table_th w-[100px]">Commission</th>
                  <th className="table_th_last w-[100px]">Status</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(6)].map((order, index) => (
                  <tr key={index} className="table_row group skeleton">
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                    <td className="table_outline_td group-last:!border-b-0"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StaffDetailsSkeleton;
