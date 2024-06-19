import { Request, Response } from "express";
import { tmdbServices } from "../services/tmdbService";
import { mongoServices } from "../services/mongoService";
import { Movie } from "../types/movie";

type ReqQuery = { userId: string, movie: Movie }
type Req = Request<unknown, unknown, unknown, ReqQuery>

export const moviesControllers = {
    getMovieFromTMDB: async (req: Request, res: Response) => {
        try {
            const searchParams: string = new URLSearchParams(req.query as unknown as string).toString()

            if (!searchParams) {
                return res.status(400).send('search params mandatory!')
            }

            const result = await tmdbServices.searchMovies(searchParams)
            return res.json(result)
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    addMovietoUserList: async (req: Req, res: Response) => {
        try {
            const searchParams: string = new URLSearchParams(req.query as unknown as string).toString()

            if (!searchParams) {
                return res.status(400).send('search params mandatory!')
            }
            const result = await mongoServices.addMovieToUserList(req.query.userId, req.query.movie)
            return res.json(result)
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    }
}