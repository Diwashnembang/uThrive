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
exports.signUp = signUp;
exports.login = login;
exports.joinEvent = joinEvent;
const serviceProvider_models_1 = require("./serviceProvider.models");
const helper_1 = require("../helper/helper");
function signUp(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield serviceProvider_models_1.prisma.user.create({
                data: data,
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield serviceProvider_models_1.prisma.user.findUnique({
            where: { email: email },
        });
        if (user && (yield (0, helper_1.comparePassword)(password, user.password))) {
            return user;
        }
        return null;
    });
}
function joinEvent(eventId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        // You should implement the actual event creation logic here.
        try {
            const event = yield serviceProvider_models_1.prisma.event.update({
                where: { id: eventId },
                data: {
                    ConfirmedUsers: {
                        connect: { id: userId }
                    }
                }
            });
            return event;
        }
        catch (error) {
            console.error("Error joining event:", error);
            throw error;
        }
    });
}
