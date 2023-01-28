import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"


export async function guessRoutes(fastify: FastifyInstance){
  //http://localhost:3333/guesses/count
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()
    return {count}
  })
}