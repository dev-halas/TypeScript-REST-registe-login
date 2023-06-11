import FilmRental from '../../schemas/FilmRentalSchema';
import asyncHandler from 'express-async-handler';
import { Request, Response } from 'express';



export const GetAll = asyncHandler(async(req: Request, res: Response) => {     
     const filmRentals = await FilmRental.find();
     res.status(200).json(filmRentals);
})

export const GetById = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params;
    const filmExists = await FilmRental.findById( id )
    if (!filmExists) {
        res.status(400)
        throw new Error('film not exist')
    }
    const filmRental = await FilmRental.findById(id);
     res.status(200).json(filmRental);
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
    res.status(200).json({
        message: "Added succesfuly" 
    })
})

export const Edit = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params;
    const filmExists = await FilmRental.findById( id )
    if (!filmExists) {
        res.status(400)
        throw new Error('film not exist')
    }
    const { firstName, lastName, filmName, rentDate, createdAt } = req.body;
    
    const updatedFilmRental = await FilmRental.findByIdAndUpdate(id, {firstName, lastName, filmName, rentDate, createdAt});
    res.status(200).json(updatedFilmRental);
})

export const Delete = asyncHandler(async(req: Request, res: Response) => {
    const { id } = req.params;
    const filmExists = await FilmRental.findById( id )
    console.log(filmExists);
    if (!filmExists) {
        res.status(400)
        throw new Error('film not exist')
    }

    await FilmRental.findByIdAndRemove( id );
    res.status(200).json({ message: 'Rental deleted' });
})



