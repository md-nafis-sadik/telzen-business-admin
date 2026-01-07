import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { BRICK_TYPE_OPTIONS, getCapitalFirstLetter } from "@/services";
import { Fragment } from "react";

function OrderHandledTable({
  orders = [],
  title = "Order Handled",
  isFetching = false,
  isError = false,
  error = null,
  current_page = 1,
  per_page = 10,
  total_page = 1,
  total_items = 0,
  updatePage = () => {},
}) {
  return (
    <Fragment>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-text-700 mb-4">
          {title}
        </h3>
        <div className="flex-1 overflow-auto">
          <table className="table">
            <thead className="table_head sticky top-0">
              <tr className="table_row bg-white-700">
                <th className="table_th_first w-[100px]">Order ID</th>
                <th className="table_th w-[150px]">Product Name</th>
                <th className="table_th w-[130px]">Brick Type</th>
                <th className="table_th w-[120px]">Address</th>
                <th className="table_th w-[150px]">Product Quantity</th>
                <th className="table_th w-[100px]">Delivery Charge</th>
                <th className="table_th w-[100px]">Total Price</th>
                <th className="table_th_last w-[100px]">Status</th>
              </tr>
            </thead>
            <tbody>
              <TableHelper
                isLoading={isFetching}
                isError={isError}
                status={error?.status}
                dataLength={orders.length}
                column={9}
                tableName="Order History"
              >
                {orders.map((order, index) => (
                  <tr key={index} className="table_row group">
                    <td className="table_outline_td group-last:!border-b-0">
                      {order.order_id}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {order.product_name}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {BRICK_TYPE_OPTIONS.find(
                        (item) => item.id === order.brick_type
                      )?.label || order.brick_type}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {order.delivery_address}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {order.order_quantity.toLocaleString()}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {order.delivery_charge?.toLocaleString()}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {order.total_amount?.toLocaleString()}
                    </td>
                    <td className="table_outline_td group-last:!border-b-0">
                      {getCapitalFirstLetter(order.status)}
                    </td>
                  </tr>
                ))}
              </TableHelper>
            </tbody>
          </table>
        </div>
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

export default OrderHandledTable;
