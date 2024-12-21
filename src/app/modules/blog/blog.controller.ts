import { BlogServices } from "./blog.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../config/httpStatus";

const createBlog = catchAsync(async (req, res) => {
    const blogData = req.body;
    blogData.author = req.user._id.toString();
    const result = await BlogServices.createBlogIntoDB(blogData);
    sendResponse(res, {
        success: true,
        message: "Blog created successfully",
        statusCode: httpStatus.CREATED,
        data: result,
    });
});

const getAllBlogs = catchAsync(async (req, res) => {
    const result = await BlogServices.getAllBlogsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blogs fetched successfully",
        data: result,
    });
});

const deleteBlogById = catchAsync(async (req, res) => {
    const blogId = req.params.id;
    await BlogServices.deleteBlogByIdFromDB(blogId, req?.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog deleted successfully",
    });
});

const updateBlog = catchAsync(async (req, res) => {
    const blogId = req.params.id;

    const result = await BlogServices.updateBlogIntoDB(
        blogId,
        req.body,
        req.user,
    );

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Blog updated successfully",
        data: result,
    });
});

export const BlogControllers = {
    createBlog,
    getAllBlogs,
    updateBlog,
    deleteBlogById,
};
