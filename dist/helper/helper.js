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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExpireTime = exports.day = exports.hour = exports.min = exports.sec = void 0;
exports.signJWTToken = signJWTToken;
exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.sec = 1 * 1000;
exports.min = 60 * exports.sec;
exports.hour = 60 * exports.min;
exports.day = 24 * exports.hour;
exports.tokenExpireTime = 15 * exports.min;
function signJWTToken(email, userId, time) {
    let token = jsonwebtoken_1.default.sign({
        exp: Math.floor(Date.now() + (time)),
        sub: email,
        iat: Math.floor(Date.now()),
        userId: userId
    }, process.env.JWT_SECRET);
    return token;
}
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        let hashPassword;
        const salt = 10;
        try {
            hashPassword = yield bcrypt_1.default.hash(password, salt);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return hashPassword;
    });
}
function comparePassword(password, hash) {
    return __awaiter(this, void 0, void 0, function* () {
        let result;
        try {
            result = yield bcrypt_1.default.compare(password, hash);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
        return result;
    });
}
