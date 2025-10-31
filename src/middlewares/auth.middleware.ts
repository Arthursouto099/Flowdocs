import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import {verify} from "jsonwebtoken"

export default function authMiddleware(req: AuthRequest , res: Response, next: NextFunction) {

        
        const [_, token] = (req.headers.authorization as string).split(" ")
       
        
        const payload = verify(token, process.env.JWT_SECRET!) as {email: string, id: string, role?: string}

        if(!payload) {
            res.status(401).json({message: "Não autorizado"})
        }


        req.credentials = payload

        next()
}