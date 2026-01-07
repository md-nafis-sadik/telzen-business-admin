import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useBrickField } from "@/hooks/useBrickField";
import { EditIconSvg, DeleteIconSvg, ViewIconSvg } from "@/services";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { toggleDetailsModal } from "@/features/shared/sharedSlice";
import HoverTooltip from "../shared/HoverTooltip";

function BrickFieldTable() {
  const navigate = useNavigate();

  const {
    isFetching,
    isError,
    error,
    brickFields,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
    handleShowDeleteModal,
    dispatch,
    setSelectedBrickField,
  } = useBrickField();

  const handleView = (field) => {
    dispatch(setSelectedBrickField(field));
    dispatch(toggleDetailsModal(true));
  };

  const handleEdit = (field) => {
    navigate(`/admin/brick-field/edit/${field._id}`);
  };

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[120px]">ID No</th>
              <th className="table_th w-[200px]">Brick Field Name</th>
              <th className="table_th w-[120px]">Mobile Number</th>
              <th className="table_th w-[150px]">Division</th>
              <th className="table_th w-[150px]">District</th>
              <th className="table_th w-[150px]">Upazila</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={brickFields.length}
              column={7}
              tableName="BrickField"
            >
              {brickFields.map((field, index) => (
                <tr key={field._id || index} className="table_row group">
                  <td className="table_outline_td">
                    {field.brick_field_id || "-"}
                  </td>
                  <td className="table_outline_td">
                    {field.brick_field_name || "-"}
                  </td>
                  <td className="table_outline_td">{field.phone || "-"}</td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={field.division}
                      label="Division"
                      groupName="division"
                    />
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={field.district}
                      label="District"
                      groupName="district"
                    />
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={field.sub_district}
                      label="Upazila"
                      groupName="upazila"
                    />
                  </td>
                  <td className="table_outline_td">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        onClick={() => handleView(field)}
                        className="p-1 rounded"
                        title="View Details"
                      >
                        <ViewIconSvg />
                      </button>
                      <button
                        onClick={() => handleEdit(field)}
                        className="p-1 rounded"
                        title="Edit"
                      >
                        <EditIconSvg />
                      </button>
                      <button
                        onClick={() => handleShowDeleteModal(field)}
                        className="p-1 rounded"
                        title="Delete"
                      >
                        <DeleteIconSvg />
                      </button>
                    </div>
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

export default BrickFieldTable;
