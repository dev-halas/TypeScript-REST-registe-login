import express from 'express'
export const userRoutes = express.Router()

import { 
    RegisterUser,
    LoginUser,
    userPanel,
    forgotPassword,
    resetPassword
} from '../controllers/index';

import { authorize } from '../middlewares/authorize';

userRoutes.post('/register', RegisterUser)
userRoutes.post('/login', LoginUser)
userRoutes.post('/forgot-password', forgotPassword)
userRoutes.put('/reset-password/:userId/:token', resetPassword)
userRoutes.get('/panel', authorize, userPanel)


