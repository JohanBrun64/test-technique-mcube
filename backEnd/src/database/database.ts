import { Db, MongoClient } from "mongodb"
import dotenv from "dotenv"

dotenv.config()

let db: Db | null = null

export const initDb = async () => {
    const client = new MongoClient(`mongodb://root:root@database:27017/admin?authsource=admin`)

    await client.connect();

    db = client.db('user_movies')

    console.log('Mongo database connected!')
}

export const getDb = () => {
    return db
}

