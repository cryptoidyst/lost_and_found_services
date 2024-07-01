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
exports.getUserByUsername = exports.login = exports.udpateUser = exports.deleteUser = exports.createUser = exports.getUsers = exports.getUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository_1 = require("../repositories/userRepository");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = new userRepository_1.UserRepository();
        const result = yield userRepository.findOne({ where: { id: request.params.id } });
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getUser = getUser;
const getUsers = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = new userRepository_1.UserRepository();
        const filter = {};
        const result = yield userRepository.findAll(filter);
        console.log(filter);
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getUsers = getUsers;
const createUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userRepository = new userRepository_1.UserRepository();
        const userExist = yield userRepository.findOne({ where: { username: request.body.username, email: request.body.email } });
        if (userExist)
            throw new Error("user already exist");
        const passwordHash = yield bcrypt_1.default.hash(request.body.password, 10);
        const payload = Object.assign(Object.assign({}, request === null || request === void 0 ? void 0 : request.body), { password: passwordHash });
        const result = yield userRepository.create(payload);
        return response.status(200).send(result);
    }
    catch (err) {
        const error = (_a = err.message) !== null && _a !== void 0 ? _a : err;
        return response.status(500).send(error);
    }
});
exports.createUser = createUser;
const deleteUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = new userRepository_1.UserRepository();
        const result = yield userRepository.delete(request.params.id);
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.deleteUser = deleteUser;
const udpateUser = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const userRepository = new userRepository_1.UserRepository();
        const userExist = yield userRepository.findOne({ where: { id: request.params.id } });
        if (!userExist)
            throw new Error("user not exist");
        const payload = Object.assign({}, request === null || request === void 0 ? void 0 : request.body);
        const result = yield userRepository.update(payload, request.params.id);
        return response.status(200).send(result);
    }
    catch (err) {
        const error = (_b = err.message) !== null && _b !== void 0 ? _b : err;
        return response.status(500).send(error);
    }
});
exports.udpateUser = udpateUser;
const login = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = new userRepository_1.UserRepository();
        const { username, password } = request.body;
        const user = yield userRepository.findOne({ where: [{ username }, { email: username }] });
        if (!user)
            return response.status(401).json({ message: "Authentication failed" });
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Incorrect password");
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, role: user.role }, '__2H8-I81e3noxyppQuibiZro7NsvT1JD9TSU0WFCOxs2MIdFeVh2kDIk8oU86DX', { expiresIn: '7d' }); // Change 'your-secret-key' to your actual secret key
        return response.status(200).send(token);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.login = login;
const getUserByUsername = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRepository = new userRepository_1.UserRepository();
        const result = yield userRepository.findAll({ where: { username: request.query.username } });
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getUserByUsername = getUserByUsername;
