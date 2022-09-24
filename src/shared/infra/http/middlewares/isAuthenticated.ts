import AppError from "@shared/errors/AppError"
import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import authConfig from "@config/auth"

interface ITokenPayload {
    iat: number
    exp: number
    sub: string
}
export default function isAuthenticated(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new AppError("JWT token is missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub } = verify(token, authConfig.jwt.secret) as ITokenPayload

        req.user = {
            id: sub,
        }

        return next()
    } catch (error) {
        throw new AppError("Invalid JWT Token")
    }
}
