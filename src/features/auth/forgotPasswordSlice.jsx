import { createSlice } from "@reduxjs/toolkit";
import { ForgotPasswordStepEnum } from "@/services";

const initialState = {
  // Main forgot password state
  step: ForgotPasswordStepEnum.EMAIL,
  email: "",
  
  // Step One (Email) state
  emailError: null,
  
  // Step Two (OTP) state
  otp: "",
  otpError: null,
  
  // Step Three (Password) state
  passwordError: null,
  confirmError: null,
  generalError: null,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    // Main actions
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    resetForgotPasswordState: () => initialState,
    
    // Step One (Email) actions
    setEmailError: (state, action) => {
      state.emailError = action.payload;
    },
    clearEmailError: (state) => {
      state.emailError = null;
    },
    
    // Step Two (OTP) actions
    setOtp: (state, action) => {
      state.otp = action.payload;
    },
    setOtpError: (state, action) => {
      state.otpError = action.payload;
    },
    clearOtpError: (state) => {
      state.otpError = null;
    },
    clearOtp: (state) => {
      state.otp = "";
    },
    
    // Step Three (Password) actions
    setPasswordError: (state, action) => {
      state.passwordError = action.payload;
    },
    setConfirmError: (state, action) => {
      state.confirmError = action.payload;
    },
    setGeneralError: (state, action) => {
      state.generalError = action.payload;
    },
    clearPasswordErrors: (state) => {
      state.passwordError = null;
      state.confirmError = null;
      state.generalError = null;
    },
    
    // Combined actions for step transitions
    goToNextStep: (state, action) => {
      const { nextStep, nextEmail } = action.payload || {};
      
      // Normalize step
      let safeStep = typeof nextStep === "number" ? nextStep : Number(nextStep);
      if (safeStep < ForgotPasswordStepEnum.EMAIL) safeStep = ForgotPasswordStepEnum.EMAIL;
      if (safeStep > ForgotPasswordStepEnum.PASSWORD) safeStep = ForgotPasswordStepEnum.PASSWORD;
      
      state.step = safeStep;
      if (nextEmail) {
        state.email = nextEmail;
      }
      
      // Clear errors when moving to next step
      state.emailError = null;
      state.otpError = null;
      state.passwordError = null;
      state.confirmError = null;
      state.generalError = null;
    },
  },
});

export const {
  setStep,
  setEmail,
  resetForgotPasswordState,
  setEmailError,
  clearEmailError,
  setOtp,
  setOtpError,
  clearOtpError,
  clearOtp,
  setPasswordError,
  setConfirmError,
  setGeneralError,
  clearPasswordErrors,
  goToNextStep,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
