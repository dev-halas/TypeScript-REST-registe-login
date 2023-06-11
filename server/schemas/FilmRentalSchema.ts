import mongoose, { Schema, Document } from 'mongoose';

interface IFilmRental extends Document {
    firstName: string;
    lastName: string;
    filmName: string;
    rentDate: Date;
    createdAt: Date;
}

const filmRentalSchema: Schema = new Schema({
    firstName: {
        type: String,
        required: [true, 'First name required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name required'],
    },
    filmName: {
        type: String,
        required: [true, 'Film name required'],
    },
    rentDate: {
        type: Date,
        default: new Date()
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export default mongoose.model<IFilmRental>('FilmRental', filmRentalSchema);
