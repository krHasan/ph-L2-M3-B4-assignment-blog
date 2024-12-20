import { httpStatus } from "../../config/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AdminServices } from "./admin.service";

const blockUser = catchAsync(async (req, res) => {
    await AdminServices.blockUserIntoDB(req.params.userId);
    sendResponse(res, {
        success: true,
        message: "User blocked successfully",
        statusCode: httpStatus.OK,
    });
});

const deleteABlog = catchAsync(async (req, res) => {
    await AdminServices.deleteABlogFromDB(req.params.id);
    sendResponse(res, {
        success: true,
        message: "Blog deleted successfully",
        statusCode: httpStatus.OK,
    });
});

export const AdminControllers = {
    blockUser,
    deleteABlog,
};
