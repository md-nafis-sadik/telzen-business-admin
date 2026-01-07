import { useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ForgotPasswordStepEnum } from "@/services";
import {
  useSendForgotPasswordEmailMutation,
  useVerifyPasswordResetOtpMutation,
  useResetPasswordMutation,
} from "@/features/auth/forgotPassword.api";
import {
  setStep,
  setEmail,
  goToNextStep,
  resetForgotPasswordState,
  setEmailError,
  clearEmailError,
  setOtp,
  setOtpError,
  clearOtpError,
  setPasswordError,
  setConfirmError,
  setGeneralError,
  clearPasswordErrors,
} from "@/features/auth/forgotPasswordSlice";
import {
  ForgetPasswordEmailValidation,
  validateZodSchema,
  ForgetPasswordOtpValidation,
  ForgetPasswordChangeValidation,
} from "@/services";
import { infoNotify, errorNotify, successNotify } from "@/services";

export function useForgetPassword() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { step, email } = useSelector((state) => state.forgotPassword);
  
  const decodeEmail = (raw) => {
    try {
      return decodeURIComponent(decodeURIComponent(raw));
    } catch {
      try {
        return decodeURIComponent(raw);
      } catch {
        return raw;
      }
    }
  };
  
  const initialStep =
    Number(searchParams.get("step")) || ForgotPasswordStepEnum.EMAIL;
  const initialEmail = decodeEmail(searchParams.get("email") || "");

  const goToStep = useCallback(
    (nextStep, nextEmail) => {
      const normalized =
        typeof nextStep === "number" ? nextStep : Number(nextStep);
      let safeStep = normalized;
      if (safeStep < ForgotPasswordStepEnum.EMAIL)
        safeStep = ForgotPasswordStepEnum.EMAIL;
      if (safeStep > ForgotPasswordStepEnum.PASSWORD)
        safeStep = ForgotPasswordStepEnum.PASSWORD;
      
      const params = {};
      if ((nextEmail || email) && safeStep !== ForgotPasswordStepEnum.EMAIL) {
        params.email = encodeURIComponent(nextEmail || email);
      }
      params.step = safeStep;
      setSearchParams(params);
      
      dispatch(goToNextStep({ nextStep: safeStep, nextEmail }));
    },
    [email, setSearchParams, dispatch]
  );

  useEffect(() => {
    if (initialStep === ForgotPasswordStepEnum.EMAIL && !initialEmail) {
      dispatch(resetForgotPasswordState());
    } else {
      dispatch(setStep(initialStep));
      dispatch(setEmail(initialEmail));
    }
  }, [initialStep, initialEmail]); 

  useEffect(() => {
    return () => {
      dispatch(resetForgotPasswordState());
    };
  }, []); 

  const renderStepComponent = useCallback(
    (components) => {
      switch (step) {
        case ForgotPasswordStepEnum.EMAIL:
          return components.email();
        case ForgotPasswordStepEnum.OTP:
          return components.otp();
        case ForgotPasswordStepEnum.PASSWORD:
          return components.password();
        default:
          return components.email();
      }
    },
    [step]
  );

  const getStepDescription = useCallback(() => {
    switch (step) {
      case ForgotPasswordStepEnum.EMAIL:
        return "Recover password in simple steps";
      case ForgotPasswordStepEnum.OTP:
        return "Enter OTP we have sent to the given email";
      case ForgotPasswordStepEnum.PASSWORD:
        return "Recover password in simple steps";
      default:
        return "Recover password in simple steps";
    }
  }, [step]);

  return {
    step,
    email,
    goToStep,
    searchParams,
    setSearchParams,
    navigate,
    renderStepComponent,
    getStepDescription,
    resetForgotPasswordState: () => dispatch(resetForgotPasswordState()),
  };
}

export function useStepOneEmail({ goToStep }) {
  const dispatch = useDispatch();
  const { emailError } = useSelector((state) => state.forgotPassword);
  const [sendForgotPasswordEmail, { isLoading }] =
    useSendForgotPasswordEmailMutation();
    
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearEmailError());
    const data = Object.fromEntries(new FormData(event.target));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      dispatch(setEmailError("The email field must be a valid email address."));
      return;
    }
    const validatedData = validateZodSchema({
      schema: ForgetPasswordEmailValidation,
      data,
    });
    if (!validatedData) return;
    try {
      await sendForgotPasswordEmail({ email: data.email }).unwrap();
      dispatch(setEmail(data.email));
      infoNotify("OTP sent successfully");
      goToStep(ForgotPasswordStepEnum.OTP, data.email);
    } catch (err) {
      const msg = err?.data?.message || "Failed to send OTP";
      dispatch(setEmailError(msg));
      errorNotify(msg);
    }
  };
  const handleInputChange = () => dispatch(clearEmailError());
  return { handleSubmit, handleInputChange, error: emailError, isLoading };
}

export function useStepTwoOtp({ goToStep, email }) {
  const dispatch = useDispatch();
  const { otp, otpError } = useSelector((state) => state.forgotPassword);
  const [verifyOtp, { isLoading }] = useVerifyPasswordResetOtpMutation();
  const [sendForgotPasswordEmail] = useSendForgotPasswordEmailMutation();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearOtpError());
    const data = { otp: Number(otp), email };
    const validatedData = validateZodSchema({
      schema: ForgetPasswordOtpValidation,
      data,
    });
    if (!validatedData) return;
    try {
      await verifyOtp(data).unwrap();
      goToStep(ForgotPasswordStepEnum.PASSWORD);
    } catch (err) {
      const msg = err?.data?.message || "OTP verification failed";
      dispatch(setOtpError(msg));
      errorNotify(msg);
    }
  };
  const handleResend = async () => {
    try {
      await sendForgotPasswordEmail({ email }).unwrap();
      infoNotify("OTP resent successfully");
    } catch (err) {
      dispatch(setOtpError("Failed to resend OTP"));
    }
  };
  const handleOtpChange = (val) => {
    dispatch(setOtp(val));
    dispatch(clearOtpError());
  };
  return { handleSubmit, handleResend, handleOtpChange, error: otpError, isLoading, otp };
}

export function useStepThreePassword({ goToStep, email }) {
  const dispatch = useDispatch();
  const { passwordError, confirmError, generalError } = useSelector((state) => state.forgotPassword);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();
  
  const handlePasswordChange = () => {
    dispatch(clearPasswordErrors());
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(clearPasswordErrors());
    const data = Object.fromEntries(new FormData(event.target));
    let hasFieldError = false;
    
    if (!data.password || data.password.length < 6) {
      dispatch(setPasswordError("Password must be at least 6 characters"));
      hasFieldError = true;
    }
    if (data.password !== data.confirmPassword) {
      dispatch(setConfirmError("Passwords do not match"));
      hasFieldError = true;
    }
    if (hasFieldError) return;
    
    const validatedData = validateZodSchema({
      schema: ForgetPasswordChangeValidation,
      data,
    });
    if (!validatedData) return;
    
    try {
      await resetPassword({ email, password: data.password }).unwrap();
      successNotify("Password reset successfully!");
      dispatch(resetForgotPasswordState());
      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (err) {
      const msg = err?.data?.message || "Password reset failed";
      dispatch(setGeneralError(msg));
      errorNotify(msg);
    }
  };
  
  return {
    handleSubmit,
    handlePasswordChange,
    error: generalError,
    passwordError,
    confirmError,
    isLoading,
  };
}
