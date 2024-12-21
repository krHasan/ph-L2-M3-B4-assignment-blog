import { httpStatus } from "../../config/httpStatus";
import AppError from "../../errors/AppError";
import { Blog } from "../blog/blog.model";
import { User } from "../user/user.model";

const blockUserIntoDB = async (id: string) => {
    const user = await User.isUserExistsById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Requested user is not found");
    }
    const result = await User.findByIdAndUpdate(
        id,
        { isBlocked: true },
        { new: true },
    );

    return result;
};

const deleteABlogFromDB = async (id: string) => {
    const blog = await Blog.isBlogExists(id);
    if (!blog) {
        throw new AppError(httpStatus.NOT_FOUND, "Requested blog is not found");
    }
    const result = await Blog.findByIdAndDelete(id);
    return result;
};

export const AdminServices = {
    blockUserIntoDB,
    deleteABlogFromDB,
};
