import { Prisma, User,Event } from "@prisma/client";
import {prisma} from "./serviceProvider.models"
import { comparePassword } from "../helper/helper";


export async function signUp(data: Prisma.UserCreateInput): Promise<User> {
    try{
    let user: User = await prisma.user.create({
        data: data,
    });
    return user;
    }catch (error) {
        throw error;
    }
}

export async function login(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (user && await comparePassword(password, user.password)) {
        return user;
    }
    
    return null;
}

export async function joinEvent(
    eventId : number , userId : number): Promise<Event> {
    // You should implement the actual event creation logic here.
    try{
    const event : Event = await prisma.event.update({
        where: { id: eventId },
        data: {
            ConfirmedUsers: {
                connect: { id: userId }
            }
        },
        include: {
            ConfirmedUsers: true,
        }
    });
    return event ;
    }catch (error) {
        console.error("Error joining event:", error);
        throw error;
    }
}

export async function leaveEvent(
    eventId : number , userId : number): Promise<Event> {
    try{
    const event : Event = await prisma.event.update({
        where: { id: eventId },
        data: {
            ConfirmedUsers: {
                disconnect: { id: userId }
            }
        },
        include: {
            ConfirmedUsers: true,
        }
    });
    return event ;
    }catch (error) {
        console.error("Error leaving event:", error);
        throw error;
    }
}