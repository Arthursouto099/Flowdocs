
import { Router } from "express";
import authMiddleware from "../../middlewares/auth.middleware";
import processController from "../../controllers/process.controller";



const processRouter = Router()


processRouter.use("/create", authMiddleware, processController.create )
processRouter.get("/:id_module/all", authMiddleware, processController.findAll)


export default processRouter