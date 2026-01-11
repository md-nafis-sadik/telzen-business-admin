import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useGroupMembers } from "@/hooks";
import { ViewIconSvg, DeleteIconSvg } from "@/services";
import { Fragment } from "react";
import { useParams } from "react-router-dom";

function UsersGroupMembersTable() {
  const { id } = useParams();
  const { members, meta, isFetching, isError, error, page, setPage } = useGroupMembers(id);

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">ID</th>
              <th className="table_th w-[150px]">Name</th>
              <th className="table_th w-[150px]">Mobile No.</th>
              <th className="table_th w-[200px]">Email</th>
              <th className="table_th w-[100px]">Status</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={members.length}
              column={6}
              tableName="Group Members"
            >
              {members.map((member, index) => (
                <tr key={member._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {member?.user_id || member?.id || "-"}
                  </td>
                  <td className="table_outline_td">
                    {member?.name || member?.full_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    {member?.mobile || member?.phone || "-"}
                  </td>
                  <td className="table_outline_td">
                    {member?.email || "-"}
                  </td>
                  <td className="table_outline_td">
                    <span className="text-green-600 font-semibold">
                      {member?.status || "Active"}
                    </span>
                  </td>
                  <td className="table_outline_td flex gap-3 justify-center items-center">
                    <button className="cursor-pointer">
                      <ViewIconSvg />
                    </button>
                    <button className="cursor-pointer">
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
        current_page={meta?.page || page}
        per_page={meta?.per_page || 10}
        total_page={meta?.last_page || 1}
        total_items={meta?.total || 0}
        onChange={setPage}
      />
    </Fragment>
  );
}

export default UsersGroupMembersTable;
