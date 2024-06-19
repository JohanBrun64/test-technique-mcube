import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { moviesControllers } from "./controllers/moviesControllers"
import { initDb } from "./database/database"
import { usersControllers } from "./controllers/usersControllers"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080
const initServer = async () => {
    await initDb()
    app.get('/', (req: Request, res: Response) => {
        res.send('Hello world!')
    })

    app.use('/user/create', usersControllers.createUser)
    app.use('/user/get', usersControllers.getUser)

    app.use('/movies/tmdb', moviesControllers.getMoviesFromTMDB)
    app.use('/movies/userList', moviesControllers.getMoviesFromMongo)
    app.use('/movies/addToList', moviesControllers.addMovietoUserList)
    app.use('/movies/userList/movie/:id', moviesControllers.getMovieinUserList)
    app.use('/movies/userList/ordered/:orderType', moviesControllers.getMoviesInUserListOrdered)
    app.use('/movies/tmdb/movie/:id', moviesControllers.searchMovieDetails)
    app.use('/movies/tmdb/movie/:id/recommendations', moviesControllers.getMovieRecommendations)
    app.use('movies/userList/movie/:id/rate', moviesControllers.rateMovie)

    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })
}

initServer()
