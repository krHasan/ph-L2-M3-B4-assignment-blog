import config from "../../config";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import AppError from "../../errors/AppError";

const createUserIntoDB = async (payload: Partial<TUser>) => {
    payload.password = payload?.password || (config.default_password as string);
    try {
        const result = await User.create(payload);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        throw new AppError(400, error.message);
    }
};

export const UserServices = {
    createUserIntoDB,
};
