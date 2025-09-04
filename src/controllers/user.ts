import { Request, Response } from "express";
import { Prisma, User, Event } from "@prisma/client";
import { signUp } from "../modles/users.models";
import { hashPassword, signJWTToken, tokenExpireTime } from "../helper/helper";
import { login, joinEvent,leaveEvent } from "../modles/users.models";
import { CustomRequest } from "../middleware/middleware";
import { getAllEvents } from "../modles/events.models";
export class usersController {
    async signUp(req: Request, res: Response) {
        try {
            let data: Prisma.UserCreateInput = req.body as Prisma.UserCreateInput;
            if (!data.name || !data.email || !data.password) {
                res.status(400).json({ error: "Name, email, and password are required." });
                return;
            }
            data.password = await hashPassword(data.password);
            let userInfo: Prisma.UserCreateInput = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            const user: User = await signUp(userInfo);
            const token = signJWTToken(user.id,user.email, user.name,"user", tokenExpireTime)
            res.status(201).json({success : true , token});
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required." });
                return;
            }
            const user: User | null = await login(email, password);
            if (!user) {
                throw new Error("Invalid email or password");
            }
            const token = signJWTToken(user.id,user.email, user.name,"user", tokenExpireTime)
            res.status(200).json({ token });
        } catch (error) {
            console.log("invalid email or password", error);
            res.status(401).json({ error: "Invalid email or password" });
        }
    }
    async joinEvent(req: CustomRequest, res: Response) {
        try {
            const userId = req.userId; // Assuming userId is sent in the request body
            const eventId = req.body.eventId; // Assuming eventId is sent in the request body
            if (!eventId || !userId) {
                res.status(400).json({ error: "Event ID and User ID are required." });
                return;
            }
            const event = await joinEvent(parseInt(eventId), parseInt(userId));
            console.log(event)
            res.status(200).json({ message: "Successfully joined the event", event });
        } catch (error) {
            console.error("Error joining event:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
    
    async getEvents(req: CustomRequest, res: Response) {
        try {
            const events: Event[] = await getAllEvents();
            res.status(200).json({ events });
        }catch (error) {
            console.error("Error fetching events:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async unregisterFromEvent(req: CustomRequest, res: Response) {
        try {
            const userId: string | undefined = req.userId;
            const eventId = req.body.eventId; // Assuming eventId is sent in the request body
            if (!userId || !eventId) {
                res.status(400).json({ error: "User ID and Event ID are required." });
                return;
            }
            // Implement unregister logic here
            const event = await leaveEvent(parseInt(eventId), parseInt(userId));
            // For example, you might remove the user from the event's confirmed users list in the database
            res.status(200).json({ message: "Successfully unregistered from the event" });
        } catch (error) {
            console.error("Error unregistering from event:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
}

  