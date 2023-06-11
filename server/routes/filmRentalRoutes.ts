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
filmRentalRoutes.post('/Add', Add)
filmRentalRoutes.put('/Edit/:id', Edit)
filmRentalRoutes.delete('/Delete/:id', Delete)



