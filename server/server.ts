import express from 'express'
import cors from 'cors'
import { config } from './config/config'
import { connectDB } from './config/dbConnect'

// CONNECT DB FUNCTION
connectDB()

const app = express()
const port = config.server.port

app.use(cors({ credentials: true }))

app.use(express.json())

app.listen(port, () => {
    console.log(`Server listen on port: ${port}`)
})


