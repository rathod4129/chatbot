import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}
type PrismaClienSingleton = ReturnType <typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as{
  prisma:PrismaClienSingleton | undefined;
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma