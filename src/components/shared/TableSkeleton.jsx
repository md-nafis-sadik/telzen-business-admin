import CustomSpinner from "./CustomSpinner";

export default function TableSkeleton({ column = 10 }) {
  return (
    <tr className="table_row ">
      <td className="table_td" colSpan={column}>
        <CustomSpinner />
      </td>
    </tr>
  );
}
