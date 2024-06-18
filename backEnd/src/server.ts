import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { moviesControllers } from "./controllers/moviesControllers"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.get('/', (req: Request, res: Response) => {
    res.send('Hello world!')
})

app.use('/movies', moviesControllers.getMovieFromTMDB)

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})