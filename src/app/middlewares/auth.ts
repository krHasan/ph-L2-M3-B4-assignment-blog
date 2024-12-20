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
            const tokenWithBearer = req.headers.authorization;
            if (!tokenWithBearer) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    "You are not authorized",
                );
            }

            const token = tokenWithBearer.split(" ")[1];

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

            req.user = user as JwtPayload;
            return next();
        } catch (err) {
            next(err);
        }
    };
};

export default auth;
