import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    phone?: string;
    password: string;
    resetPasswordToken?: string,
    resetPasswordExpires?: Date,
    verifyEmail: boolean;
    verifyEmailToken?: string;
    verifyEmailTokenExpire?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    email: {
        type: String,
        required: [true, 'Please add Your email address...'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email... Please check email'],
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Please add a password...'],
        minlength: 8,
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: Date,
    verifyEmail: {
        type: Boolean,
        required: true,
        default: false,
    },
    verifyEmailToken: String,
    verifyEmailTokenExpire: Date,
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
