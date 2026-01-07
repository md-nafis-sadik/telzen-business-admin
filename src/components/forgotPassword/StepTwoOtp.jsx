import React from "react";
import { useStepTwoOtp } from "@/hooks/useForgetPassword";
import OtpInput from "../shared/OtpInput";

const StepTwoOtp = ({ goToStep, email }) => {
  const { handleSubmit, handleResend, handleOtpChange, error, isLoading, otp } =
    useStepTwoOtp({ goToStep, email });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 items-stretch">
        <OtpInput
          length={4}
          value={otp}
          onChange={handleOtpChange}
          name="otp"
          inputClassName={
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }
        />
        {error && (
          <div className="text-red-500 text-sm text-center mt-2 pl-1">
            {error}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={otp.length < 4 || isLoading}
        className="btn_violet w-full max-w-none h-12 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isLoading ? "Verifying..." : "Recover"}
      </button>

      <div className="flex items-center justify-center gap-1 -mt-2">
        <button
          type="button"
          onClick={handleResend}
          className="self-stretch text-center justify-start text-gray-800 text-base font-normal leading-snug cursor-pointer hover:text-main-700 transition_common"
        >
          Resend
        </button>
      </div>
    </form>
  );
};

export default StepTwoOtp;
