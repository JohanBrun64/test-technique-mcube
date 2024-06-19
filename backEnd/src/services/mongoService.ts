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
            const res = await Users.updateOne(
                { _id: new ObjectId(userId) },
                { $push: { movies: movie } }
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
            throw new Error("no databse!")
        }
    },
    searchMovieInUserList: async (userId: string, movieTitle: string): Promise<Movie | undefined> => {
        const movies = await mongoServices.getUserList(userId)
        const movie = movies.find((m) => m.title === movieTitle)
        return movie
    },

}