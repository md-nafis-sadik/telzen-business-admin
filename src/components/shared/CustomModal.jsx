import { forwardRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

const CustomModal = forwardRef(
  (
    {
      showModal = false,
      onClose = () => {},
      children,
      className = "",
      widthClass = "w-full sm:w-[566px]",
      ...rest
    },
    ref
  ) => {
    const closeModal = () => {
      onClose();
    };

    return (
      <Dialog open={showModal} onOpenChange={closeModal}>
        <DialogContent className={`p-6 sm:p-10 gap-0 select-none rounded-3xl ${className} ${widthClass}`}>
          <DialogHeader>
            <DialogTitle className="hidden"></DialogTitle>
          </DialogHeader>
          <DialogDescription className="m-0" />
          {children}
        </DialogContent>
      </Dialog>
    );
  }
);

CustomModal.displayName = "CustomModal";

export default CustomModal;
