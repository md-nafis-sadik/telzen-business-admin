import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import SelectInput from "@/components/shared/SelectInput";
import PaymentProofModal from "@/components/shared/PaymentProofModal";
import { useCancelledOrders } from "@/hooks/useOrders";
import { EditIconSvg, formatStatusText, ViewIconSvg } from "@/services";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";

function OrderCancelledTable() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    isFetching,
    isError,
    error,
    orders,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
    staffList,
    isLoadingStaff,
    loadingStaff,
    handleStaffChange,
  } = useCancelledOrders();

  const handleImageClick = (order) => {
    setSelectedOrder(order);
    setSelectedImage(order.payment_slip);
  };

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">Order ID</th>
              <th className="table_th w-[120px]">Product Name</th>
              <th className="table_th w-[150px]">Customer Name</th>
              <th className="table_th w-[120px]">Phone Number</th>
              <th className="table_th w-[180px]">Address</th>
              <th className="table_th w-[100px]">Product Quantity</th>
              <th className="table_th w-[120px]">Delivery Charge</th>
              <th className="table_th w-[120px]">Total Price</th>
              <th className="table_th w-[100px]">Payment Proof</th>
              <th className="table_th w-[100px]">Status</th>
              <th className="table_th w-[150px]">Staff Assign</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={orders.length}
              column={11}
              tableName="Cancelled Orders"
            >
              {orders.map((item, index) => (
                <tr key={item._id || index} className="table_row group">
                  <td className="table_outline_td">{item.order_id || "-"}</td>
                  <td className="table_outline_td">
                    {item.product_name || "-"}
                  </td>
                  <td className="table_outline_td">{item.name || "-"}</td>
                  <td className="table_outline_td">{item.phone || "-"}</td>
                  <td className="table_outline_td">
                    <div className="max-w-[170px] overflow-hidden whitespace-nowrap text-ellipsis mx-auto">
                      {item.delivery_address || "-"}
                    </div>
                  </td>
                  <td className="table_outline_td">
                    {item.order_quantity
                      ? item.order_quantity.toLocaleString()
                      : "-"}
                  </td>
                  <td className="table_outline_td">
                    {item.delivery_charge
                      ? item.delivery_charge.toLocaleString()
                      : "-"}
                  </td>
                  <td className="table_outline_td">
                    {item.total_payable_price
                      ? item.total_payable_price.toLocaleString()
                      : "-"}
                  </td>
                  <td className="table_outline_td">
                    {item.payment_slip ? (
                      <button
                        onClick={() => handleImageClick(item)}
                        className="w-12 h-12 rounded overflow-hidden border border-gray-200 hover:border-primary-500 transition-colors"
                      >
                        <img
                          src={item.payment_slip}
                          alt="Payment Proof"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="table_outline_td font-medium text-[#FF4646]">
                    {/* {formatStatusText(item?.sub_status) || "-"} */}
                    Cancelled
                  </td>
                  <td className="table_outline_td">
                    <div className="flex justify-center">
                      {loadingStaff[item._id] ? (
                        <div className="w-[148px] h-[38px] flex items-center justify-center animate-pulse bg-natural-200 rounded-lg"></div>
                      ) : (
                        <SelectInput
                          triggerClassName="w-[150px] min-h-[38px] p-3 data-[placeholder]:text-natural-500 bg-natural-100"
                          data={staffList}
                          value={item.staff || ""}
                          // onValueChange={(value) =>
                          //   handleStaffChange(value, item._id)
                          // }
                          placeHolder={
                            isLoadingStaff ? "Loading..." : "Select Staff"
                          }
                          labelKey="label"
                          selector="value"
                          name="staff"
                          disabled={true}
                        />
                      )}
                    </div>
                  </td>
                  <td className="table_outline_td flex gap-3 justify-center items-center ">
                    <div className="flex justify-center items-center ">
                      <Link to={`/admin/orders/cancelled/edit/${item._id}`}>
                        <ViewIconSvg />
                      </Link>
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
          total_items={total_items}
          updatePage={updatePage}
          per_page={per_page}
        />
      </div>

      <PaymentProofModal
        isOpen={!!selectedImage}
        onClose={() => {
          setSelectedImage(null);
          setSelectedOrder(null);
        }}
        imageUrl={selectedImage}
        orderInfo={selectedOrder}
      />
    </Fragment>
  );
}
export default OrderCancelledTable;
