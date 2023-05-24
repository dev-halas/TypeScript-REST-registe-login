import User from '../../schemas/UserSchema';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';

export const userPanel = asyncHandler(async(req: Request, res: Response) => {
    res.json({ mess: 'This is a user panel root(protected)' })
})
