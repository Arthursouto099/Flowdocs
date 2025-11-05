import { NextFunction, Response } from "express"
import { AuthRequest } from "../types/AuthRequest"
import processService from "../service/process.service"
import { resOk } from "../utils/ok"


const processController = {
    create: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {

            const data = await processService.create({
                data: {
                    module: {connect: {id: req.params.id_module}},
                    name: req.body.name,
                    description: req.body.description,
                    user: {connect:  {id: req.credentials?.id}}
                }
            })
            resOk({ res, status: 201, message: "Process created successfuly", data })
        }

        catch (e) {
            next(e)
        }



    },


    createTask: async  (req: AuthRequest, res: Response, next: NextFunction) => {
        try{
            const data = await processService.createTask({data: {
                process: {connect: {id: req.params.id_process}},
                title: req.body.title,
                description: req.body.description,
                user: {connect: {id: req.credentials?.id}}
            }})
            
            resOk({res, status: 201, message: "Task criada com sucesso", data})
        }
        catch(e) {
            next(e)
        } 
    },


    findAllTasks: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try{
            const data = await processService.findTasksByProcess({
                pagination: {
                    page: Number(req.query.page ?? 1),
                    limit: Number(req.query.limit ?? 20)
                },
                id_process: req.params.id_process
            })

            

            resOk({res, status: 200, message: "Busca feita com sucesso", data})
        }
        catch(e) {
            next(e)
        }
    },

    

    changeTaskState: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try{
            const data = await processService.changeTaskState({
                id_task: req.params.id_task,
                oldState: req.body.old_state
            })

            resOk({res, status: 200, message: "Alteração feita com sucesso", data})

        }
        catch(e) {
            next(e)
        }
    }
    ,

    findAll: async (req: AuthRequest, res: Response, next: NextFunction) => {
        try {
            const data = await processService.findProcessByModule({
                pagination: {
                    page: Number(req.query.page?? 1),
                    limit: Number(req.query.limit ?? 20)
                },
                id_module: req.params.id_module
            })

            resOk({res, status: 200,message: "Process find", data })
        }

        catch (e) {
            next(e)
        }
    }
}


export default processController