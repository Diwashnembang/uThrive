import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { isApproved } from '../modles/serviceProvider.models';
// Example middleware
export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Call next() to continue to the next middleware or route handler
};
export interface CustomRequest extends Request {
  user?: string;
  userId?: string;
  role? : string
}
export function isAuth(req: CustomRequest, res: Response, next: NextFunction) {
  let token: string = req.headers["authorization"] as string;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
    return;
  }

  if (token.split(" ")[0] !== "Bearer") {
    console.log("No Bearer token");
    res.status(401).send("Unauthorized no Bearer");
    return;
  }

  try {
    jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET as string,
      (err, decoded) => {
        if (err) {
          res.status(401).send("Unauthorized");
          return;
        }
        if (!decoded || typeof decoded === "string") {
          res.status(401).send("Unauthorized");
          return;
        }
        if (Date.now() > decoded.exp!) {
          res.status(401).send("Unauthorized session expired");
          return;
        }
        req.user = decoded.sub;
        req.userId = decoded.id;
        req.role = decoded.role;
        console.log("Authenticated user:", req.user, "with role:", req.role, "and ID:", req.userId);  ;
        next();
      }
    );
  } catch (err) {
    res.status(401).send("Unauthorized");
    return;
  }
}

export const isAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.role !== "admin") {
    console.log("Forbidden: Admins only");
    res.status(403).send("Forbidden: Admins only");
    return;
  }
  console.log("Admin access granted");
  next();
}

export const isServiceProvider = async (req: CustomRequest, res: Response, next: NextFunction) => {
  if (req.role !== "serviceProvider") {
    console.log("Forbidden: Service Providers only");
    res.status(403).send("Forbidden: Service Providers only");
    return;
  }
  if(!req.userId){
    console.log("Forbidden: Service Provider ID missing");
    res.status(403).send("Forbidden: Service Provider ID missing");
    return;
  }
  const result : boolean = await isApproved(Number(req.userId))
  if(!result){
    console.log("Forbidden: Service Provider not approved");
    res.status(403).send("Forbidden: Service Provider not approved");
    return;
  }
  console.log("Service Provider access granted");
  next();
}


