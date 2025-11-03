import { Request, Response, NextFunction } from "express"
import authService, { AuthError } from "../service/auth.service"
import { resOk } from "../utils/ok"
import { AuthRequest } from "../types/AuthRequest"



export const authController = {

login:  async (req: Request, res: Response, next: NextFunction) => {
 try{
 
    const loginSuccessfully = await authService.login({data: req.body})
    resOk({res, status: 200, message: loginSuccessfully.message, data: loginSuccessfully.token})
 }
 catch(e: unknown) {
    next(e)

 }
}

}
