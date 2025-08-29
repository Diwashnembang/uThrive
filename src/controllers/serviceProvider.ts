import { Request, Response } from "express";
import { CreateServiceProvider, isApproved, login, postEvent } from "../modles/serviceProvider.models";
import { Prisma , ServiceProvider,Event } from "@prisma/client";
import { hashPassword, signJWTToken, tokenExpireTime } from "../helper/helper";
import { sign } from "crypto";
import { CustomRequest } from "../middleware/middleware";
import { getAllServiceProviderEvents } from "../modles/events.models";
export class ServiceProviderController {

    async createServiceProvider( req: Request, res: Response ) {
        try {
            let  data: Prisma.ServiceProviderCreateInput = req.body as Prisma.ServiceProviderCreateInput;
            if (!data.name || !data.email || !data.password) {
                res.status(400).json({ error: "Name, email, and password are required." });
                return
            }
            data.password = await hashPassword(data.password);
            const serviceProvider : ServiceProvider= await CreateServiceProvider(data);
            const token = signJWTToken(serviceProvider.id,serviceProvider.email, serviceProvider.name,"serviceProvider", tokenExpireTime)
            res.status(201).json({token});
        } catch (error) {
            console.error("Error creating service provider:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
        async login( req: Request, res: Response ) {
            try {
                const { email, password } = req.body;
                // Implement login logic here
                if (!email || !password) {
                    res.status(400).json({ error: "Email and password are required." });
                    return;
                }
                    const serviceProvider: ServiceProvider | null = await login(email, password);
                    if (!serviceProvider) {
                        throw new Error("Invalid email or password");
                    }
                    if( !await isApproved(serviceProvider.id)){
                        res.status(403).json({ error: "Service Provider not approved yet." });
                    }

                    const token = signJWTToken(serviceProvider.id,serviceProvider.email, serviceProvider.name,"serviceProvider", tokenExpireTime)
                    res.status(200).json({  token });
                    return
            } catch (error) {
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
        }

        async postEvent(req: Request, res: Response) {
            try {
                const event:Prisma.EventUncheckedCreateInput  = req.body as  Prisma.EventUncheckedCreateInput;
                if (!event.Name || !event.date || !event.location || !event.serviceProviderId) {
                    console.log(event)
                    res.status(400).json({ error: "Name, date, location, and serviceProviderId are required." });
                    return;
                }
                // Implement event creation logic here
                event.date = new Date(event.date); // Ensure date is a Date object
                const createdEvent = await postEvent(event);
                // For example, you might save the event to the database
                res.status(201).json({ message: "Event created successfully" , event: createdEvent });
            } catch (error) {
                console.error("Error creating event:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
        
        async getEvents(req: CustomRequest, res: Response) {
            try {
                const serviceProviderId: string | undefined = req.userId;
                if (!serviceProviderId) {
                    res.status(400).json({ error: "Service Provider ID is required." });
                    return;
                }
                const events:Event[] = await getAllServiceProviderEvents(Number(serviceProviderId));
                res.status(200).json({ events });
            }catch (error) {
                console.error("Error fetching events:", error);
                res.status(500).json({ error: "Internal Server Error" });
                return 
            }

        }
        
}
