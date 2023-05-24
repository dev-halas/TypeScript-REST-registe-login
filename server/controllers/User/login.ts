import User from '../../schemas/UserSchema';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { Request, Response } from 'express';

import { createToken } from '../../middlewares/authorize';

export const LoginUser = asyncHandler(async(req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email } || { username })

    if (!user) {
        res.status(401)
        throw new Error('Invalid email or password')
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            token: createToken({id: user._id, username: user.username}),
        })
    } else {
        res.status(400)
        throw new Error('Incorrect email or password')
    }
})
