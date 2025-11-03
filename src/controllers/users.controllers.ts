import { Request, Response, NextFunction } from "express"
import usersServices from "../service/users.service"
import { resOk } from "../utils/ok"
import { AuthRequest } from "../types/AuthRequest"



export const usersController = {



    create: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {name, password, orgName, email, identifier_code} = req.body
            const data = await usersServices.createUser({data: {name, password, email}, dataOrg: {orgName, identifier_code }})
           
            resOk({ res, status: 201, message: "created successfuly", data })
        }

        catch (e) {
            next(e)
        }

    },

    getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = await usersServices.findUsers({ page: Number(req.query.page), limit: Number(req.query.limit)},
                req.credentials && req.credentials.role === "ADMIN" ? true : false, req.credentials?.orgId ?? ""
            )
            resOk({ res, status: 200, message: "finded successfuly", data })

        }
        catch (e) {
            next(e)
        }
    },

    getUnique: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await usersServices.findUser({ id: req.params.id })
            resOk({ res, status: 200, message: "finded successfuly", data })
        }
        catch (e) {
            next(e)
        }

    },

    update: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await usersServices.update({ id: req.params.id }, req.body)
            resOk({ res, status: 200, message: "updated successfuly", data })
        }
        catch (e) {
            next(e)
        }
    },

    delete: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = await usersServices.delete({ id: req.params.id })
            resOk({ res, status: 200, message: "deleted successfuly", data })
        }
        catch (e) {
            next(e)
        }
    }


}