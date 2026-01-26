import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useBlockedGroupUsers } from "@/hooks";
import { adminRouteLinks, ViewIconSvg, DeleteIconSvg } from "@/services";
import moment from "moment";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openDeleteGroupModal } from "@/features/users/usersSlice";

function UsersBlockedGroupTable() {
  const dispatch = useDispatch();
  const {
    isFetching,
    isError,
    error,
    groups,
    current_page,
    limit,
    total_page,
    total_items,
    updatePage,
  } = useBlockedGroupUsers();

  const handleDeleteClick = (group) => {
    dispatch(openDeleteGroupModal(group));
  };

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">SL</th>
              <th className="table_th w-[150px]">Date</th>
              <th className="table_th w-[400px]">Group</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={groups.length}
              column={4}
              tableName="Blocked Groups"
            >
              {groups.map((group, index) => (
                <tr key={group._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {(current_page - 1) * limit + index + 1}
                  </td>
                  <td className="table_outline_td">
                    {group?.created_at
                      ? moment.unix(group.created_at).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td className="table_outline_td">
                    {group?.group_name || group?.name || "Group Name 1"}
                  </td>
                  <td className="table_outline_td flex gap-3 justify-center items-center">
                    <Link
                      to={`${adminRouteLinks.usersBlocked.path}/group/${group._id || group.id}`}
                      className="cursor-pointer"
                    >
                      <ViewIconSvg />
                    </Link>
                    <button
                      className="cursor-pointer"
                      onClick={() => handleDeleteClick(group)}
                    >
                      <DeleteIconSvg />
                    </button>
                  </td>
                </tr>
              ))}
            </TableHelper>
          </tbody>
        </table>
      </div>

      <Pagination
        current_page={current_page}
        limit={limit}
        total_page={total_page}
        total_items={total_items}
        onChange={updatePage}
      />
    </Fragment>
  );
}

export default UsersBlockedGroupTable;
