
import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import processController from "../../controllers/process.controller";



const processRouter = Router()

// Processos
processRouter.use("/create/:id_module", authMiddleware, processController.create )
processRouter.get("/:id_module/all", authMiddleware, processController.findAll)

// Tasks
processRouter.get("/task/:id_process", authMiddleware, processController.findAllTasks)
processRouter.post("/task/create/:id_process", authMiddleware, processController.createTask)

export default processRouter