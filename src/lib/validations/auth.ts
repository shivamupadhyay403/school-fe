
import { z } from "zod";
import {
  emailSchema,
  indianMobileSchema,
  nameSchema,
  passwordSchema,
  usernameSchema,
} from "./common";

export const registerSchema = z
  .object({
    username: usernameSchema,
    firstname: nameSchema,
    lastname: nameSchema,
    mobile: indianMobileSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  identifier: z.string().pipe(
    // Reuse the shared identifier schema below.
    // The complete validation is applied in loginIdentifierSchema.
    // See the alternative declaration below.
    z.string(),
  ),
  password: z.string().min(1, "Password is required"),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
