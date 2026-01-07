import NoData from "./NoData";

export default function TableNoData({
  column = 3,
  title = "",
  tableName = "Data",
}) {
  return (
    <tr className="table_row text-neutral-600">
      <td className="table_td" colSpan={column}>
        <div className="flex items-center justify-center min-h-[400px]">
          <NoData title={title} description={`No ${tableName} Found!`} />
        </div>
      </td>
    </tr>
  );
}
