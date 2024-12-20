import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: "Student",
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({ createdAt: -1 })
        .lean();

    return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    const lastSemesterYear = lastStudentId?.substring(0, 4);
    const lastSemesterCode = lastStudentId?.substring(4, 6);
    const currentSemesterCode = payload.code;
    const currentSemesterYear = payload.year;
    if (
        lastStudentId &&
        lastSemesterCode === currentSemesterCode &&
        lastSemesterYear === currentSemesterYear
    ) {
        currentId = lastStudentId.substring(6);
    }
    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId;
};

export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = (
        await User.findOne(
            {
                role: "Faculty",
            },
            {
                id: 1,
                _id: 0,
            },
        )
            .sort({ createdAt: -1 })
            .lean()
    )?.id;

    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `F-${incrementId}`;
    return incrementId;
};

export const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = (
        await User.findOne(
            {
                role: "Admin",
            },
            {
                id: 1,
                _id: 0,
            },
        )
            .sort({ createdAt: -1 })
            .lean()
    )?.id;

    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, "0");
    incrementId = `A-${incrementId}`;
    return incrementId;
};
