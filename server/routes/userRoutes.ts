import express from 'express'
export const userRoutes = express.Router()

import { 
    RegisterUser,
    LoginUser,
    userPanel
} from '../controllers/index';

import { authorize } from '../middlewares/authorize';

userRoutes.post('/register', RegisterUser)
userRoutes.post('/login', LoginUser)
userRoutes.get('/panel', authorize, userPanel)


