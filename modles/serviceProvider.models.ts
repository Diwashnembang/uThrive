import { PrismaClient,Prisma } from '../src/generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient()
  .$extends(withAccelerate())


export async function CreateServiceProvider(data : Prisma.ServiceProviderCreateInput) {
  return prisma.serviceProvider.create({
    data: {
      name,
      email,
      type,
    },
  })
}