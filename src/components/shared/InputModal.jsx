import { useState, useEffect } from "react";
import { errorNotify } from "@/services";
import SelectInput from "./SelectInput";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import LoadingInput from "./LoadingInput";

function InputModal({
  isOpen,
  onClose,
  title = "",
  subtitle = "",
  currentValue = "",
  inputLabel = "",
  inputType = "number",
  placeholder = "",
  selectOptions = [],
  onConfirm,
  isLoading = false,
  confirmText = "Confirm Update",
  cancelText = "Cancel",
  popupIcon = null,
  showIcon = false,
}) {
  const [inputValue, setInputValue] = useState("");

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  const handleConfirm = async () => {
    if (!inputValue || inputValue.toString().trim() === "") {
      errorNotify(`Please enter ${inputLabel.toLowerCase()}`);
      return;
    }

    if (inputType === "number" && (isNaN(inputValue) || inputValue <= 0)) {
      errorNotify(`Please enter a valid ${inputLabel.toLowerCase()}`);
      return;
    }

    try {
      await onConfirm(inputValue);
      setInputValue("");
      onClose();
    } catch (error) {
      // Error already handled in parent
    }
  };

  const handleClose = () => {
    setInputValue("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="px-10 py-12 gap-4 select-none rounded-2xl w-full max-w-xl font-hindSiliguri">
        <DialogHeader>
          {showIcon && (
            <div className="flex justify-center mb-4">{popupIcon}</div>
          )}
          <DialogTitle className="text-2xl font-bold text-text-700 text-center">
            {title}
          </DialogTitle>
          {subtitle && (
            <p className="text-base text-gray-600 text-center mt-2">
              {subtitle}
            </p>
          )}
        </DialogHeader>
        <DialogDescription className="m-0" />

        <div className="space-y-3">
          {/* Current Value Display */}
          {/* {currentValue && (
            <div className="text-center">
              <p className="text-text-700 text-sm mb-1">Current {inputLabel}:</p>
              <p className="text-lg font-semibold text-text-950">
                {currentValue}
              </p>
            </div>
          )} */}

          {/* Input Field */}
          <div>
            <label className="block text-text-700 mb-1 font-medium text-sm">
              {inputLabel}:
            </label>

            {inputType === "select" ? (
              isLoading ? (
                <LoadingInput />
              ) : (
                <SelectInput
                  data={selectOptions}
                  placeHolder={placeholder || `Select ${inputLabel}`}
                  value={inputValue}
                  onValueChange={(value) => setInputValue(value)}
                  triggerClassName=""
                  selector="value"
                  labelKey="label"
                />
              )
            ) : (
              <input
                type={inputType}
                placeholder={placeholder}
                className="w-full px-4 py-3 border border-natural-400 rounded-lg focus:outline-none focus:ring-0 focus:border-natural-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                min={inputType === "number" ? "0" : undefined}
                autoFocus
              />
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-8">
            <button
              onClick={handleClose}
              className="flex-1 py-3 px-4 border border-main-600 text-main-600 rounded-lg font-medium hover:bg-main-50 transition-colors text-sm"
            >
              {cancelText}
            </button>
            <button
              onClick={handleConfirm}
              disabled={isLoading || !inputValue}
              className="flex-1 py-3 px-4 bg-main-600 text-white rounded-lg font-medium hover:bg-main-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {isLoading ? "Updating..." : confirmText}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default InputModal;
