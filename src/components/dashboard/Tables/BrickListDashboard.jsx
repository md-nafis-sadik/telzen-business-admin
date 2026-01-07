import TableHelper from "@/components/responseHelper/TableHelper";
import SelectInput from "@/components/shared/SelectInput";

function BrickListDashboard({
  isFetching,
  isError,
  error,
  data = [],
  filter,
  onFilterChange,
  filterOptions,
}) {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white shadow-md rounded-2xl overflow-auto w-full lg:w-[40%]">
      <div className="flex justify-between items-center">
        <h2 className="self-stretch h-6 justify-start text-text-700 text-lg font-bold leading-normal">
          Top Bricks
        </h2>
        <div className="flex items-center gap-2">
          <div className="text-text-500 text-sm">Filter: </div>
          <SelectInput
            data={filterOptions}
            value={filter}
            onValueChange={onFilterChange}
            placeHolder="Filter"
            labelKey="timestamp"
            selector="id"
            triggerClassName="w-32 !border-none p-1 font-semibold truncate !border-white text-sm"
          />
        </div>
      </div>
      <table className="table">
        <thead className="table_head sticky top-0">
          <tr className="table_row bg-white-700">
            <th className="table_th_first ">Product Name</th>
            <th className="table_th ">Brick Field</th>
            <th className="table_th ">Total Orders</th>
            <th className="table_th_last ">Total Quantity</th>
          </tr>
        </thead>
        <tbody>
          <TableHelper
            isLoading={isFetching}
            isError={isError}
            status={error?.status}
            dataLength={data?.length}
            column={4}
          >
            {data?.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="table_row group">
                  <td className="table_outline_td">
                    {item.product_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    {item.brick_field_name || "-"}
                  </td>
                  <td className="table_outline_td">{item.total_orders || 0}</td>
                  <td className="table_outline_td">
                    {item.total_quantity || 0}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-red-300 py-4">
                  No Data Found
                </td>
              </tr>
            )}
          </TableHelper>
        </tbody>
      </table>
    </div>
  );
}

export default BrickListDashboard;
