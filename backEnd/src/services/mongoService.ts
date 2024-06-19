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
    }
}