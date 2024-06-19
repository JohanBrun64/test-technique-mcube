import { Collection } from "mongodb";
import { getDb } from "../database/database";
import { User } from "../types/db";

export const userService = {
    createUser: async (name: string): Promise<string> => {
        const db = getDb()
        if (db) {
            const Users: Collection<User> = await db.collection('users')
            const user = await Users.findOne({ name: name })
            if (user) {
                throw new Error("user already exist!")
            }
            await Users.insertOne(
                {
                    name: name,
                    movies: []
                }
            )
            return `user ${name} created!`
        }
        else {
            throw new Error("no db!")
        }
    },
    getUser: async (name: string): Promise<User | null> => {
        const db = getDb()
        if (db) {
            const Users: Collection<User> = await db.collection('users')
            const user = await Users.findOne({ name: name })
            if (user) {
                return user
            }
            else {
                return null
            }
        }
        else {
            throw new Error("no db!")
        }
    }
}