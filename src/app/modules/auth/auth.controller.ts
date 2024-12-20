import { httpStatus } from "../../config/httpStatus";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);
    const { accessToken } = result;

    sendResponse(res, {
        success: true,
        message: "Login successful",
        statusCode: httpStatus.OK,
        data: {
            token: accessToken,
        },
    });
});

export const AuthControllers = {
    loginUser,
};
