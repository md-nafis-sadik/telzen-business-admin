import BackToPrev from "@/components/shared/BackToPrev";
import PaymentModal from "@/components/shared/PaymentModal";
import OrderHandledTable from "@/components/staffs/OrderHandledTable";
import StaffDetailsHelper from "@/components/staffs/StaffDetailsHelper";
import { useStaffDetails } from "@/hooks/useStaff";
import {
  ArrowAboveIconSvg,
  CommissionIconSvg,
  DueIconSvg,
  TakaIconSvg,
} from "@/services";
import { useState } from "react";
import { useParams } from "react-router-dom";

function StaffDetails() {
  const { slug } = useParams();
  const [showPayCommissionModal, setShowPayCommissionModal] = useState(false);

  const {
    staffDetails,
    staffOrderDetails,
    isFetching: isLoading,
    isError,
    error,
    isFetchingOrder,
    isErrorOrder,
    errorOrder,
    isPayingCommission,
    handlePayCommission: payCommission,
    orderPageData,
    handleOrdersPageChange,
  } = useStaffDetails();

  const handlePayCommissionClick = () => {
    setShowPayCommissionModal(true);
  };

  const handleCommissionPayment = async (amount) => {
    try {
      await payCommission(amount);
      setShowPayCommissionModal(false);
    } catch (error) {}
  };

  if (isError) {
    return (
      <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl font-inter">
        <BackToPrev path={`/admin/staffs/${slug}`} />
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">Error loading staff details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col bg-white p-4 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <BackToPrev path={`/admin/staffs/${slug}`} />
          <h1 className="text-gray-100 text-lg font-semibold leading-relaxed">
            Staffs Details
          </h1>
        </div>
      </div>
      <StaffDetailsHelper
        isFetching={isLoading}
        isError={isError}
        error={error}
      >
        <div className="flex flex-col gap-3">
          <div className="flex flex-col md:flex-row justify-between bg-white border border-natural-200 rounded-2xl p-3 md:p-5">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={staffDetails?.avatar}
                alt="Staff Avatar"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-text-950">
                  {staffDetails.full_name}
                </h2>
                <p className="text-text-700">{staffDetails.phone}</p>
                <p className="text-text-700">{staffDetails.staff_user_id}</p>
              </div>
            </div>

            <button
              onClick={handlePayCommissionClick}
              className="w-max h-max bg-main-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-main-700 transition-colors text-sm"
            >
              Pay Commission
            </button>
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

                <div className="text-3xl md:text-4xl font-bold text-text-900">
                  {staffDetails?.total_orders?.toLocaleString() ?? 0}
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

                <div className="text-3xl md:text-4xl font-bold text-text-900">
                  {staffDetails?.total_sales?.toLocaleString() ?? 0}
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

                <div className="text-3xl md:text-4xl font-bold text-text-900">
                  {staffDetails?.total_commission?.toLocaleString() ?? 0}
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

                <div className="text-3xl md:text-4xl font-bold text-text-900">
                  {staffDetails?.due_commission?.toLocaleString() ?? 0}
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
                    <span className="w-[60%] font-medium">
                      {staffDetails.commission_rate}
                    </span>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">Division:</span>
                    <div className="flex flex-wrap gap-2">
                      {staffDetails?.division?.map((division, index) => (
                        <span
                          key={index}
                          className="w-max font-medium rounded-full p-2 text-xs bg-natural-100"
                        >
                          {division}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex">
                    <span className="w-[40%] text-text-700">District:</span>
                    <div className="flex flex-wrap gap-2">
                      {staffDetails?.district?.map((district, index) => (
                        <span
                          key={index}
                          className="w-max font-medium rounded-full p-2 text-xs bg-natural-100"
                        >
                          {district}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-950 mb-4">
                  Assigned Upazila
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="flex gap-2">
                    <span className="text-text-700">Upazila:</span>
                    <div className="flex flex-wrap gap-2">
                      {staffDetails?.sub_district?.map((upazila, index) => (
                        <span
                          key={index}
                          className="w-max font-medium rounded-full p-2 text-xs bg-natural-100"
                        >
                          {upazila}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <OrderHandledTable
              orders={staffOrderDetails || []}
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
          </div>
        </div>
      </StaffDetailsHelper>

      <PaymentModal
        isOpen={showPayCommissionModal}
        onClose={() => setShowPayCommissionModal(false)}
        title="Commission Information"
        totalCommission={staffDetails?.total_commission || 0}
        pendingCommission={staffDetails?.due_commission || 0}
        onSubmit={handleCommissionPayment}
        isLoading={isPayingCommission}
      />
    </div>
  );
}

export default StaffDetails;
