import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john.doe@wmail.com',
      avatarURL: 'https://github.com/unscrud.png',
    }
  })

  const pool = await prisma.pool.create({
    data: {
      title: 'Exemplo de Bolão',
      code: 'BOL123',
      ownerId: user.id,

      participants: {
        create: {
          userId: user.id
        }
      }
    }
  })
  
  const game = await prisma.game.create({
    data: {
      date: '2022-11-02T12:00:19.038Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'BR',
    }
  })

  const game2 = await prisma.game.create({
    data: {
      date: '2022-11-03T12:00:19.038Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect: {
              userId_poolId:{
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })
}

main()