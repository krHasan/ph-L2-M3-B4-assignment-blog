import { z } from "zod";

const userNameValidationSchema = z.object({
    firstName: z
        .string()
        .min(1)
        .max(20)
        .refine((value) => /^[A-Z]/.test(value), {
            message: "First Name must start with a capital letter",
        }),
    middleName: z.string().optional(),
    lastName: z.string(),
});

const updateUserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20).optional(),
    middleName: z.string().optional(),
    lastName: z.string().optional(),
});

export const CommonValidationSchemas = {
    userNameValidationSchema,
    updateUserNameValidationSchema,
};
