export type TBloodGroup =
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-";

export type TGender = "Male" | "Female" | "Other";

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};
