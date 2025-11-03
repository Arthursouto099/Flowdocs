import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/AuthRequest";
import {verify} from "jsonwebtoken"

export default function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Token não fornecido" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ message: "Token inválido" });
    }

    const token = parts[1];

    const payload = verify(token, process.env.JWT_SECRET!) as {
      email: string;
      id: string;
      role?: string;
      orgId: string;
      identifier_code: string;
      name: string
    };

    req.credentials = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Não autorizado" });
  }
}
