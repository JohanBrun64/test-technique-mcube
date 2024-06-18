import { Request, Response } from "express";
import { tmdbServices } from "../services/tmdbService";

export const moviesControllers = {
    getMovieFromTMDB: async (req: Request, res: Response) => {
        try {
            const searchParams: string = new URLSearchParams(req.query as unknown as string).toString()

            if (!searchParams) {
                return res.status(400).send('search params mandatory!')
            }

            const result = await tmdbServices.searchMovies(searchParams)
            return res.json(result)
        } catch (error) {
            return res.status(500).send(`Error: ${error}`)
        }
    }
}