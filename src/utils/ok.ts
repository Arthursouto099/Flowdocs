import { Response } from "express";

export function resOk ({res, status = 200, message, data}: {res: Response, status: number, message?: string, data?: unknown}) {
   return res.status(status).json({success: true, message, data})
}