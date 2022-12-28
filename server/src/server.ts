import Fastify from 'fastify'
import cors from "@fastify/cors";
import {z} from 'zod'
import {PrismaClient} from '@prisma/client'
import ShortUniqueId from 'short-unique-id'

const prisma = new PrismaClient({
  log: ['query'],
})

async function bootstrap() {
  const fastify = Fastify({
    logger: true,
  })

  await fastify.register(cors, {
    origin: true,
  })

  //http://localhost:3333/pools/count
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
    return {count}
  })
  
  //http://localhost:3333/users/count
  fastify.get('/users/count', async () => {
    const count = await prisma.user.count()
    return {count}
  })
  
  //http://localhost:3333/guesses/count
  fastify.get('/guesses/count', async () => {
    const count = await prisma.guess.count()
    return {count}
  })

  //http://localhost:3333/pools
  fastify.post('/pools', async (request,reply) => {
    const createPoolBody = z.object({
      title: z.string(),
    })

    const generate = new ShortUniqueId({length: 6})

    const {title} = createPoolBody.parse(request.body)

    const code = String(generate()).toUpperCase()

    await prisma.pool.create({
      data: {
        title,
        code 
      }
    })

    return reply.status(201).send({code})
  })

  await fastify.listen({
    port: 3333,
    // host: '0.0.0.0',
  })
}

bootstrap()