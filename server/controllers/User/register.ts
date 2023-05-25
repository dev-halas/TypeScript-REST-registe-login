import User from '../../schemas/UserSchema';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

export const RegisterUser = asyncHandler(async(req: Request, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400)
        throw new Error('Please provide all fields')
    }

    const userNameExist = await User.findOne({ username })
    if (userNameExist) {
        res.status(400)
        throw new Error('username already taken!')
    }

    const userEmailExist = await User.findOne({ email })
    if (userEmailExist) {
        res.status(400)
        throw new Error('email already exist!')
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt) 


    await User.create({
        username,
        email,
        password: hashPassword
    })
})