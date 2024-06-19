import axios from "axios"
import dotenv from "dotenv"
import { Movie } from "../types/movie"
import { tmdbResponse } from "../types/tmdb"

dotenv.config()

export const tmdbServices = {
    searchMovies: async (searchParams: string): Promise<Movie[]> => {
        try {
            const response = await axios.get(`${process.env.TMDBbaseUrl}?${searchParams}&api_key=${process.env.TMDBkey}`)
            if (response.status !== 200) throw new Error("themoviedb request failed!")
            const data: tmdbResponse = response.data
            const movies: Movie[] = data.results.map((m) => ({
                id: m.id,
                title: m.title,
                description: m.overview,
                releaseDate: m.release_date ? new Date(m.release_date) : null,
                image: `https://image.tmdb.org/t/p/original/${m.poster_path}`
            }) as Movie)
            return movies
        }
        catch (e) {
            console.log(e)
            return []
        }
    }
}