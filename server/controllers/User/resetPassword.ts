import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../../schemas/UserSchema";

interface IResetPasswordRequest extends Request {
    body: {
        newPassword: string;
    };
    params: {
        userId: string;
        token: string;
    };
}

export const resetPassword = asyncHandler(async (req: IResetPasswordRequest, res: Response) => {
    const { userId, token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }

    if (!user.resetPasswordToken || !user.resetPasswordExpires || user.resetPasswordToken !== token || Date.now() > user.resetPasswordExpires.getTime()) {
        res.status(400);
        throw new Error('Invalid or expired password reset token');
    }

    if(!newPassword) {
        res.status(400);
        throw new Error('Password required');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({
        message: 'Password has been reset',
    });
});