import FilmRental from '../../schemas/FilmRentalSchema';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';



export const GetAll = asyncHandler(async(req: Request, res: Response) => {     
     const filmRentals = await FilmRental.find();
     res.json(filmRentals);
})

export const GetById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params;
    const filmRental = await FilmRental.findById(id);
     res.json(filmRental);
})

export const Add = asyncHandler(async(req: Request, res: Response) => {
    const { firstName, lastName, filmName, rentDate, createdAt } = req.body;
    
    await FilmRental.create({
        firstName,
        lastName,
        filmName,
        rentDate,
        createdAt
    });
})

export const Edit = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params;
    const { firstName, lastName, filmName, rentDate, createdAt } = req.body;
    
    const updatedFilmRental = await FilmRental.findByIdAndUpdate(id, {firstName, lastName, filmName, rentDate, createdAt});
    res.json(updatedFilmRental);
})

export const Delete = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params;
    const filmRental = await FilmRental.findByIdAndRemove( id );
    res.json({ message: 'Rental deleted' });
})



