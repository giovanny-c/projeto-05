import { Request, Response, NextFunction } from "express"

import redis from "redis"
import { RateLimiterRedis } from "rate-limiter-flexible"

import AppError from "@shared/errors/AppError"

//se der erro
//import Redis from "ioredis"
// substituir o redis.createClient por new Redis({host:, port:, password: })

const redisClient = redis.createClient({
    legacyMode: true,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
    },
    password: process.env.REDIS_PASS || undefined,
})

const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "ratelimit",
    points: 5,
    duration: 1,
})

export default async function rateLimiter(request: Request, response: Response, next: NextFunction) {
    try {
        //e colocar o redis client e o limiter inteiros aqui dentro
        await limiter.consume(request.ip)

        return next()
    } catch (error) {
        throw new AppError("Too many requests.", 429)
    }
}
