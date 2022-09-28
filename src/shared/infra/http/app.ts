import express from "express"
import cors from "cors"
import routes from "./routes"
import { errors as celebrateErrors } from "celebrate"
import { pagination } from "typeorm-pagination"
import { errorHandler } from "@shared/errors/ErrorHandler"
import uploadConfig from "@config/upload"
import rateLimiter from "./middlewares/rateLimiter"

const app = express()

app.use(cors())
app.use(express.json())

app.use(rateLimiter)

app.use(pagination)

app.use("/files", express.static(uploadConfig.directory))

app.use(routes)

app.use(celebrateErrors())

app.use(errorHandler)

export { app }
