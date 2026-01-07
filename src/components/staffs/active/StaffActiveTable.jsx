import TableHelper from "@/components/responseHelper/TableHelper";
import HoverTooltip from "@/components/shared/HoverTooltip";
import Pagination from "@/components/shared/Pagination";
import { useActiveStaffs } from "@/hooks/useStaff";
import {
  adminRouteLinks,
  BlockIconSvg,
  EditIconSvg,
  images,
  ViewIconSvg,
} from "@/services";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function StaffActiveTable() {
  const {
    isFetching,
    isError,
    error,
    staffs,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
    handleShowBlockModal,
  } = useActiveStaffs();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">Staff ID</th>
              <th className="table_th_first w-[50px]">Avatar</th>
              <th className="table_th w-[150px]">Staff Name</th>
              <th className="table_th w-[120px]">Division</th>
              <th className="table_th w-[120px]">District</th>
              <th className="table_th w-[200px]">Upazilla</th>
              <th className="table_th w-[120px]">Commission</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={staffs.length}
              column={8}
              tableName="Active Staff"
            >
              {staffs.map((staff, index) => (
                <tr key={staff._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {staff?.staff_user_id || "-"}
                  </td>
                  <td className="table_outline_td">
                    <div className="flex justify-center items-center">
                      <img
                        src={staff?.avatar || images.staffAvatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="table_outline_td">
                    {staff?.full_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={staff?.division}
                      label="Division"
                      groupName="division"
                    />
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={staff?.district}
                      label="District"
                      groupName="district"
                    />
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={staff?.sub_district}
                      label="Upazila"
                      groupName="upazila"
                    />
                  </td>
                  <td className="table_outline_td">
                    {staff.commission_rate
                      ? `${staff.commission_rate.toLocaleString()}`
                      : "-"}
                  </td>
                  <td className="table_outline_td flex gap-3 justify-center items-center ">
                    <Link
                      to={`${adminRouteLinks.staffActive.path}/details/${staff._id}`}
                    >
                      <ViewIconSvg />
                    </Link>
                    <Link
                      to={`/admin/staffs/active/edit/${staff._id}`}
                    >
                      <EditIconSvg />
                    </Link>
                    <button onClick={() => handleShowBlockModal(staff)}>
                      <BlockIconSvg />
                    </button>
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
          per_page={per_page}
          total_items={total_items}
        />
      </div>
    </Fragment>
  );
}

export default StaffActiveTable;
