import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    email: string;
    phone?: number;
    password: string;
    verifyEmail: boolean;
    verifyEmailToken?: string;
    verifyEmailTokenExpire?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: [true, 'Please add username'],
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please add Your email address...'],
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email... Please check email'],
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: [true, 'Please add a password...'],
        minlength: 8,
    },
    verifyEmail: {
        type: Boolean,
        required: true,
        default: false,
    },
    verifyEmailToken: String,
    verifyEmailTokenExpire: Date,
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
