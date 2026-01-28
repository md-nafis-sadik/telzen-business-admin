import MyEsimGroupDetailsTable from "@/components/myEsims/group/MyEsimGroupDetailsTable";
import RequestLoader from "@/components/shared/RequestLoader";
import { useGroupEsimDetails } from "@/hooks/useMyEsim";
import { images } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { closeQrModal, closeRemoveModal } from "@/features/myEsim/myEsimSlice";
import CustomModal from "@/components/shared/CustomModal";
import { useParams } from "react-router-dom";
import MyEsimGroupDetailsHeader from "@/components/myEsims/group/MyEsimGroupDetailsHeader";

function GroupEsimDetails() {
  const { id: groupId } = useParams();
  const dispatch = useDispatch();
  const { showQrModal, showRemoveModal, selectedData } = useSelector(
    (state) => state.myEsim,
  );

  const { isLoading } = useGroupEsimDetails(groupId);

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <MyEsimGroupDetailsHeader />

      <MyEsimGroupDetailsTable />

      <CustomModal
        showModal={showQrModal}
        onClose={() => dispatch(closeQrModal())}
        title="Success!"
        widthClass="sm:w-auto"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-6">
            <img
              src={selectedData?.qr_code_url}
              alt="QR Code"
              className="w-full lg:w-[300px]"
            />
          </div>
          <div className="text-center">
            <div className="font-barlowCondensed text-6xl font-[900] uppercase">
              eSIM QR Code
            </div>
            <div className="font-inter text-lg">
              Download or scan the code to install eSIM
            </div>
          </div>
          <a
            href={selectedData?.qr_code_url}
            download={`esim-qr-${selectedData?.iccid || "code"}.png`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded_button"
          >
            Download
          </a>
        </div>
      </CustomModal>

      <CustomModal
        showModal={showRemoveModal}
        onClose={() => dispatch(closeRemoveModal())}
      >
        <div className="flex flex-col items-center gap-6">
          <div>
            <div className="mb-4 flex justify-center">
              <div className="flex justify-center items-center h-full">
                <img
                  src={images.removeIcon}
                  alt="world"
                  width={130}
                  height={130}
                  priority
                />
              </div>
            </div>

            <div className="text-4xl md:text-[48px] font-[900] text-black font-barlowCondensed mb-1 uppercase text-center">
              removing esim?
            </div>

            <div className="text-text-700 text-center text-sm md:text-[17px] leading-6 max-w-sm">
              Removing an eSIM will loose access to this connection. Make sure
              to your decision.
            </div>
          </div>

          {/* Buttons */}
          <div className="flex w-full gap-3">
            <button
              className="flex-1 rounded_button_cancel"
              onClick={() => dispatch(closeRemoveModal())}
            >
              Cancel
            </button>

            <button className="flex-1 rounded_button">Remove</button>
          </div>
        </div>
      </CustomModal>

      {isLoading && <RequestLoader />}
    </div>
  );
}

export default GroupEsimDetails;
