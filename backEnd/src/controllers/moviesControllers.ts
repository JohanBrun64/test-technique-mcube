import { Request, Response } from "express";
import { tmdbServices } from "../services/tmdbService";
import { mongoServices } from "../services/mongoService";
import { Movie } from "../types/movie";

type ReqQuery = { userId: string, movieId?: number, movieTitle?: string, orderingParam?: keyof Movie, rate?: number }
type Req = Request<unknown, unknown, unknown, ReqQuery>

export const moviesControllers = {
    getMoviesFromTMDB: async (req: Req, res: Response) => {
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
    getMoviesFromMongo: async (req: Req, res: Response) => {
        try {
            const result = await mongoServices.getUserList(req.query.userId)
            return res.json(result)
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    addMovietoUserList: async (req: Req, res: Response) => {
        try {
            if (req.query.movieId && req.query.userId) {
                const movie = await tmdbServices.searchMovie(req.query.movieId)
                if (movie) {
                    const formattedMovie = tmdbServices.formatMovie(movie)
                    const result = await mongoServices.addMovieToUserList(req.query.userId, formattedMovie)
                    return res.json(result)
                }
                else {
                    res.status(404).send("movie unfound!")
                }
            }
            else {
                return res.status(400).send("params missing!")
            }
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    getMovieinUserList: async (req: Req, res: Response) => {
        try {
            if (req.query.movieTitle && req.query.userId) {
                const result = await mongoServices.searchMovieInUserList(req.query.userId, req.query.movieTitle)
                if (result) {
                    return res.json(result)
                }
                else {
                    return res.status(404).send("Unknown movie!")
                }
            }
            else {
                return res.status(400).send("params missing!")
            }
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    getMoviesInUserListOrdered: async (req: Req, res: Response) => {
        try {
            if (req.query.orderingParam && req.query.userId) {
                const result = await mongoServices.orderMovies(req.query.userId, req.query.orderingParam)
                if (result) {
                    return res.json(result)
                }
                else {
                    return []
                }
            }
            else {
                return res.status(400).send("Params missing!")
            }

        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    searchMovieDetails: async (req: Req, res: Response) => {
        try {
            if (req.query.movieId) {
                const result = await tmdbServices.searchMovie(req.query.movieId)
                if (result) {
                    return res.json(result)
                }
                else {
                    return "unknown movie"
                }
            }
            else {
                return res.status(400).send("params missing!")
            }
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    getMovieRecommendations: async (req: Req, res: Response) => {
        try {
            if (req.query.movieId) {
                const result = await tmdbServices.movieRecommendations(req.query.movieId)
                if (result) {
                    return res.json(result)
                }
                else {
                    return "unknown movie"
                }
            }
            else {
                return res.status(400).send("params missing!")
            }
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    },
    rateMovie: async (req: Req, res: Response) => {
        try {
            if (req.query.movieId && req.query.rate && req.query.userId) {
                const result = await mongoServices.rateMovie(req.query.userId, req.query.movieId, req.query.rate)
                if (result) {
                    return res.json(result)
                }
                else {
                    return "unknown movie!"
                }
            }
            else {
                return res.status(400).send("movie and rate mandatory!")
            }
        } catch (err) {
            return res.status(500).send(`Error: ${err}`)
        }
    }
}