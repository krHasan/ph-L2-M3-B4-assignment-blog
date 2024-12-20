import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Students list",
        data: result,
    });
});

const getStudentById = catchAsync(async (req, res) => {
    const studentId = req.params.id;
    const result = await StudentServices.getStudentByIdFromDB(studentId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Student Information",
        data: result,
    });
});

const deleteStudentById = catchAsync(async (req, res) => {
    const studentId = req.params.id;
    const result = await StudentServices.deleteStudentByIdFromDB(studentId);

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Student Deleted",
        data: result,
    });
});

const updateStudent = catchAsync(async (req, res) => {
    const studentId = req.params.id;
    const result = await StudentServices.updateStudentIntoDB(
        studentId,
        req.body.student,
    );

    sendResponse(res, {
        success: true,
        statusCode: 200,
        message: "Student is Updated Successfully",
        data: result,
    });
});

export const StudentControllers = {
    getAllStudents,
    getStudentById,
    deleteStudentById,
    updateStudent,
};
