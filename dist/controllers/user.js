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
exports.usersController = void 0;
const users_models_1 = require("../modles/users.models");
const helper_1 = require("../helper/helper");
const users_models_2 = require("../modles/users.models");
class usersController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = req.body;
                if (!data.name || !data.email || !data.password) {
                    res.status(400).json({ error: "Name, email, and password are required." });
                    return;
                }
                data.password = yield (0, helper_1.hashPassword)(data.password);
                const user = yield (0, users_models_1.signUp)(data);
                res.status(201).json(user);
            }
            catch (error) {
                console.error("Error creating user:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (!email || !password) {
                    res.status(400).json({ error: "Email and password are required." });
                    return;
                }
                const user = yield (0, users_models_2.login)(email, password);
                if (!user) {
                    throw new Error("Invalid email or password");
                }
                res.status(200).json({ user });
            }
            catch (error) {
                console.log("invalid email or password", error);
                res.status(401).json({ error: "Invalid email or password" });
            }
        });
    }
    joinEvent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId; // Assuming userId is sent in the request body
                const eventId = req.body.eventId; // Assuming eventId is sent in the request body
                if (!eventId || !userId) {
                    res.status(400).json({ error: "Event ID and User ID are required." });
                    return;
                }
                const event = yield (0, users_models_2.joinEvent)(parseInt(eventId), parseInt(userId));
                res.status(200).json({ message: "Successfully joined the event", event });
            }
            catch (error) {
                console.error("Error joining event:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.usersController = usersController;
