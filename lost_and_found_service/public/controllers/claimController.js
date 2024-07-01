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
exports.updateClaim = exports.deleteClaim = exports.createClaim = exports.getClaims = exports.getClaim = void 0;
const claimRepository_1 = require("../repositories/claimRepository");
const getClaim = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claimRepository = new claimRepository_1.ClaimRepository();
        const result = yield claimRepository.findOne({ where: { id: request.params.id } });
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getClaim = getClaim;
const getClaims = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claimRepository = new claimRepository_1.ClaimRepository();
        const result = yield claimRepository.find();
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getClaims = getClaims;
const createClaim = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const claimRepository = new claimRepository_1.ClaimRepository();
        const userExist = yield claimRepository.findOne({ where: { username: request.body.username, email: request.body.email } });
        if (userExist)
            throw new Error("user already exist");
        const payload = Object.assign({}, request === null || request === void 0 ? void 0 : request.body);
        const result = yield claimRepository.create(payload);
        return response.status(200).send(result);
    }
    catch (err) {
        const error = (_a = err.message) !== null && _a !== void 0 ? _a : err;
        return response.status(500).send(error);
    }
});
exports.createClaim = createClaim;
const deleteClaim = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claimRepository = new claimRepository_1.ClaimRepository();
        const result = yield claimRepository.delete(request.params.id);
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.deleteClaim = deleteClaim;
const updateClaim = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const claimRepository = new claimRepository_1.ClaimRepository();
        const userExist = yield claimRepository.findOne({ where: { id: request.params.id } });
        if (!userExist)
            throw new Error("user not exist");
        const payload = Object.assign({}, request === null || request === void 0 ? void 0 : request.body);
        const result = yield claimRepository.update(payload, request.params.id);
        return response.status(200).send(result);
    }
    catch (err) {
        const error = (_b = err.message) !== null && _b !== void 0 ? _b : err;
        return response.status(500).send(error);
    }
});
exports.updateClaim = updateClaim;
