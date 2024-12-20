import { Schema } from "mongoose";
import { TUserName } from "./common.interface";

export const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true,
        maxlength: [20, "First Name can not be more than 20 characters"],
        validate: {
            validator: function (value: string) {
                const firstNameStr =
                    value.charAt(0).toUpperCase() + value.slice(1);
                return firstNameStr === value;
            },
            message: "{VALUE} is not in capitalize format",
        },
    },
    middleName: { type: String },
    lastName: { type: String, required: [true, "Last Name is required"] },
});
