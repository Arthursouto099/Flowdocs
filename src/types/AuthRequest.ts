import { Request } from "express";

export type AuthRequest = Request & {
    credentials?: {email: string, id: string, role?: string}
}