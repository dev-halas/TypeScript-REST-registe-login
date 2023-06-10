import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../../schemas/UserSchema';

interface I_UserRequest extends Request {
  body: {
    email: string;
    password: string;
    phone?: string;
  };
}

export const RegisterUser = asyncHandler(async (req: I_UserRequest, res: Response) => {
    const { email, password, phone } = req.body;

    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const userEmailExist = await User.findOne({ email })
    if (userEmailExist) {
        res.status(400)
        throw new Error('email already exist!')
    }

    const userPhoneExist = await User.findOne({ phone })
    if (userPhoneExist) {
        res.status(400)
        throw new Error('phone number already exist!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)


    await User.create({
        email,
        phone,
        password: hashPassword
    })

    res.status(200).json({
        message: "Register succesfully" 
    })
});
