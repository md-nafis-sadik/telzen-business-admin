import TableHelper from "@/components/responseHelper/TableHelper";
import Pagination from "@/components/shared/Pagination";
import { useRegularMyEsims } from "@/hooks/useMyEsim";
import {
  DeleteIconSvg,
  DownloadIconSvg,
  QRIconSvg,
} from "@/services";
import { Fragment } from "react";

function MyEsimRegularTable() {
  const {
    isFetching,
    isError,
    error,
    myEsims,
    current_page,
    per_page,
    total_page,
    total_items,
    updatePage,
    handleOpenQrModal,
    handleOpenRemoveModal,
    handleDownloadInvoice,
  } = useRegularMyEsims();

  return (
    <Fragment>
      <div className="flex-1 overflow-auto mt-4">
        <table className="table">
          <thead className="table_head sticky top-0">
            <tr className="table_row bg-white-700">
              <th className="table_th_first w-[80px]">SL</th>
              <th className="table_th w-[120px]">Date</th>
              <th className="table_th w-[50px]">Customer</th>
              <th className="table_th w-[50px]">Customer Email</th>
              <th className="table_th w-[150px]">Customer phone</th>
              <th className="table_th w-[120px]">Package</th>
              <th className="table_th w-[120px]">Data Limit</th>
              <th className="table_th w-[120px]">Usage</th>
              <th className="table_th w-[120px]">Line Status</th>
              <th className="table_th_last w-[100px]">Action</th>
            </tr>
          </thead>
          <tbody>
            <TableHelper
              isLoading={isFetching}
              isError={isError}
              status={error?.status}
              dataLength={myEsims.length}
              column={10}
              tableName="Regular MyEsim"
            >
              {myEsims.map((myEsim, index) => (
                <tr key={myEsim._id || index} className="table_row group">
                  <td className="table_outline_td">{index + 1 || "-"}</td>
                  <td className="table_outline_td">
                    25-10-2024
                    {/* <div className="flex justify-center items-center">
                      <img
                        src={myEsim?.avatar || images.myEsimAvatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    </div> */}
                  </td>
                  <td className="table_outline_td">
                    Cust Name 1{/* {myEsim?.full_name || "-"} */}
                  </td>
                  <td className="table_outline_td">
                    cust@gmail.com
                    {/* <HoverTooltip
                      items={myEsim?.division}
                      label="Division"
                      groupName="division"
                    /> */}
                  </td>
                  <td className="table_outline_td">
                    +88 0215521552
                    {/* <HoverTooltip
                      items={myEsim?.district}
                      label="District"
                      groupName="district"
                    /> */}
                  </td>
                  <td className="table_outline_td">
                    Package 1
                    {/* <HoverTooltip
                      items={myEsim?.sub_district}
                      label="Upazila"
                      groupName="upazila"
                    /> */}
                  </td>
                  <td className="table_outline_td">
                    10GB
                    {/* <HoverTooltip
                      items={myEsim?.sub_district}
                      label="Upazila"
                      groupName="upazila"
                    /> */}
                  </td>
                  <td className="table_outline_td">
                    8GB
                    {/* <HoverTooltip
                      items={myEsim?.sub_district}
                      label="Upazila"
                      groupName="upazila"
                    /> */}
                  </td>
                  <td className="table_outline_td">
                    Activated
                    {/* {myEsim.commission_rate
                      ? `${myEsim.commission_rate.toLocaleString()}`
                      : "-"} */}
                  </td>
                  <td className="table_outline_td flex gap-3 justify-center items-center ">
                    <button onClick={() => handleOpenQrModal(myEsim)}>
                      <QRIconSvg />
                    </button>
                    <button onClick={() => handleDownloadInvoice(myEsim)}>
                      <DownloadIconSvg />
                    </button>
                    <button onClick={() => handleOpenRemoveModal(myEsim)}>
                      <DeleteIconSvg />
                    </button>
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
          updatePage={updatePage}
          per_page={per_page}
          total_items={total_items}
        />
      </div>
    </Fragment>
  );
}

export default MyEsimRegularTable;
