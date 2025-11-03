
import { Router } from "express";
import moduleController from "../../controllers/module.controller";
import authMiddleware from "../../middlewares/auth.middleware";



const moduleRouter = Router()


moduleRouter.use("/create", authMiddleware, moduleController.create )
moduleRouter.get("/owner/all", authMiddleware, moduleController.getAll)


export default moduleRouter