import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthValidations } from "./auth.validation";
import { AuthControllers } from "./auth.controller";
import { UserValidation } from "../user/user.validation";
import { UserControllers } from "../user/user.controller";

const router = express.Router();

router.post(
    "/login",
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser,
);

router.post(
    "/register",
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.createUser,
);

export const AuthRoutes = router;
