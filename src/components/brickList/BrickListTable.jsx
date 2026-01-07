import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import InputModal from "@/components/shared/InputModal";
import { useBrickList } from "@/hooks/useBrickList";
import { EditIconSvg, DeleteIconSvg, getBrickTypeArrayLabels } from "@/services";
import { Fragment, useState } from "react";
import ToggleSwitch from "../shared/ToggleSwitch";
import HoverTooltip from "../shared/HoverTooltip";

function BrickListTable() {
  const {
    isFetching,
    isError,
    error,
    brickList,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
    handleUpdateBrickList,
    handleStatusChange,
    dispatch,
    loadingBrickId,
    handleShowDeleteModal,
  } = useBrickList();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[120px]">Product ID</th>
              <th className="table_th w-[150px]">Name</th>
              <th className="table_th w-[150px]">Brick Field</th>
              
              <th className="table_th w-[150px]" title="Division">
                Division
              </th>
              <th className="table_th w-[150px]" title="District">
                District
              </th>
              <th className="table_th w-[150px]" title="Sub District">
                Upazila
              </th>
              <th className="table_th w-[120px]">Mobile</th>
              <th className="table_th w-[120px]">Brick Type</th>
              <th className="table_th w-[100px]">Status</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={brickList.length}
              column={9}
              tableName="BrickList"
            >
              {brickList.map((brick, index) => (
                <tr key={index} className="table_row">
                  <td className="table_outline_td">{brick.brick_id || "-"}</td>
                  <td className="table_outline_td">
                    {brick.product_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.brick_field_name || "-"}
                  </td>
                  
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={brick.division}
                      label="Division"
                      groupName="division"
                    />
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={brick.district}
                      label="District"
                      groupName="district"
                    />
                  </td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={brick.sub_district}
                      label="Upazila"
                      groupName="upazila"
                    />
                  </td>
                  <td className="table_outline_td">{brick.phone || "-"}</td>
                  <td className="table_outline_td">
                    <HoverTooltip
                      items={getBrickTypeArrayLabels(brick.brick_type)}
                      label="Type"
                      groupName="type"
                    /></td>
                  <td className="table_outline_td">
                    <span className="flex items-center justify-center">
                      <ToggleSwitch
                        checked={brick.status}
                        onChange={() => handleStatusChange(brick)}
                        isLoading={loadingBrickId === brick._id}
                      />
                    </span>
                  </td>
                  <td className="table_outline_td">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        onClick={() => handleUpdateBrickList(brick)}
                        className="p-1 rounded"
                        title="Edit Brick"
                      >
                        <EditIconSvg />
                      </button>

                      {/* <button
                        onClick={() => handleShowDeleteModal(brick)}
                        className="p-1 rounded"
                        title="Delete Brick"
                      >
                        <DeleteIconSvg />
                      </button> */}
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

export default BrickListTable;
