import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useActiveRegularUsers } from "@/hooks";
import { BlockIconSvg } from "@/services";
import moment from "moment";
import { Fragment } from "react";
import ReactCountryFlag from "react-country-flag";

function UsersActiveRegularTable() {
  const {
    isFetching,
    isError,
    error,
    users,
    current_page,
    limit,
    total_page,
    total_items,
    updatePage,
    handleBlockClick,
  } = useActiveRegularUsers();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">ID</th>
              <th className="table_th w-[120px]">Country</th>
              <th className="table_th w-[150px]">Name</th>
              <th className="table_th w-[200px]">Email</th>
              <th className="table_th w-[120px]">Date</th>
              <th className="table_th w-[100px]">Status</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={users.length}
              column={7}
              tableName="Active Regular Users"
            >
              {users.map((user, index) => (
                <tr key={user._id || index} className="table_row group">
                  <td className="table_outline_td">{user?.uid || "-"}</td>
                  <td className="table_outline_td">
                    <div className="flex items-center justify-center gap-2">
                      <ReactCountryFlag
                        countryCode={user?.country?.code}
                        svg
                        style={{
                          width: "1.3em",
                          height: "1.3em",
                          borderRadius: "100%",
                          objectPosition: "center",
                          objectFit: "cover",
                        }}
                        title={user?.country?.name || ""}
                      />
                      <span>{user?.country?.name || "-"}</span>
                    </div>
                  </td>
                  <td className="table_outline_td">
                    {user?.name || user?.full_name || "-"}
                  </td>
                  <td className="table_outline_td">{user?.email || "-"}</td>
                  <td className="table_outline_td">
                    {user?.created_at
                      ? moment.unix(user.created_at).format("DD-MM-YYYY")
                      : "-"}
                  </td>
                  <td className="table_outline_td">
                    <div>
                      {user?.is_blocked ? (
                        <span className="text-red-100">Blocked</span>
                      ) : (
                        <span className="text-green-600">Active</span>
                      )}
                    </div>
                  </td>
                  <td className="table_outline_td flex gap-3 justify-center items-center">
                    <div>
                      {/* <Link
                      to={`${adminRouteLinks.usersActive.path}/details/${user._id || user.id}`}
                      className="cursor-pointer"
                    >
                      <ViewIconSvg />
                    </Link> */}
                      <button
                        className="cursor-pointer"
                        onClick={() => handleBlockClick(user)}
                      >
                        <BlockIconSvg />
                      </button>
                    </div>
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

export default UsersActiveRegularTable;
