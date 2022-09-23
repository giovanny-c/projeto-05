import express from "express"
import cors from "cors"
import routes from "./routes"
import { errors as celebrateErrors } from "celebrate"
import { errorHandler } from "shared/errors/ErrorHandler"

const app = express()

app.use(cors())
app.use(express.json())

app.use(routes)

app.use(celebrateErrors())

app.use(errorHandler)

export { app }
