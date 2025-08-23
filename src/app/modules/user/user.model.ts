import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'agent', 'admin'],
        required: true
    },
    picture: {
        type: String,
        default: "https://res.cloudinary.com/deicntkum/image/upload/v1755900488/man-user-circle-icon_wrrmd6.png"
    },
    approvalStatus: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'approved'
    },
    isBlocked: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true,
    versionKey: false
});

const User = model<IUser>("User", userSchema);

export default User;
