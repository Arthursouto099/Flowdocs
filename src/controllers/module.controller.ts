import { Request, Response, NextFunction } from "express"
import moduleService from "../service/module.service"
import { resOk } from "../utils/ok"
import { AuthRequest } from "../types/AuthRequest"
import { prisma } from "../lib/prisma"

const moduleController = {

    create: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {

            const data = await moduleService.createModule({
                data: {
                    name: req.body.name,
                    description: req.body.description,
                    org: { connect: { identifier_code: req.credentials?.identifier_code } },
                    user: { connect: { id: req.credentials?.id } }
                }
            })
            resOk({ res, status: 201, message: "Module created successfuly", data })
        }

        catch (e) {
            next(e)
        }



    },

    getAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = await moduleService.findModulesByOwner({
                pagination:
                    { page: Number(req.query.page?? 1) , limit: Number(req.query.limit  ?? 20)  },
                identifierOrg: { id: req.credentials?.id!, identifier_code: req.credentials?.identifier_code! }
            })

            resOk({ res, status: 200, message: "finded successfuly", data })

        }
        catch (e) {
            next(e)
        }
    },
}

export default moduleController