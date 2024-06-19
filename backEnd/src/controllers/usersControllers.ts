import { Request, Response } from "express"
import { userService } from "../services/userService"

type userReqQuery = { name: string, userId: string }
type userReq = Request<unknown, unknown, unknown, userReqQuery>

export const usersControllers = {
    createUser: async (req: userReq, res: Response) => {
        try {
            if (req.query.name) {
                const result = await userService.createUser(req.query.name)
                return res.json(result)
            }
            else {
                res.status(400).send('missing params!')
            }
        } catch (err) {
            return res.status(500).send(err)
        }
    },
    getUser: async (req: userReq, res: Response) => {
        try {
            if (req.query.name) {
                const result = await userService.getUser(req.query.name)
                return res.json(result)
            }
            else {
                res.status(400).send('missing params!')
            }
        } catch (err) {
            return res.status(500).send(err)
        }
    }
}