import { DeletePopupIconSvg } from "@/services";
import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const Modal = forwardRef(
  (
    {
      label = "",
      labelClass = "",
      title = "",
      titleClass = "",
      wrapper = "",
      className = "",
      type = "text",
      icon = null,
      isLoading = false,
      confirmButton = "",
      cancelButton = "",
      confirmButtonClass = "",
      cancelButtonClass = "",
      popupIcon = null,
      actionText = "",
      typeText = "",
      actionPara = "",
      confirmHandeler = () => {},
      showModal = false,
      onClose = () => {},
      ...rest
    },
    ref
  ) => {
    const closeModal = () => {
      onClose();
    };

    return (
      <Dialog open={showModal} onOpenChange={closeModal}>
        <DialogContent className="p-6 sm:p-10 gap-0 select-none rounded-2xl w-full sm:w-[566px]">
          <DialogHeader>
            <DialogTitle
              className={`${labelClass} self-stretch justify-start text-[#004534E5]/80 text-2xl font-bold leading-normal`}
            >
              {label}
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="m-0" />

          <div className="flex flex-col items-center gap-10">
            {popupIcon ? popupIcon : <DeletePopupIconSvg />}
            <div className="flex flex-col gap-[2px]">
              <h1
                className={`${titleClass} self-stretch text-center justify-start text-2xl font-bold leading-loose`}
              >
                {title ? title : "Delete"}
              </h1>
              {actionText == "delete" ? (
                <p className="self-stretch text-center justify-start text-gray-600 text-base font-normal leading-normal">
                  This action can not be reversed. Please make sure before you{" "}
                  {actionText} this {typeText}.
                </p>
              ) : (
                <p className="self-stretch text-center justify-start text-gray-600 text-base font-normal leading-normal">
                  {actionPara}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between gap-6 w-full">
              {cancelButton && (
                <button className={`${cancelButtonClass}`} onClick={closeModal}>
                  {cancelButton}
                </button>
              )}
              {confirmButton && (
                <button
                  className={`${confirmButtonClass} bg-main-700 hover:bg-main-700`}
                  onClick={confirmHandeler}
                >
                  {confirmButton}
                </button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

Modal.displayName = "Modal";

export default Modal;
