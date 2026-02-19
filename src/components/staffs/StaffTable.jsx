import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useStaffs } from "@/hooks";
import {
  ActiveIconSvg,
  BlockIconSvg,
  DeleteIconSvg,
  EditIconSvg,
  EditYellowIconSvg,
  roleLabelMap,
} from "@/services";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function StaffTable() {
  const {
    staffList,
    isFetching,
    isError,
    error,
    current_page,
    limit,
    total_page,
    total_items,
    updatePage,
    handleOpenBlockModal,
    handleOpenUnblockModal,
    handleOpenDeleteModal,
  } = useStaffs();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">SL</th>
              <th className="table_th_first w-[80px]">Image</th>
              <th className="table_th w-[200px]">Staff Name</th>
              <th className="table_th w-[150px]">Role</th>
              <th className="table_th w-[200px]">Email</th>
              <th className="table_th w-[150px]">Phone</th>
              <th className="table_th w-[150px]">Status</th>
              <th className="table_th_last w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={staffList.length}
              column={8}
              tableName="Staffs"
            >
              {staffList.map((staff, index) => (
                <tr key={staff._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {(current_page - 1) * limit + index + 1}
                  </td>
                  <td className="table_outline_td">
                    {staff?.image?.path ? (
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src={staff.image.path}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </div>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="table_outline_td">{staff?.name || "-"}</td>
                  <td className="table_outline_td">
                    {roleLabelMap[staff?.role] || "-"}
                  </td>
                  <td className="table_outline_td">{staff?.email || "-"}</td>
                  <td className="table_outline_td">{staff?.phone || "-"}</td>
                  <td
                    className={`table_outline_td ${
                      staff?.is_blocked ? "text-red-500" : "text-green-400"
                    }`}
                  >
                    {staff?.is_blocked ? "Blocked" : "Active" || "-"}
                  </td>

                  <td className="table_outline_td">
                    <div className="flex gap-3 justify-center items-center">
                      <Link to={`/admin/staffs/edit/${staff._id}`}>
                        <EditYellowIconSvg />
                      </Link>

                      {staff?.is_blocked === false ? (
                        <button
                          onClick={() => handleOpenBlockModal(staff)}
                          title="Block Staff"
                        >
                          <BlockIconSvg />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleOpenUnblockModal(staff)}
                          title="Unblock Staff"
                        >
                          <ActiveIconSvg color="#10B981" />
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenDeleteModal(staff)}
                        title="Delete Staff"
                      >
                        <DeleteIconSvg />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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

export default StaffTable;
