import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import {z} from 'zod'
import ShortUniqueId from 'short-unique-id'
import { authenticate } from "../plugins/authenticate"

export async function poolRoutes(fastify: FastifyInstance){
  //http://localhost:3333/pools/count
  fastify.get('/pools/count', async () => {
    const count = await prisma.pool.count()
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

    try {
      await request.jwtVerify()

      await prisma.pool.create({
        data: {
          title,
          code,
          ownerId: request.user.sub,

          participants: {
            create: {
              userId: request.user.sub
            }
          }
        }
      })
    } catch (error) {
      await prisma.pool.create({
        data: {
          title,
          code 
        }
      })
    }

    return reply.status(201).send({code})
  })

  //http://localhost:3333/pools/join
  fastify.post('/pools/join', {
    onRequest:[authenticate]
  },async (request,reply) => {
    const joinPoolBody = z.object({
      code: z.string()
    })

    const { code } = joinPoolBody.parse(request.body)

    const pool = await prisma.pool.findUnique({
      where: {
        code
      },
      include: {
        participants: {
          where: {
            userId: request.user.sub
          }
        }
      }
    })

    if (!pool) {
      return reply.status(400).send({
        message: 'Pool not found.'
      })
    }

    if (pool.participants.length > 0) {
      return reply.status(400).send({
        message: 'You already joined this pool.'
      })
    }

    if (!pool.ownerId){
      await prisma.pool.update({
        where: {
          id: pool.id
        },
        data: {
          ownerId: request.user.sub
        }
      })
    }

    await prisma.participant.create({
      data: {
        poolId: pool.id,
        userId: request.user.sub
      }
    })

    return reply.status(201).send()
  })

  //http://localhost:3333/pools
  fastify.get('/pools', {
    onRequest: [authenticate]
  }, async (request) => {
    const pools = await prisma.pool.findMany({
      where: {
        participants: {
          some: {
            userId: request.user.sub
          }
        }
      },
      include: {
        _count: {
          select:{
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarURL: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })
    return {pools}
  })

  //http://localhost:3333/pools/:id
  fastify.get('/pools/:id', {
    onRequest: [authenticate]
  },async (request) => {
    const getPoolParams = z.object({
      id: z.string()
    })

    const {id} = getPoolParams.parse(request.params)

    const pool = await prisma.pool.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select:{
            participants: true
          }
        },
        participants: {
          select: {
            id: true,
            user: {
              select: {
                avatarURL: true
              }
            }
          },
          take: 4
        },
        owner: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })
    return {pool}
  })
}