import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useStaffs } from "@/hooks";
import {
  BlockIconSvg,
  EditIconSvg,
  DeleteIconSvg,
  ActiveIconSvg,
  images,
} from "@/services";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function StaffTable() {
  const {
    staffList,
    isFetching,
    isError,
    error,
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    handlePageChange,
    handleOpenBlockModal,
    handleUnblockStaff,
    handleDeleteStaff,
    isDeletingStaff,
  } = useStaffs();

  const handleDelete = (staffId) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      handleDeleteStaff(staffId);
    }
  };

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">SL</th>
              <th className="table_th w-[200px]">Staff Name</th>
              <th className="table_th w-[150px]">Role</th>
              <th className="table_th w-[200px]">Email</th>
              <th className="table_th w-[150px]">Phone</th>
              <th className="table_th_last w-[120px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={staffList.length}
              column={7}
              tableName="Staffs"
            >
              {staffList.map((staff, index) => (
                <tr key={staff._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {(currentPage - 1) * pageSize + index + 1}
                  </td>
                  <td className="table_outline_td">
                    <div className="flex items-center gap-2">
                      <img
                        src={staff?.avatar || images.staffAvatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span>{staff?.full_name || "-"}</span>
                    </div>
                  </td>
                  <td className="table_outline_td">
                    {staff?.role?.name || "-"}
                  </td>
                  <td className="table_outline_td">{staff?.email || "-"}</td>
                  <td className="table_outline_td">{staff?.phone || "-"}</td>

                  <td className="table_outline_td">
                    <div className="flex gap-3 justify-center items-center">
                      <Link to={`/admin/staffs/edit/${staff._id}`}>
                        <EditIconSvg />
                      </Link>

                      {staff?.status === "active" ? (
                        <button
                          onClick={() => handleOpenBlockModal(staff)}
                          title="Block Staff"
                        >
                          <BlockIconSvg />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUnblockStaff(staff._id)}
                          title="Unblock Staff"
                        >
                          <ActiveIconSvg color="#10B981" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(staff._id)}
                        disabled={isDeletingStaff}
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
          current_page={currentPage}
          total_page={totalPages}
          updatePage={handlePageChange}
          per_page={pageSize}
          total_items={totalItems}
        />
      </div>
    </Fragment>
  );
}

export default StaffTable;
