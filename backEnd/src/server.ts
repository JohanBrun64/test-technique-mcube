import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { moviesControllers } from "./controllers/moviesControllers"
import { initDb } from "./database/database"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080
const initServer = async () => {
    await initDb()
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!')
    })

    app.use('/movies', moviesControllers.getMovieFromTMDB)

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })
}

initServer()
