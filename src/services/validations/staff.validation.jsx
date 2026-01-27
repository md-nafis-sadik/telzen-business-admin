import z from "zod";

export const addStaffValidation = z.object({
  name: z
    .string()
    .min(1, { message: "Staff name is required" })
    .min(3, { message: "Staff name must be at least 3 characters" })
    .trim(),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please provide a valid email address" }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(10, { message: "Phone number must be at least 10 digits" }),
  role: z
    .string()
    .min(1, { message: "Role is required" })
    .refine((val) => ["manager", "super-admin", "employee"].includes(val), {
      message: "Please select a valid role",
    }),
});
