import { Event } from "@prisma/client";
import { prisma } from "./serviceProvider.models";

export async function getAllServiceProviderEvents(id : number): Promise<Event[]> {
    const events : Event[] = await prisma.event.findMany({
        where: {
            serviceProviderId: id
        },
        include:{
            ConfirmedUsers: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
    return events;
}

export async function getAllEvents(): Promise<Event[]> {
    let events: Event[] = [];
    try{
    events = await prisma.event.findMany({
        include: {
            serviceProvider: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            ConfirmedUsers: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
    }catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
    return events;
}

export async function getRegistredEvents(userId: number): Promise<Event[]> {
    let events: Event[] = [];
    try{
    events = await prisma.event.findMany({
        where: {
            ConfirmedUsers: {
                some: {
                    id: userId
                }
            }
        },
        include: {
            serviceProvider: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            },
            ConfirmedUsers: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
    }catch (error) {
        console.error("Error fetching events:", error);
        throw error;
    }
    return events;
}

