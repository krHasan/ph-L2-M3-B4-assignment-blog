import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";
import { httpStatus } from "../../config/httpStatus";
import { TBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { blogSearchableFields } from "./blog.constant";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

const createBlogIntoDB = async (payload: TBlog) => {
    const result = (await Blog.create(payload)).populate("author");
    return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
    const blogQuery = new QueryBuilder(Blog.find().populate("author"), query)
        .search(blogSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await blogQuery.modelQuery;

    return result;
};

const deleteBlogByIdFromDB = async (id: string, sessionUser: JwtPayload) => {
    try {
        const blog = await Blog.isBlogExists(id);
        if (!blog) {
            throw new AppError(
                httpStatus.NOT_FOUND,
                "Requested blog is not found",
            );
        }

        //is this blog belongs to the logged in user
        const userOfBlog = await User.findById(blog.author);
        if (userOfBlog?.email !== sessionUser?.email) {
            throw new AppError(
                httpStatus.UNAUTHORIZED,
                "You are not authorized to delete this blog",
            );
        }

        const result = await Blog.findByIdAndDelete(id);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new AppError(httpStatus.NOT_IMPLEMENTED, error.message);
    }
};

const updateBlogIntoDB = async (
    id: string,
    payload: Partial<TBlog>,
    sessionUser: JwtPayload,
) => {
    const blog = await Blog.isBlogExists(id);
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Requested blog is not found");
    }

    //is this blog belongs to the logged in user
    const userOfBlog = await User.findById(blog.author);
    if (userOfBlog?.email !== sessionUser?.email) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            "You are not authorized to update this blog",
        );
    }

    const result = await Blog.findByIdAndUpdate(id, payload, {
        new: true,
    }).populate("author");
    return result;
};

export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    deleteBlogByIdFromDB,
    updateBlogIntoDB,
};
