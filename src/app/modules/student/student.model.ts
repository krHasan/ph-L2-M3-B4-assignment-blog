import { Schema, model } from "mongoose";
import {
    TGuardian,
    TLocalGuardian,
    TStudent,
    StudentModel,
} from "./student.interface";
import { userNameSchema } from "../common/common.schema";
import { bloodGroupTypes, genderTypes } from "../common/common.constant";

const guardianSchema = new Schema<TGuardian>({
    fatherName: { type: String, required: true },
    fatherOccupation: { type: String, required: true },
    fatherContactNo: { type: String, required: true },
    motherName: { type: String, required: true },
    motherOccupation: { type: String, required: true },
    motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
    name: { type: String, required: true },
    occupation: { type: String, required: true },
    contactNo: { type: String, required: true },
    address: { type: String, required: true },
});

// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({//for instance method
const studentSchema = new Schema<TStudent, StudentModel>(
    {
        id: { type: String, required: true, unique: true },
        user: {
            type: Schema.Types.ObjectId,
            required: [true, "User Id is required"],
            unique: true,
            ref: "User",
        },
        name: {
            type: userNameSchema,
            required: true,
        },
        gender: {
            type: String,
            enum: {
                values: genderTypes,
                message: "Gender is Male, Female or Other",
            },
            required: true,
        },
        dateOfBirth: { type: Date },
        email: { type: String, required: true, unique: true },
        contactNo: { type: String, required: true },
        emergencyContactNo: { type: String, required: true },
        bloodGroup: {
            type: String,
            enum: bloodGroupTypes,
        },
        presentAddress: { type: String, required: true },
        permanentAddress: { type: String, required: true },
        guardian: {
            type: guardianSchema,
            required: true,
        },
        localGuardian: {
            type: localGuardianSchema,
            required: true,
        },
        profileImg: { type: String },
        admissionSemester: {
            type: Schema.Types.ObjectId,
            ref: "AcademicSemester",
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        academicDepartment: {
            type: Schema.Types.ObjectId,
            ref: "AcademicDepartment",
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

//virtual
studentSchema.virtual("fullName").get(function () {
    if (this.name?.middleName) {
        return (
            this?.name?.firstName +
            " " +
            this?.name?.middleName +
            " " +
            this?.name?.lastName
        );
    } else {
        return this?.name?.firstName + " " + this?.name?.lastName;
    }
});

//query middleware
studentSchema.pre("find", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

studentSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({
        $match: { isDeleted: { $ne: true } },
    });
    next();
});

studentSchema.pre("findOne", function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
    const existingUser = await Student.findOne({ id });
    return existingUser;
};

export const Student = model<TStudent, StudentModel>("Student", studentSchema);
