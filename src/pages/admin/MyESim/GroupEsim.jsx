import MyEsimGroupHeader from "@/components/myEsims/group/MyEsimGroupHeader";
import MyEsimGroupTable from "@/components/myEsims/group/MyEsimGroupTable";
import RequestLoader from "@/components/shared/RequestLoader";
import { useGroupMyEsims } from "@/hooks/useMyEsim";
import { images } from "@/services";
import { useDispatch, useSelector } from "react-redux";
import { closeQrModal, closeRemoveModal } from "@/features/myEsim/myEsimSlice";
import CustomModal from "@/components/shared/CustomModal";

function MyEsimGroup() {
  const dispatch = useDispatch();
  const { showQrModal, showRemoveModal } = useSelector((state) => state.myEsim);

  const { blockConfirmHandler, isLoading } = useGroupMyEsims();

  return (
    <div className="w-full flex-1 flex flex-col overflow-auto bg-white p-4 rounded-2xl">
      <MyEsimGroupHeader />
      <MyEsimGroupTable />
      <CustomModal
        showModal={showQrModal}
        onClose={() => dispatch(closeQrModal())}
        title="Success!"
        widthClass="sm:w-auto"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-10">
            <img src={images.qrCode} alt="QR Code" className="max-w-[300px]" />
          </div>
          <div className="text-center">
            <div className="font-barlowCondensed text-6xl font-[900] uppercase">
              Esim QR Code
            </div>
            <div className="font-inter text-lg">
              Download or scan the code to install eSIM
            </div>
          </div>
          <button
            className="rounded_button
      "
          >
            Download
          </button>
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

export default MyEsimGroup;
