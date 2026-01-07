import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import BrickStockAddModal from "./BrickStockAddModal";
import BrickStockHistoryModal from "./BrickStockHistoryModal";
import BrickStockEditModal from "./BrickStockEditModal";
import Modal from "@/components/shared/Modal";
import { useBrickStock } from "@/hooks/useBrickStock";
import {
  BlackPlusIconSvg,
  HistoryIconSvg,
  SuccessPopupIconSvg,
} from "@/services";
import { Fragment, useState } from "react";

function BrickStockTable() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedBrick, setSelectedBrick] = useState(null);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const {
    isFetching,
    isError,
    error,
    brickStocks,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
    handleUpdateStock,
    handleUpdateHistory,
    isLoading,
    refetch
  } = useBrickStock();

  const handleAddStock = (brick) => {
    setSelectedBrick(brick);
    setShowAddModal(true);
  };

  const handleViewHistory = (brick) => {
    setSelectedBrick(brick);
    setShowHistoryModal(true);
  };

  const handleStockUpdate = async (data) => {
    try {
      await handleUpdateStock(data);
      setShowAddModal(false);
      setSuccessMessage("Stock added successfully.");
      setShowSuccessModal(true);
    } catch (error) {
    }
  };

  const handleEditHistory = (historyItem) => {
    setSelectedHistory(historyItem);
    setShowHistoryModal(false);
    setShowEditModal(true);
  };

  const handleEditConfirm = async (data) => {
    try {
      await handleUpdateHistory(data);
      setShowEditModal(false);
      setSuccessMessage("Your stock information has been saved.");
      setShowSuccessModal(true);
      refetch();
    } catch (error) {
    }
  };

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[120px]">Product ID</th>
              <th className="table_th w-[150px]">Name</th>
              <th className="table_th w-[150px]">Brick Field</th>
              <th className="table_th w-[100px]">১ নং ইট</th>
              <th className="table_th w-[100px]">২ নং ইট</th>
              <th className="table_th w-[100px]">৩ নং ইট</th>
              <th className="table_th w-[100px]">পিকেট</th>
              <th className="table_th w-[100px]">আদলা</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={brickStocks.length}
              column={9}
              tableName="BrickStock"
            >
              {brickStocks.map((brick, index) => (
                <tr key={brick._id || index} className="table_row group">
                  <td className="table_outline_td">{brick?.brick_id || "-"}</td>
                  <td className="table_outline_td">
                    {brick.product_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.brick_field_name || "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.ek_no_et ? brick.ek_no_et.toLocaleString() : "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.dui_no_et ? brick.dui_no_et.toLocaleString() : "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.tin_no_et ? brick.tin_no_et.toLocaleString() : "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.picket ? brick.picket.toLocaleString() : "-"}
                  </td>
                  <td className="table_outline_td">
                    {brick.adla ? brick.adla.toLocaleString() : "-"}
                  </td>

                  <td className="table_outline_td">
                    <div className="flex gap-2 items-center justify-center">
                      <button
                        onClick={() => handleAddStock(brick)}
                        className="p-1 rounded"
                        title="Add Stock"
                      >
                        <BlackPlusIconSvg />
                      </button>

                      <button
                        onClick={() => handleViewHistory(brick)}
                        className="p-1 rounded"
                        title="View History"
                      >
                        <HistoryIconSvg />
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

      {/* Add Stock Modal */}
      <BrickStockAddModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        selectedBrick={selectedBrick}
        onConfirm={handleStockUpdate}
        isSubmitting={isLoading}
      />

      {/* History Modal */}
      <BrickStockHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        selectedBrick={selectedBrick}
        onEdit={handleEditHistory}
      />

      {/* Edit Modal */}
      <BrickStockEditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        selectedHistory={selectedHistory}
        selectedBrick={selectedBrick}
        onConfirm={handleEditConfirm}
        isSubmitting={isLoading}
      />

      {/* Success Modal */}
      <Modal
        confirmButtonClass="btn_success h-12 !w-full text-sm"
        confirmButton="Okay"
        title="Successful!"
        titleClass="text-text-700 leading-normal w-[400px]"
        actionPara={successMessage}
        popupIcon={<SuccessPopupIconSvg />}
        showModal={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        confirmHandeler={() => setShowSuccessModal(false)}
      />
    </Fragment>
  );
}

export default BrickStockTable;
