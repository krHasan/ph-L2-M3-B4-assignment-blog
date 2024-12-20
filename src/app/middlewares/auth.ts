import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import { httpStatus } from "../config/httpStatus";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUserRole } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

const auth = (...requiredRoles: TUserRole[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized",
                );
            }

            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;

            const { role, email } = decoded;

            const user = await User.isUserExistsByEmail(email);
            if (!user || user?.isBlocked) {
                throw new AppError(httpStatus.NOT_FOUND, "User not found");
            }

            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized",
                );
            }

            req.user = decoded as JwtPayload;
            return next();
        } catch (err) {
            next(err);
        }
    };
};

export default auth;
