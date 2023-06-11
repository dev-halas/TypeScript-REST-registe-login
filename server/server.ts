import express from 'express'
import cors from 'cors'
import { config } from './config/config'
import { connectDB } from './config/dbConnect'
import { userRoutes } from './routes/userRoutes'
import { filmRentalRoutes } from './routes/filmRentalRoutes'
import errorHandler from './middlewares/errorHandler'

// CONNECT DB FUNCTION
connectDB()

const app = express()
const port = config.server.port

app.use(cors({ credentials: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.listen(port, () => {
    console.log(`Server listen on port: ${port}`)
})

app.use('/api/user', userRoutes)
app.use('/api/filmRental', filmRentalRoutes)
app.use(errorHandler)






