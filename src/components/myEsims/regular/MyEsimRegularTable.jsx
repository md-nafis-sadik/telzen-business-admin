import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useRegularMyEsims } from "@/hooks/useMyEsim";
import { DownloadIconSvg, formatData, formatDate, QRIconSvg } from "@/services";
import { Fragment } from "react";

function MyEsimRegularTable() {
  const {
    isFetching,
    isError,
    error,
    myEsims,
    current_page,
    limit,
    total_page,
    total_items,
    updatePage,
    handleOpenQrModal,
    handleDownloadInvoice,
    loadingInvoiceId,
  } = useRegularMyEsims();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">SL</th>
              <th className="table_th w-[100px]">Date</th>
              <th className="table_th w-[100px]">Customer</th>
              <th className="table_th w-[100px]">Customer Email</th>
              <th className="table_th w-[120px]">Customer phone</th>
              <th className="table_th w-[150px]">Package</th>
              <th className="table_th w-[100px]">Data Limit</th>
              <th className="table_th w-[100px]">Usage</th>
              <th className="table_th w-[100px]">Line Status</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={myEsims.length}
              column={10}
              tableName="Regular MyEsim"
            >
              {myEsims.map((myEsim, index) => {
                return (
                  <tr key={myEsim._id || index} className="table_row group">
                    <td className="table_outline_td">
                      {(current_page - 1) * limit + index + 1 || "-"}
                    </td>
                    <td className="table_outline_td">
                      {formatDate(myEsim.created_at)}
                    </td>
                    <td className="table_outline_td">
                      {myEsim?.customer?.name || "-"}
                    </td>
                    <td className="table_outline_td">
                      {myEsim?.customer?.email || "-"}
                    </td>
                    <td className="table_outline_td">
                      {myEsim?.customer?.phone || "-"}
                    </td>
                    <td className="table_outline_td">
                      {myEsim?.package?.name || "-"}
                    </td>
                    <td className="table_outline_td">
                      {myEsim?.total_stats?.total_data
                        ? formatData(myEsim?.total_stats?.total_data)
                        : "-"}
                    </td>
                    <td className="table_outline_td">
                      {myEsim?.total_stats?.total_data
                        ? formatData(myEsim?.total_stats?.total_data_usages)
                        : "-"}
                    </td>
                    <td className="table_outline_td">
                      <span className={`capitalize`}>
                        {myEsim?.status || "-"}
                      </span>
                    </td>
                    <td className="table_outline_td">
                      <span className="flex gap-3 justify-center items-center">
                        <button onClick={() => handleOpenQrModal(myEsim)}>
                          <QRIconSvg />
                        </button>

                        {loadingInvoiceId === myEsim._id ? (
                          <button className="flex items-center justify-center cursor-not-allowed">
                            <span className="w-5 h-5 m-0.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          </button>
                        ) : (
                          <button onClick={() => handleDownloadInvoice(myEsim)}>
                            <DownloadIconSvg />
                          </button>
                        )}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </TableHelper>
          </tbody>
        </table>
      </div>

      <div className="max-w-full border-gray-200 rounded-b-lg bg-white">
        <Pagination
          current_page={current_page}
          total_page={total_page}
          updatePage={updatePage}
          limit={limit}
          total_items={total_items}
        />
      </div>
    </Fragment>
  );
}

export default MyEsimRegularTable;
