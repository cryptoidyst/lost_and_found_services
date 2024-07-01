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
exports.updateReport = exports.deleteReport = exports.createReport = exports.getReports = exports.getReport = void 0;
const reportRepository_1 = require("../repositories/reportRepository");
const getReport = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportRepository = new reportRepository_1.ReportRepository();
        const result = yield reportRepository.findOne({ where: { id: request.params.id } });
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getReport = getReport;
const getReports = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportRepository = new reportRepository_1.ReportRepository();
        const result = yield reportRepository.find();
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.getReports = getReports;
const createReport = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reportRepository = new reportRepository_1.ReportRepository();
        const userExist = yield reportRepository.findOne({ where: { username: request.body.username, email: request.body.email } });
        if (userExist)
            throw new Error("user already exist");
        const payload = Object.assign({}, request === null || request === void 0 ? void 0 : request.body);
        const result = yield reportRepository.create(payload);
        return response.status(200).send(result);
    }
    catch (err) {
        const error = (_a = err.message) !== null && _a !== void 0 ? _a : err;
        return response.status(500).send(error);
    }
});
exports.createReport = createReport;
const deleteReport = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reportRepository = new reportRepository_1.ReportRepository();
        const result = yield reportRepository.delete(request.params.id);
        return response.status(200).send(result);
    }
    catch (err) {
        return response.status(500).send(err);
    }
});
exports.deleteReport = deleteReport;
const updateReport = (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reportRepository = new reportRepository_1.ReportRepository();
        const userExist = yield reportRepository.findOne({ where: { id: request.params.id } });
        if (!userExist)
            throw new Error("user not exist");
        const payload = Object.assign({}, request === null || request === void 0 ? void 0 : request.body);
        const result = yield reportRepository.update(payload, request.params.id);
        return response.status(200).send(result);
    }
    catch (err) {
        const error = (_b = err.message) !== null && _b !== void 0 ? _b : err;
        return response.status(500).send(error);
    }
});
exports.updateReport = updateReport;
