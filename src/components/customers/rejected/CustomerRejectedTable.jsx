import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useRejectedCustomers } from "@/hooks";
import {
  adminRouteLinks,
  getCapitalFirstLetter,
  ViewIconSvg,
} from "@/services";
import { Fragment } from "react";
import { Link } from "react-router-dom";

function CustomerRejectedTable() {
  const {
    isFetching,
    isError,
    error,
    customers,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
  } = useRejectedCustomers();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">Customer ID</th>
              <th className="table_th w-[50px]">Customer Name</th>
              <th className="table_th w-[120px]">Avatar</th>
              <th className="table_th w-[120px]">Type</th>
              <th className="table_th w-[120px]">Company Name</th>
              <th className="table_th w-[120px]">Division</th>
              <th className="table_th w-[120px]">District</th>
              <th className="table_th w-[120px]">Upazilla</th>
              <th className="table_th w-[180px]">Address</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={customers.length}
              column={10}
              tableName="Rejected Customers"
            >
              {customers.map((customer, index) => (
                <tr key={index} className="table_row group">
                  <td className="table_outline_td group-last:!border-b-0">
                    {customer.app_user_id}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    {customer.name}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    <div className="flex justify-center items-center">
                      <img
                        src={customer.profile_image}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    {getCapitalFirstLetter(customer.account_type)}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    {customer.company_name}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    {customer.division || "-"}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    {customer.district || "-"}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    {customer.upazilla || "-"}
                  </td>
                  <td className="table_outline_td group-last:!border-b-0">
                    <div className="max-w-[170px] overflow-hidden whitespace-nowrap text-ellipsis mx-auto">
                      {customer.address || "-"}
                    </div>
                  </td>
                  <td className="table_outline_td group-last:!border-b-0 flex gap-3 justify-center items-center ">
                    <Link
                      to={`${adminRouteLinks.customersRejected.path}/details/${customer._id}`}
                      title="View Details"
                    >
                      <ViewIconSvg />
                    </Link>
                  </td>
                </tr>
              ))}
            </TableHelper>
          </tbody>
        </table>
      </div>

      <div className="max-w-full rounded-b-lg bg-white">
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

export default CustomerRejectedTable;
