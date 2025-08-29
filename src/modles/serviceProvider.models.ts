import { PrismaClient, Prisma, ServiceProvider } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { comparePassword } from "../helper/helper";

export const  prisma = new PrismaClient().$extends(withAccelerate());

export async function CreateServiceProvider(
  data: Prisma.ServiceProviderCreateInput
) : Promise<ServiceProvider>{
  let serviceProvider: ServiceProvider = await prisma.serviceProvider.create({
    data: data,
  });
  return serviceProvider
}

export async function login(email: string, password: string): Promise<ServiceProvider | null> {
  const serviceProvider = await prisma.serviceProvider.findUnique({
    where: { email: email },
  });

  if (serviceProvider && await comparePassword(password,serviceProvider.password) ) {
    return serviceProvider;
  }
  
  return null;
}

export async function postEvent(
  data: Prisma.EventUncheckedCreateInput
): Promise<Prisma.EventUncheckedCreateInput> {
  try {
  let event: Prisma.EventUncheckedCreateInput = await prisma.event.create({
    data: data,
  });
  return event;
  }catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}

export async function isApproved(serviceProviderId: number): Promise<boolean> {
  try {
    const serviceProvider = await prisma.serviceProvider.findFirst({
      where: { id: serviceProviderId,approved: true },
    
    })
     if (serviceProvider) {
      return true;
    }else {
      return false;
    }
    ;}
    catch (error) {
      console.error("Error checking approval status:", error);
      throw error;
    }
   
}