import { Router } from "express";
import userRouter from "./user.router";
import moduleRouter from "./module.routes";
import processRouter from "./process.router";


const appRouterV1 = Router()


appRouterV1.use("/user", userRouter)
appRouterV1.use("/module",moduleRouter)
appRouterV1.use("/process", processRouter)

export default appRouterV1