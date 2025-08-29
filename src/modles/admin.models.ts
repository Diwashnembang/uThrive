import { Admin, Prisma, ServiceProvider } from "@prisma/client";
import { prisma } from "./serviceProvider.models";

export async function getAllunapprovedServiceProviders(): Promise<ServiceProvider[]> {
    try {
        const serviceProviders: ServiceProvider[] = await prisma.serviceProvider.findMany({
            where: { approved: false },
        });
        return serviceProviders;
    } catch (error) {
        console.error("Error fetching unapproved service providers:", error);
        throw error;
    }
}
export async function getAllapprovedServiceProviders(): Promise<ServiceProvider[]> {
    try {
        const serviceProviders: ServiceProvider[] = await prisma.serviceProvider.findMany({
            where: { approved: true },
        });
        return serviceProviders;
    } catch (error) {
        console.error("Error fetching unapproved service providers:", error);
        throw error;
    }
}

export async function approveServiceProvider(serviceProviderId: number): Promise<ServiceProvider> {
    try {
        const updatedServiceProvider: ServiceProvider = await prisma.serviceProvider.update({
            where: { id: serviceProviderId },
            data: { approved: true },
        });
        return updatedServiceProvider;
    } catch (error) {
        console.error("Error approving service provider:", error);
        throw error;
    }
}

export async function login(email: string, password: string): Promise<Admin | null> {
    try{
        const admin = await prisma.admin.findUnique({
            where: { email: email },
        });

        if (admin && admin.password === password) {
            return admin;
        }
        
        return null;
    }
    catch (error) {
        console.error("Error during admin login:", error);
        throw error;
    }
}