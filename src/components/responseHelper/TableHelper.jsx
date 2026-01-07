import TableDataError from "../shared/TableDaraError";
import TableNoData from "../shared/TableNoData";
import TableSkeleton from "../shared/TableSkeleton";

function TableHelper({
  isLoading = false,
  isError = false,
  status = 404,
  column = 3,
  dataLength = 0,
  emptyTitle = "No data Found",
  errorTitle = "Couldn't retrieve the data.",
  tableName = "Data",
  children,
}) {
  if (isLoading) return <TableSkeleton column={column} />;
  else if (isError && status !== 404)
    return <TableDataError title={errorTitle} column={column} />;
  else if (dataLength === 0)
    return (
      <TableNoData title={emptyTitle} column={column} tableName={tableName} />
    );
  else return children;
}

export default TableHelper;
