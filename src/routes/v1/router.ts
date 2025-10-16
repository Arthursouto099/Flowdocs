import { Router } from "express";
import userRouter from "./user.router";


const appRouterV1 = Router()


appRouterV1.use("/user", userRouter)


export default appRouterV1