"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceProviderController = void 0;
const serviceProvider_models_1 = require("../modles/serviceProvider.models");
const helper_1 = require("../helper/helper");
class ServiceProviderController {
    createServiceProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                if (!data.name || !data.email || !data.password) {
                    res.status(400).json({ error: "Name, email, and password are required." });
                    return;
                }
                data.password = yield (0, helper_1.hashPassword)(data.password);
                const serviceProvider = yield (0, serviceProvider_models_1.CreateServiceProvider)(data);
                res.status(201).json(serviceProvider);
            }
            catch (error) {
                console.error("Error creating service provider:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                // Implement login logic here
                if (!email || !password) {
                    res.status(400).json({ error: "Email and password are required." });
                    return;
                }
                const serviceProvider = yield (0, serviceProvider_models_1.login)(email, password);
                if (!serviceProvider) {
                    throw new Error("Invalid email or password");
                }
                res.status(200).json({ serviceProvider });
                return;
            }
            catch (error) {
                console.log("invalid email or password", error);
                res.status(401).json({ error: "Invalid email or password" });
                return;
            }
        });
    }
    postEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const event = req.body;
                if (!event.Name || !event.date || !event.location || !event.serviceProviderId) {
                    console.log(event);
                    res.status(400).json({ error: "Name, date, location, and serviceProviderId are required." });
                    return;
                }
                // Implement event creation logic here
                event.date = new Date(event.date); // Ensure date is a Date object
                const createdEvent = yield (0, serviceProvider_models_1.postEvent)(event);
                // For example, you might save the event to the database
                res.status(201).json({ message: "Event created successfully", event: createdEvent });
            }
            catch (error) {
                console.error("Error creating event:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.ServiceProviderController = ServiceProviderController;
