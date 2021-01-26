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
exports.sendForgotPasswordEmail = void 0;
const runtypes_1 = require("runtypes");
const SendForgotPasswordEmailPayload = runtypes_1.Record({
    email: runtypes_1.String,
    token: runtypes_1.String
});
const sendForgotPasswordEmail = (payload, helpers) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, token } = SendForgotPasswordEmailPayload.check(payload);
    console.log('this is a task with values', email, token);
});
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
