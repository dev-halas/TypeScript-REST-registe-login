import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';
import User from '../../schemas/UserSchema';
import { createToken } from '../../middlewares/authorize';

interface ILoginRequest extends Request {
    body: {
        userLogin: string;
        password: string;
    };
}

const findUserByEmailOrPhone = async (userLogin: string) => {
    return await User.findOne({
        $or: [{ email: userLogin }, { phone: userLogin }],
    });
};

export const LoginUser = asyncHandler(async (req: ILoginRequest, res: Response) => {
    const { userLogin, password } = req.body;

    const user = await findUserByEmailOrPhone(userLogin);

    if (!user) {
        res.status(401);
        throw new Error('Invalid user credential');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error('Incorrect password');
    }

    res.json({
        token: createToken({ id: user._id, user: user.email || user.phone }),
    });
});
