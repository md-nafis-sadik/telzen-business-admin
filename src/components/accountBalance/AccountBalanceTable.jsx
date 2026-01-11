import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useAccountBalance } from "@/hooks";
import { ExportExcelIconSvg, PrintIconSvg } from "@/services";

function AccountBalanceTable() {
  const {
    dataList,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    summaryCards,
    isFetching,
    isError,
    error,
    handlePageChange,
    handleExport,
    handlePrint,
    hasData,
  } = useAccountBalance();
  return (
    <div className="bg-white w-full rounded-2xl overflow-hidden flex flex-col p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-gray-100 text-[18px] font-semibold">Sales</h2>
          <div className="font-light text-black-600 text-sm">
            All activity shows here
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex gap-3">
            <button
              className="inline-flex gap-2 btn_cancel disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleExport}
              disabled={!hasData}
            >
              <ExportExcelIconSvg/>
              <span className="text-sm font-semibold">Export to Excel</span>
            </button>

            <button
              className="inline-flex gap-2 btn_save disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handlePrint}
              disabled={!hasData}
            >
              <PrintIconSvg/>
              <span className="text-sm font-semibold">Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="printable-content">
        <div className="flex-1 overflow-auto">
          <table className="table">
            <thead className="table_head sticky top-0">
              <tr className="table_row bg-white-700 print:px-1 print:py-1 print:text-xs print:break-words print:whitespace-normal">
                <th className="table_th_first w-[80px]">SL</th>
                <th className="table_th w-[120px]">Date</th>
                <th className="table_th w-[150px]">Package</th>
                <th className="table_th w-[150px]">Customer</th>
                <th className="table_th w-[150px]">Group Name</th>
                <th className="table_th w-[200px]">Customer Email</th>
                <th className="table_th w-[150px]">Customer phone</th>
                <th className="table_th w-[120px]">Amount</th>
                <th className="table_th_last w-[120px]">Revenue</th>
              </tr>
            </thead>
            <tbody>
              <TableHelper
                isLoading={isFetching}
                isError={isError}
                status={error?.status}
                dataLength={dataList.length}
                column={9}
                tableName="Account Balance"
              >
                {dataList.map((item, index) => (
                  <tr key={index} className="table_row group">
                    <td className="table_outline_td print:text-xs">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      {item?.date || "25-10-2024"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      {item?.package || "Package 1"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      {item?.customer || "Cust Name 1"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      {item?.group_name || "-"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      {item?.customer_email || "cust@gmail.com"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      {item?.customer_phone || "+88 0215521552"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      ${item?.amount || "299"}
                    </td>
                    <td className="table_outline_td print:text-xs">
                      ${item?.revenue || "88"}
                    </td>
                  </tr>
                ))}
              </TableHelper>
            </tbody>
          </table>
        </div>

        <div className="max-w-full border-gray-200 rounded-b-lg bg-white pagination-print-hide">
          <Pagination
            current_page={currentPage}
            total_page={totalPages}
            updatePage={handlePageChange}
            per_page={pageSize}
            total_items={totalItems}
          />
        </div>
      </div>

      <style jsx>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 1cm;
          }

          body * {
            visibility: hidden;
          }
          .printable-content,
          .printable-content * {
            visibility: visible;
          }
          .printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .printable-content table {
            font-size: 10px;
            width: 100%;
          }
          button,
          .pagination-print-hide {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

export default AccountBalanceTable;
