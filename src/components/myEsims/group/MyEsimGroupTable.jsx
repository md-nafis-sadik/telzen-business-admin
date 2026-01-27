import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useGroupMyEsims } from "@/hooks/useMyEsim";
import { formatDate, ViewIconSvg } from "@/services";
import { Fragment } from "react";

function MyEsimGroupTable() {
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
    handleViewDetails,
  } = useGroupMyEsims();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">SL</th>
              <th className="table_th w-[150px]">Group UID</th>
              <th className="table_th w-[150px]">Group Name</th>
              <th className="table_th w-[150px]">Package</th>
              <th className="table_th w-[120px]">Date</th>
              <th className="table_th w-[120px]">Total Items</th>
              <th className="table_th w-[120px]">Total Amount</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={myEsims.length}
              column={8}
              tableName="Group eSIM"
            >
              {myEsims.map((group, index) => {
                return (
                  <tr key={group._id || index} className="table_row group">
                    <td className="table_outline_td">
                      {(current_page - 1) * limit + index + 1 || "-"}
                    </td>
                    <td className="table_outline_td">
                      {group?.group_uid || "-"}
                    </td>
                    <td className="table_outline_td">
                      {group?.group_name || "-"}
                    </td>
                    <td className="table_outline_td">
                      {group?.package_name || "-"}
                    </td>
                    <td className="table_outline_td">
                      {formatDate(group?.order_created_at)}
                    </td>
                    <td className="table_outline_td">
                      {group?.total_purchased_item || 0}
                    </td>
                    <td className="table_outline_td">
                      ${group?.total_amount || 0}
                    </td>
                    <td className="table_outline_td">
                      <button
                        onClick={() => handleViewDetails(group._id)}
                        className="flex justify-center items-center w-full"
                      >
                        <ViewIconSvg />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </TableHelper>
          </tbody>
        </table>
      </div>

      <div className="max-w-full rounded-b-lg bg-white">
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
export default MyEsimGroupTable;
