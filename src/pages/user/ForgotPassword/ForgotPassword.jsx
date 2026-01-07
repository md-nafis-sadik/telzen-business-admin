import { Link } from "react-router-dom";
import React, { Suspense, useMemo } from "react";
import StepOneEmail from "@/components/forgotPassword/StepOneEmail";
import StepTwoOtp from "@/components/forgotPassword/StepTwoOtp";
import StepThreePassword from "@/components/forgotPassword/StepThreePassword";
import { ForgotPasswordStepEnum, images, userRouteLinks } from "@/services";
import { useForgetPassword } from "@/hooks/useForgetPassword";

const ForgotPassword = () => {
  const { step, email, goToStep } = useForgetPassword();

  const renderStep = useMemo(() => {
    switch (step) {
      case ForgotPasswordStepEnum.EMAIL:
        return <StepOneEmail goToStep={goToStep} />;
      case ForgotPasswordStepEnum.OTP:
        return <StepTwoOtp goToStep={goToStep} email={email} />;
      case ForgotPasswordStepEnum.PASSWORD:
        return <StepThreePassword goToStep={goToStep} email={email} />;
      default:
        return <StepOneEmail goToStep={goToStep} />;
    }
  }, [step, email, goToStep]);

  const renderDescription = useMemo(() => {
    switch (step) {
      case ForgotPasswordStepEnum.EMAIL:
        return <>Recover password in simple steps</>;
      case ForgotPasswordStepEnum.OTP:
        return <>Enter OTP we have sent to the given email</>;
      case ForgotPasswordStepEnum.PASSWORD:
        return <>Recover password in simple steps</>;
      default:
        return <>Recover password in simple steps</>;
    }
  }, [step]);

  return (
    <section className="h-screen overflow-hidden bg-white">
      <div className="h-full flex items-center">
        <div className="h-full px-4 py-6 sm:p-6 w-full flex items-center justify-center flex-wrap overflow-auto text-center relative no-scrollbar">
          <div className="w-full max-w-[476px] mx-auto flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <Link
                to={userRouteLinks.home.path}
                className="flex flex-col items-center gap-2"
              >
                <img
                  src={images.LoginLogo}
                  alt="logo"
                  className="w-[150px]"
                />
              </Link>
              <div className="flex flex-col gap-2">
                <h4 className="self-stretch text-center justify-start text-black-300 text-3xl font-bold leading-9">
                  Forget Password
                </h4>
                <p className="self-stretch text-center justify-start text-gray-700 text-lg font-normal leading-snug">
                  {renderDescription}
                </p>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="py-10">
                  <span className="text-gray-600">Loading...</span>
                </div>
              }
            >
              {renderStep}
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
