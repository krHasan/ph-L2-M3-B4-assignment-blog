import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { httpStatus } from "../../config/httpStatus";

const createUser = catchAsync(async (req, res) => {
    const result = await UserServices.createUserIntoDB(req.body);
    sendResponse(res, {
        success: true,
        message: "User registered successfully",
        statusCode: httpStatus.CREATED,
        data: result,
    });
});

export const UserControllers = {
    createUser,
};
