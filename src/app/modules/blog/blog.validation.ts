import { z } from "zod";

const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        content: z.string(),
    }),
});

const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        content: z.string().optional(),
    }),
});

export const BlogValidations = {
    createBlogValidationSchema,
    updateBlogValidationSchema,
};
