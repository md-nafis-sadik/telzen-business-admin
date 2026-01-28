import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useGroupMembers } from "@/hooks";
import { DeleteIconSvg, formatDate } from "@/services";
import { Fragment } from "react";
import ReactCountryFlag from "react-country-flag";
import { useParams } from "react-router-dom";

function UsersGroupMembersTable() {
  const { id } = useParams();
  const {
    members,
    current_page,
    limit,
    total_page,
    total_items,
    isFetching,
    isError,
    error,
    updatePage,
    handleRemoveClick,
  } = useGroupMembers(id);

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">ID</th>
              <th className="table_th w-[150px]">Country</th>
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
                  <td className="table_outline_td">{member?.uid || "-"}</td>
                  <td className="table_outline_td">
                    <div className="flex items-center justify-center gap-2">
                      <ReactCountryFlag
                        countryCode={member?.country?.code}
                        svg
                        style={{
                          width: "1.3em",
                          height: "1.3em",
                          borderRadius: "100%",
                          objectPosition: "center",
                          objectFit: "cover",
                        }}
                        title={member?.country?.name || ""}
                      />
                      <span>{member?.country?.name || "-"}</span>
                    </div>
                  </td>
                  <td className="table_outline_td">
                    {member?.name || member?.full_name || "-"}
                  </td>
                  <td className="table_outline_td">{member?.email || "-"}</td>
                  <td className="table_outline_td">
                    {formatDate(member.created_at)}
                  </td>
                  <td className="table_outline_td">
                    <span className="text-green-600">{"Active"}</span>
                  </td>
                  <td className="table_outline_td">
                    <span className="flex gap-3 justify-center items-center">
                      {/* <Link
                      to={`${adminRouteLinks.usersActive.path}/details/${member._id || member.id}`}
                      className="cursor-pointer"
                    >
                      <ViewIconSvg />
                    </Link> */}
                      <button
                        className="cursor-pointer"
                        onClick={() => handleRemoveClick(member)}
                      >
                        <DeleteIconSvg />
                      </button>
                    </span>
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
        updatePage={updatePage}
      />
    </Fragment>
  );
}

export default UsersGroupMembersTable;
