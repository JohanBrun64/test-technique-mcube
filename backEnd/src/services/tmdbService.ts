import axios from "axios"
import dotenv from "dotenv"
import { Movie } from "../types/movie"
import { tmdbMovie, tmdbResponse } from "../types/tmdb"

dotenv.config()

export const tmdbServices = {
    formatMovie: (movie: tmdbMovie): Movie => {
        const formattedMovie: Movie =
        {
            id: movie.id,
            title: movie.title,
            description: movie.overview,
            releaseDate: new Date(movie.release_date),
            image: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
            rate: 0,
        }
        return formattedMovie
    },
    searchMovies: async (searchParams: string): Promise<Movie[]> => {
        try {
            const response = await axios.get(`${process.env.TMDBbaseUrl}?${searchParams}&api_key=${process.env.TMDBkey}`)
            if (response.status !== 200) throw new Error("themoviedb request failed!")
            const data: tmdbResponse = response.data
            const movies: Movie[] = data.results.map((m) => ({
                id: m.id,
                title: m.title,
                description: m.overview,
                releaseDate: new Date(m.release_date),
                image: `https://image.tmdb.org/t/p/original/${m.poster_path}`,
                rate: 0,
            }) as Movie)
            return movies
        }
        catch (err) {
            console.log(err)
            return []
        }
    },
    searchMovie: async (movieId: number): Promise<tmdbMovie | null> => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US}&api_key=${process.env.TMDBkey}`)
            if (response.status !== 200) throw new Error("themoviedb request failed!")
            const data: tmdbMovie = response.data
            return data
        } catch (err) {
            console.log(err)
            return null
        }
    },
    movieRecommendations: async (movieId: number): Promise<Movie[]> => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US}&page=1&api_key=${process.env.TMDBkey}`)
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
        } catch (err) {
            console.log(err)
            return []
        }
    }
}