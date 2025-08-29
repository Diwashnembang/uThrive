import { Router } from "express";
import { ServiceProviderController } from "../controllers/serviceProvider";
import { usersController } from "../controllers/user";
import { adminController } from "../controllers/admin";
import { isAdmin, isAuth, isServiceProvider } from "../middleware/middleware";

const serviceProviderRouter =  Router()
const userRouter = Router();
const adminRouter = Router()
const serviceProviderController = new ServiceProviderController();
const userController = new usersController();
const adminsController = new adminController();

serviceProviderRouter.post("/signup", serviceProviderController.createServiceProvider);
serviceProviderRouter.post("/login", serviceProviderController.login);
serviceProviderRouter.post("/postEvent",isAuth,isServiceProvider, serviceProviderController.postEvent);
serviceProviderRouter.get("/getEvents",isAuth,isServiceProvider, serviceProviderController.getEvents);

userRouter.post("/signup", userController.signUp);
userRouter.post("/login", userController.login);
userRouter.post("/joinEvent",isAuth, userController.joinEvent);
userRouter.post("/leaveEvent",isAuth, userController.unregisterFromEvent);
userRouter.get("/allEvents",isAuth, userController.getEvents);


adminRouter.get("/unapprovedServiceProviders",isAuth,isAdmin, adminsController.getAllunapprovedServiceProviders);
adminRouter.get("/approvedServiceProviders",isAuth,isAdmin, adminsController.getAllapprovedServiceProviders); 
adminRouter.post("/approveServiceProvider",isAuth,isAdmin, adminsController.approveServiceProvider);
adminRouter.post("/login", adminsController.login);

export { serviceProviderRouter, userRouter, adminRouter };