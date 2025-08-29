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
exports.prisma = void 0;
exports.CreateServiceProvider = CreateServiceProvider;
exports.login = login;
exports.postEvent = postEvent;
const client_1 = require("@prisma/client");
const extension_accelerate_1 = require("@prisma/extension-accelerate");
const helper_1 = require("../helper/helper");
exports.prisma = new client_1.PrismaClient().$extends((0, extension_accelerate_1.withAccelerate)());
function CreateServiceProvider(data) {
    return __awaiter(this, void 0, void 0, function* () {
        let serviceProvider = yield exports.prisma.serviceProvider.create({
            data: data,
        });
        return serviceProvider;
    });
}
function login(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const serviceProvider = yield exports.prisma.serviceProvider.findUnique({
            where: { email: email },
        });
        if (serviceProvider && (yield (0, helper_1.comparePassword)(password, serviceProvider.password))) {
            return serviceProvider;
        }
        return null;
    });
}
function postEvent(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let event = yield exports.prisma.event.create({
                data: data,
            });
            return event;
        }
        catch (error) {
            console.error("Error creating event:", error);
            throw error;
        }
    });
}
