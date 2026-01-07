import React from "react";
import { Link } from "react-router-dom";
import { userRouteLinks } from "@/services";
import { useStepOneEmail } from "@/hooks/useForgetPassword";
import Input from "../shared/Input";

const StepOneEmail = ({ goToStep }) => {
  const { handleSubmit, handleInputChange, error, isLoading } = useStepOneEmail(
    {
      goToStep,
    }
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex flex-col gap-1 items-stretch">
        <Input
          label="Email"
          labelClass="self-stretch justify-start text-gray-700 text-sm font-normal leading-normal"
          type="email"
          placeholder="Enter your email"
          id="email"
          className={
            error
              ? "border-red-500 focus:ring-red-500 focus:border-red-500"
              : ""
          }
          onChange={handleInputChange}
        />
        {error && (
          <div className="text-red-500 text-sm text-left pl-1">{error}</div>
        )}
      </div>
      <button
        type="submit"
        className="btn_violet w-full max-w-none h-12"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Recover"}
      </button>

      <div className="flex items-center justify-center gap-1 -mt-2">
        <Link
          to={userRouteLinks.home.path}
          className="self-stretch text-center justify-start text-gray-800 text-base font-normal leading-snug cursor-pointer hover:text-main-600 transition_common"
        >
          Try Login
        </Link>
      </div>
    </form>
  );
};

export default StepOneEmail;
