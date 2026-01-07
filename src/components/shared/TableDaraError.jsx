import ErrorUi from "./ErrorUi";

export default function TableDataError({ column = 3, title = "" }) {
  return (
    <tr className="table_row text-neutral-600">
      <td className="table_td" colSpan={column}>
        <div className="flex items-center justify-center min-h-[400px]">
          <ErrorUi title={title} />
        </div>
      </td>
    </tr>
  );
}
