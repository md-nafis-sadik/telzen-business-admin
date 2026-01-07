import z from "zod";

export const LoginValidation = z.object({
  email: z.email({ error: "Provide a valid email." }),
  password: z
    .string()
    .nonempty({ error: "Password is required." })
    .min(2, { error: "Password too short." }),
});

export const ForgetPasswordEmailValidation = z.object({
  email: z.email({ error: "Provide a valid email." }),
});

export const ForgetPasswordOtpValidation = z.object({
  otp: z
    .number()
    .int()
    .gte(1000, { error: "OTP must be 4 digits." })
    .lte(9999, { error: "OTP must be 4 digits." }),
});

export const ForgetPasswordChangeValidation = z
  .object({
    password: z
      .string()
      .nonempty({ error: "Password is required." })
      .min(6, { error: "Password must be at least 6 characters long." }),
    confirmPassword: z
      .string()
      .nonempty({ error: "Confirm Password is required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"], 
    message: "Passwords do not match.",
  });

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .trim(),
    email: z.string().email("Email is invalid").min(1, "Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
