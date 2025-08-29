
import { Request,Response } from "express";
import { Admin, ServiceProvider } from "@prisma/client";
import { getAllunapprovedServiceProviders, login,getAllapprovedServiceProviders  } from "../modles/admin.models";
import { signJWTToken, tokenExpireTime } from "../helper/helper";
import { approveServiceProvider } from "../modles/admin.models";
export class adminController {

   async approveServiceProvider(req: any, res: any) {
       try {
           const serviceProviderId = req.body.providerId;
           if (!serviceProviderId) {
               res.status(400).json({ error: "Service Provider ID is required." });
               return;
           }
           console.log("Approving service provider with ID:", serviceProviderId);
           const updatedServiceProvider = await approveServiceProvider(serviceProviderId)
           if (!updatedServiceProvider) {
               res.status(404).json({ error: "Service Provider not found." });
                return;
           }
           res.status(200).json({ message: "Service Provider approved successfully", serviceProvider: updatedServiceProvider });
       } catch (error) {
           console.error("Error approving service provider:", error);
           res.status(500).json({ error: "Internal Server Error" });
       }
   } 

    async getAllunapprovedServiceProviders(req : Request , res : Response){ 
         try {
              const unApprovedServiceProviders : ServiceProvider[] = await getAllunapprovedServiceProviders();
              res.status(200).json({ unApprovedServiceProviders });
         } catch (error) {
              console.error("Error fetching unapproved service providers:", error);
              res.status(500).json({ error: "Internal Server Error" });
         }
    }

    async getAllapprovedServiceProviders(req: Request, res: Response) { 
        try {
            const approvedServiceProviders: ServiceProvider[] = await getAllapprovedServiceProviders();
            res.status(200).json({ approvedServiceProviders });
        } catch (error) {
            console.error("Error fetching approved service providers:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async login(req: Request, res: Response) {
        // Admin login logic here
        let { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Email and password are required." });
            return;
        }
        let admin: Admin | null = await login(email, password);
        if (!admin) {
            res.status(401).json({ error: "Invalid email or password" });
            return;
        }
        const token = signJWTToken(admin.id, admin.email, admin.name, "admin", tokenExpireTime);
        res.status(200).json({ token });
    }
}