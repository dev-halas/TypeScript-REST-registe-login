import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../../schemas/UserSchema";
import crypto from 'crypto';
import sendEmail from "../../utils/sendEmail";

const generatePasswordResetLink = async (userId: string): Promise<string> => {
  const token = crypto.randomBytes(20).toString('hex');
  const url = `http://localhost:5000/reset-password/${userId}/${token}`;

  try {
      await User.findByIdAndUpdate(userId, { resetPasswordToken: token, resetPasswordExpires: Date.now() + 3600000 });
  } catch (error) {
      console.error(`Error occurred while updating user with id: ${userId}. Error: ${error}`);
      throw error;
  }
  
  return url;
};

interface IForgotPasswordRequest extends Request {
  body: {
    email: string;
  };
}

export const forgotPassword = asyncHandler(async (req: IForgotPasswordRequest, res: Response) => {
  const { email } = req.body;

  const user = await User.findOne({ email })

  if (!user) {
      res.status(404);
      throw new Error('User not found');
  }

  const resetLink = await generatePasswordResetLink(user._id);
  const subject = 'Password Reset Requested';
  const text = `To reset your password, click the following link: ${resetLink}`;

  await sendEmail(user.email, subject, text);

  res.status(200).json({
      message: 'A reset code has been sent to your email',
  });
});