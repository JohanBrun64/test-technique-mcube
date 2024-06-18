import axios from "axios"
import dotenv from "dotenv"
import { Movie } from "../types/movie"
import { tmdbMovie, tmdbResponse } from "../types/tmdb"

dotenv.config()

const baseUrl = 'https://api.themoviedb.org/3/search/movie'

export const tmdbServices = {
    searchMovies: async (searchParams: string): Promise<Movie[]> => {
        console.log('searchparams: ' + searchParams)
        try {
            const response = await axios.get(`${baseUrl}?${searchParams}&api_key=${process.env.TMDBkey}`)
            console.log('res: ' + response)
            if (response.status !== 200) throw new Error("themoviedb request failed!")
            const data: tmdbResponse = response.data
            const movies: Movie[] = data.results.map((m) => ({
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