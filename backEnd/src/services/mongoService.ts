import dotenv from "dotenv"
import { Movie } from "../types/movie"
import { getDb } from "../database/database"
import { Collection, ObjectId } from "mongodb"
import { User } from "../types/db"

dotenv.config()


export const mongoServices = {
    addMovieToUserList: async (userId: string, movie: Movie): Promise<any> => {
        const db = getDb()
        if (db) {
            const Users: Collection<User> = await db.collection('users')
            const addedMovie =
            {
                ...movie,
                addedTime: new Date()
            }
            const res = await Users.updateOne(
                { _id: new ObjectId(userId) },
                { $push: { movies: addedMovie } }
            )
            return res
        }
    },
    getUserList: async (userId: string): Promise<Movie[]> => {
        const db = getDb()
        if (db) {
            const Users: Collection<User> = await db.collection('users')
            const user = await Users.findOne({ _id: new ObjectId(userId) })
            if (user) {
                return user.movies
            }
            else {
                return []
            }
        }
        else {
            throw new Error("no database!")
        }
    },
    searchMovieInUserList: async (userId: string, movieTitle?: string, movieId?: number): Promise<Movie | undefined> => {
        const movies = await mongoServices.getUserList(userId)
        if (movieTitle) {
            const movie = movies.find((m) => m.title === movieTitle)
            return movie
        }
        if (movieId) {
            const movie = movies.find((m) => m.id === movieId)
            return movie
        }
    },
    orderMovies: async (userId: string, orderingParam: keyof Movie): Promise<Movie[]> => {
        const movies = await mongoServices.getUserList(userId)
        movies.sort((a, b) => {
            const movieA = a[orderingParam]
            const movieB = b[orderingParam]
            if (typeof orderingParam === "string") {
                const stringMovieA = (movieA as string).toUpperCase()
                const stringMovieB = (movieB as string).toUpperCase()
                if (stringMovieA < stringMovieB) {
                    return -1
                }
                if (stringMovieA > stringMovieB) {
                    return 1
                }
                if (stringMovieA === stringMovieB) {
                    return 0
                }
            }
            // This couldn"t happen but if it's not handle, typescript trigger an error
            if (typeof orderingParam === "number") {
                return (movieA as number) - (movieB as number)
            }
            else {
                const dateMovieA = new Date(movieA as Date)
                const dateMovieB = new Date(movieB as Date)
                return dateMovieA.getTime() - dateMovieB.getTime()
            }
        })
        return movies
    },
    rateMovie: async (userId: string, movieId: number, rate: number): Promise<Movie | null> => {
        const db = getDb()
        if (db) {
            const Users: Collection<User> = await db.collection('users')
            await Users.updateOne(
                { _id: new ObjectId(userId), "movies.id": movieId },
                { $set: { 'movies.$.id': rate } }
            )
            const result = await Users.findOne(
                { _id: new ObjectId(userId), "movies.id": movieId },
            )
            if (result) {
                return result.movies.find(m => m.id === movieId) ?? null
            }
            else {
                return null
            }
        }
        else {
            throw new Error("no database!")
        }

    }
}