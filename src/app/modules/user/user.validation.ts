import { z } from "zod";
import { USER_ROLE, userRoleArray } from "./user.constant";

const userValidationSchema = z.object({
    body: z.object({
        name: z
            .string()
            .min(1)
            .max(100)
            .refine((value) => /^[A-Z]/.test(value), {
                message: "Name must start with a capital letter",
            }),
        email: z.string().email(),
        password: z
            .string({
                invalid_type_error: "Password must be string",
            })
            .max(20, { message: "Password can not be more than 20 characters" })
            .optional(),
        role: z
            .enum([...userRoleArray] as [string, ...string[]])
            .optional()
            .default(USER_ROLE.user),
    }),
});

export const UserValidation = {
    userValidationSchema,
};
