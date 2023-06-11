import express from 'express'
export const filmRentalRoutes = express.Router()

import { 
    GetAll,
    GetById,
    Add,
    Edit,
    Delete
} from '../controllers/index';

import { authorize } from '../middlewares/authorize';

filmRentalRoutes.get('/GetAll', authorize, GetAll)
filmRentalRoutes.get('/GetById/:id', authorize, GetById)
filmRentalRoutes.post('/Add', authorize, Add)
filmRentalRoutes.put('/Edit/:id', authorize, Edit)
filmRentalRoutes.delete('/Delete/:id', authorize, Delete)



