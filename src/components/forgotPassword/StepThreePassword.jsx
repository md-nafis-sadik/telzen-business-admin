import React from "react";
import { useStepThreePassword } from "@/hooks/useForgetPassword";
import Password from "../shared/Password";

const StepThreePassword = ({ goToStep, email }) => {
  const {
    handleSubmit,
    handlePasswordChange,
    error,
    passwordError,
    confirmError,
    isLoading,
  } = useStepThreePassword({ goToStep, email });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 items-stretch">
        <Password
          label="Password"
          labelClass="self-stretch justify-start text-gray-700 text-base font-normal leading-normal text-left"
          id="password"
          placeholder="Enter your password"
          className={
            passwordError
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }
          onChange={handlePasswordChange}
        />
        {passwordError && (
          <div className="text-red-500 text-sm text-left pl-1">
            {passwordError}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 items-stretch">
        <Password
          label="Confirm Password"
          labelClass="self-stretch justify-start text-gray-700 text-base font-normal leading-normal text-left"
          id="confirmPassword"
          placeholder="Enter your password"
          className={
            confirmError
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }
          onChange={handlePasswordChange}
        />
        {confirmError && (
          <div className="text-red-500 text-sm text-left pl-1">
            {confirmError}
          </div>
        )}
        {error && !passwordError && !confirmError && (
          <div className="text-red-500 text-sm text-left pl-1">{error}</div>
        )}
      </div>

      <button
        type="submit"
        className="btn_violet w-full max-w-none h-12"
        disabled={isLoading}
      >
        {isLoading ? "Resetting..." : "Confirm"}
      </button>
    </form>
  );
};

export default StepThreePassword;
