import mongoose from "mongoose";
import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import {
    generateAdminId,
    generateFacultyId,
    generateStudentId,
} from "./user.utils";
import AppError from "../../errors/AppError";
import { AcademicDepartment } from "../academicDepartment/academicDepartment.model";
import { httpStatus } from "../../config/httpStatus";

const createStudentIntoDB = async (password: string, payload: TStudent) => {
    const userData: Partial<TUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = "Student";

    const admissionSemester = await AcademicSemester.findById(
        payload.admissionSemester,
    );

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        if (admissionSemester)
            userData.id = await generateStudentId(admissionSemester);

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newStudent = await Student.create([payload], { session });
        if (!newStudent) {
            throw new AppError(400, "Failed to create student");
        }

        await session.commitTransaction();
        await session.endSession();

        return newStudent;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, error.message);
    }
};

const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
    const userData: Partial<TUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = "Faculty";

    const academicDepartment = await AcademicDepartment.findById(
        payload.academicDepartment,
    );

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        if (!academicDepartment) {
            throw new AppError(400, "Academic Department doesn't exists");
        }

        userData.id = await generateFacultyId();

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, "Failed to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newFaculty = await Faculty.create([payload], { session });
        if (!newFaculty) {
            throw new AppError(400, "Failed to create faculty");
        }

        await session.commitTransaction();
        await session.endSession();

        return newFaculty;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, error.message);
    }
};

const createAdminIntoDB = async (password: string, payload: TAdmin) => {
    const userData: Partial<TUser> = {};

    userData.password = password || (config.default_password as string);
    userData.role = "Admin";

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        userData.id = await generateAdminId();

        const newUser = await User.create([userData], { session });

        if (!newUser.length) {
            throw new AppError(400, "Failed to create user");
        }
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;

        const newAdmin = await Admin.create([payload], { session });
        if (!newAdmin) {
            throw new AppError(400, "Failed to create admin");
        }

        await session.commitTransaction();
        await session.endSession();

        return newAdmin;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(400, error.message);
    }
};

export const UserServices = {
    createStudentIntoDB,
    createFacultyIntoDB,
    createAdminIntoDB,
};
