import express from "express";
import { StudentControllers } from "./student.controller";
import validateRequest from "../../middlewares/validateRequest";
import { studentValidations } from "./student.validation";

const router = express.Router();

//will call controller
router.get("/", StudentControllers.getAllStudents);
router.get("/:id", StudentControllers.getStudentById);
router.delete("/:id", StudentControllers.deleteStudentById);
router.patch(
    "/:id",
    validateRequest(studentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudent,
);

export const StudentRoutes = router;
