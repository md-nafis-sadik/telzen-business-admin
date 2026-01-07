import { OrderHandledTable } from "@/components/customers";
import CustomerDetailsHelper from "@/components/customers/CustomerDetailsHelper";
import BackToPrev from "@/components/shared/BackToPrev";
import DocumentShow from "@/components/shared/DocumentShow";
import { useCustomerDetails } from "@/hooks";
import {
  ArrowAboveIconSvg,
  CommissionIconSvg,
  CUSTOMER_STATUS,
  DueIconSvg,
  FileIconSvg,
  getCapitalFirstLetter,
  getCustomerFileNameFromUrl,
  TakaIconSvg,
} from "@/services";
import { useParams } from "react-router-dom";

function CustomerDetails() {
  const {
    customerDetails,
    customerOrderDetails,
    isFetching: isLoading,
    isError,
    error,
    isFetchingOrder,
    isErrorOrder,
    errorOrder,
    handleApprove,
    handleReject,
    handleBlock,
    handleUnblock,
    isApproving,
    isRejecting,
    isBlocking,
    isUnblocking,
    orderPageData,
    handleOrdersPageChange,
  } = useCustomerDetails();

  const { slug } = useParams();

  if (isError) {
    return (
      <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
        <BackToPrev path={`/admin/customers/${slug}`} />
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading Customer details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-white p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackToPrev path={`/admin/customers/${slug}`} />
          <h1 className="text-gray-100 text-lg font-semibold leading-relaxed">
            Customer Details
          </h1>
        </div>
      </div>
      <CustomerDetailsHelper
        isFetching={isLoading}
        isError={isError}
        error={error}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row justify-between bg-white border border-natural-200 rounded-2xl p-3 md:p-5">
            <div className="flex w-full justify-between items-start">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={customerDetails.profile_image}
                  alt="Staff Avatar"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-text-950">
                    {customerDetails.name}
                  </h2>
                  <p className="text-text-700">{customerDetails.phone}</p>
                  <p className="text-text-700">{customerDetails.app_user_id}</p>
                </div>
              </div>
              {slug === CUSTOMER_STATUS.PENDING && (
                <div className="flex gap-4">
                  <button
                    onClick={handleReject}
                    disabled={isRejecting || isApproving}
                    className="w-[120px] h-10 btn_cancel disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isRejecting ? "Rejecting..." : "Reject"}
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isApproving || isRejecting}
                    className="w-[120px] h-10 btn_save disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApproving ? "Approving..." : "Approve"}
                  </button>
                </div>
              )}
              {slug === CUSTOMER_STATUS.ACTIVE && (
                <div className="flex items-center gap-2 bg-green-300 py-2 px-4 rounded-lg">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  <span className="font-medium text-sm text-green-400">
                    Active
                  </span>
                </div>
              )}

              {slug === CUSTOMER_STATUS.BLOCKED && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-red-50 py-2 px-4 rounded-lg">
                    <span className="w-2 h-2 bg-red rounded-full"></span>
                    <span className="font-medium text-sm text-red">
                      Blocked
                    </span>
                  </div>
                  <button
                    onClick={handleUnblock}
                    disabled={isUnblocking}
                    className="w-[120px] h-10 btn_save disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isUnblocking ? "Unblocking..." : "Unblock"}
                  </button>
                </div>
              )}

              {slug === CUSTOMER_STATUS.REJECTED && (
                <div className="flex gap-4">
                  <button className="w-[120px] h-10 btn_disabled" disabled>
                    Reject
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={isApproving}
                    className="w-[120px] h-10 btn_save disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isApproving ? "Approving..." : "Approve"}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="">
            {(slug === CUSTOMER_STATUS.ACTIVE ||
              slug === CUSTOMER_STATUS.BLOCKED) && (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-3">
                <div className="border border-natural-200 px-3 md:px-5 py-3 md:py-6 rounded-xl flex flex-col gap-5 md:gap-10">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-3">
                    <div className="w-10 h-10 bg-[#F64D00] rounded-full flex items-center justify-center mb-2">
                      <span className="text-white text-sm">
                        <ArrowAboveIconSvg />
                      </span>
                    </div>
                    <p className="text-text-700 text-base font-medium mb-1">
                      Total Order
                    </p>
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-text-900">
                    {customerDetails?.total_orders?.toLocaleString() ?? 0}
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
                      Order Amount
                    </p>
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-text-900">
                    {customerDetails?.total_order_amounts?.toLocaleString() ??
                      0}
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
                      Successful Order
                    </p>
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-text-900">
                    {customerDetails?.total_completed_orders?.toLocaleString() ??
                      0}
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
                      Cancelled Order
                    </p>
                  </div>

                  <div className="text-3xl md:text-4xl font-bold text-text-900">
                    {customerDetails?.total_cancelled_orders?.toLocaleString() ??
                      0}
                  </div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 border border-natural-200 rounded-2xl p-6">
              <div className="pr-6 lg:border-r border-natural-200">
                <h3 className="text-lg font-semibold text-text-950 mb-4">
                  Business Information
                </h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-[40%] text-text-700">Type:</span>
                    <span className="w-[60%] font-medium">
                      {getCapitalFirstLetter(customerDetails.account_type)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">Company Name:</span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.company_name}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">NID No:</span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.nid_number}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">
                      Trade License No:
                    </span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.trade_license_number || ""}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-950 mb-4">
                  Basic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex">
                    <span className="w-[40%] text-text-700">Division:</span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.division}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">District:</span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.district}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">Upazilla:</span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.sub_district}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">Address:</span>
                    <span className="w-[60%] font-medium">
                      {customerDetails.address}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 border border-natural-200 rounded-2xl p-6">
              <div className="pr-6 lg:border-r border-natural-200">
                <h3 className="text-lg font-semibold text-text-950 mb-4">
                  Customer Documents
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-[40%] text-text-700">
                      Customer NID Card Front:
                    </span>
                    <span className="flex flex-1 gap-3 items-center">
                      <span className=" font-medium flex flex-1 bg-natural-100 h-10 items-center px-2 rounded-lg">
                        <div className="flex gap-2">
                          <FileIconSvg />
                          {getCustomerFileNameFromUrl(
                            customerDetails?.nid_front
                          )}
                        </div>
                      </span>
                      <div className="cursor-pointer">
                        <DocumentShow
                          title="NID Front Side"
                          fileUrl={customerDetails?.nid_front}
                        />
                      </div>
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-[40%] text-text-700">
                      Customer NID Card Back:
                    </span>
                    <span className="flex flex-1 gap-3 items-center">
                      <span className=" font-medium flex flex-1 bg-natural-100 h-10 items-center px-2 rounded-lg">
                        <div className="flex gap-2">
                          <FileIconSvg />
                          {getCustomerFileNameFromUrl(customerDetails.nid_back)}
                        </div>
                      </span>
                      <div className="cursor-pointer">
                        <DocumentShow
                          title="NID Back Side"
                          fileUrl={customerDetails?.nid_back}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-950 mb-4 opacity-0 select-none">
                  --
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="w-[40%] text-text-700">
                      Trade License Image:
                    </span>
                    <span className="flex flex-1 gap-3 items-center">
                      <span className=" font-medium flex flex-1 bg-natural-100 h-10 items-center px-2 rounded-lg">
                        <div className="flex gap-2">
                          <FileIconSvg />
                          {getCustomerFileNameFromUrl(
                            customerDetails.trade_license
                          )}
                        </div>
                      </span>
                      <div className="cursor-pointer">
                        <DocumentShow
                          title="Trade License"
                          fileUrl={customerDetails.trade_license}
                        />
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {(slug === CUSTOMER_STATUS.ACTIVE ||
              slug === CUSTOMER_STATUS.BLOCKED) && (
              <OrderHandledTable
                orders={customerOrderDetails || []}
                title="Order Handled"
                isFetching={isFetchingOrder}
                isError={isErrorOrder}
                error={errorOrder}
                current_page={orderPageData?.currentPage || 1}
                per_page={orderPageData?.pageSize || 10}
                total_page={orderPageData?.totalPages || 1}
                total_items={orderPageData?.totalItems || 0}
                updatePage={handleOrdersPageChange}
              />
            )}
          </div>
        </div>
      </CustomerDetailsHelper>
    </div>
  );
}

export default CustomerDetails;
