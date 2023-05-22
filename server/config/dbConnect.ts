import mongoose from 'mongoose'
import { config } from './config'

export const connectDB = () => {
    mongoose
        .connect(config.mongo_db.url, { retryWrites: true, w: 'majority' })
        .then(() => console.log('Database connect succesfully...'))
        .catch((error) => console.error('ERROR: Cannot connect do database!', error))
}