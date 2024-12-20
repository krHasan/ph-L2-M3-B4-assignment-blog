import express from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { BlogValidations } from "./blog.validation";
import { BlogControllers } from "./blog.controller";

const router = express.Router();

router.post(
    "/",
    auth(USER_ROLE.user),
    validateRequest(BlogValidations.createBlogValidationSchema),
    BlogControllers.createBlog,
);
router.patch(
    "/:id",
    auth(USER_ROLE.user),
    validateRequest(BlogValidations.updateBlogValidationSchema),
    BlogControllers.updateBlog,
);
router.delete("/:id", auth(USER_ROLE.user), BlogControllers.deleteBlogById);
router.get("/", BlogControllers.getAllBlogs);

export const BlogRoutes = router;
