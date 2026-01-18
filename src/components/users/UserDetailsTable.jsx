import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useUserDetails } from "@/hooks";
import { DownloadIconSvg } from "@/services";
import { Fragment } from "react";

function UserDetailsTable() {
  const {
    user,
    esimBundles,
    esimMeta,
    isFetchingEsims,
    isEsimError,
    esimPage,
    setEsimPage,
  } = useUserDetails();

  return (
    <Fragment>
      <div className="mb-4">
        <h2 className="text-xl font-semibold">
          {user?.name || user?.full_name || "User Name"}
        </h2>
        <p className="text-gray-600">{user?.email || ""}</p>
      </div>

      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[150px]">ID</th>
              <th className="table_th w-[150px]">Bundle</th>
              <th className="table_th w-[100px]">Data Limit</th>
              <th className="table_th w-[100px]">Data Used</th>
              <th className="table_th w-[100px]">Date</th>
              <th className="table_th w-[100px]">Price</th>
              <th className="table_th w-[150px]">Bundle Purchased</th>
              <th className="table_th w-[120px]">SMDP Status</th>
              <th className="table_th_last w-[120px]">Line Status</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetchingEsims}
              isError={isEsimError}
              status={null}
              dataLength={esimBundles.length}
              column={9}
              tableName="eSIM Bundles"
            >
              {esimBundles.map((bundle, index) => (
                <tr key={bundle._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {bundle?.bundle_id || bundle?.id || "-"}
                  </td>
                  <td className="table_outline_td">
                    {bundle?.bundle_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    {bundle?.data_limit || "-"}
                  </td>
                  <td className="table_outline_td">
                    {bundle?.data_used || "0 MB"}
                  </td>
                  <td className="table_outline_td">
                    {bundle?.validity || bundle?.date || "-"}
                  </td>
                  <td className="table_outline_td">
                    ${bundle?.price || "0.00"}
                  </td>
                  <td className="table_outline_td">
                    {bundle?.purchased_at
                      ? new Date(bundle.purchased_at).toLocaleString()
                      : bundle?.bundle_purchased || "-"}
                  </td>
                  <td className="table_outline_td">
                    <span
                      className={`font-semibold ${
                        bundle?.smdp_status === "RELEASED"
                          ? "text-green-600"
                          : "text-gray-600"
                      }`}
                    >
                      {bundle?.smdp_status || "RELEASED"}
                    </span>
                  </td>
                  <td className="table_outline_td">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-semibold ${
                          bundle?.line_status === "Registered"
                            ? "text-green-600"
                            : "text-gray-600"
                        }`}
                      >
                        {bundle?.line_status || "Registered"}
                      </span>
                      <button className="cursor-pointer">
                        <DownloadIconSvg />
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
        current_page={esimMeta?.page || esimPage}
        limit={esimMeta?.limit || 10}
        total_page={esimMeta?.last_page || 1}
        total_items={esimMeta?.total || 0}
        onChange={setEsimPage}
      />
    </Fragment>
  );
}

export default UserDetailsTable;
