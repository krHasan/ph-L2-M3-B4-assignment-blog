import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import config from "../../config";
import { createToken } from "./auth.utils";
import { httpStatus } from "../../config/httpStatus";

const loginUser = async (payload: TLoginUser) => {
    const user = await User.isUserExistsByEmail(payload?.email);
    if (!user || user?.isBlocked) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    const isPasswordMatched = await User.isPasswordMatched(
        payload?.password,
        user.password,
    );

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.FORBIDDEN, "Password didn't not matched");
    }

    const jwtPayload = {
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
    );

    return {
        accessToken,
    };
};

export const AuthServices = {
    loginUser,
};
