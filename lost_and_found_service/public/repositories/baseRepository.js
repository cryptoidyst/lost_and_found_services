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
exports.BaseRepository = void 0;
const typeorm_1 = require("typeorm");
class BaseRepository {
    constructor(model) {
        this.model = model;
    }
    findOne(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const respository = yield (0, typeorm_1.getRepository)(this.model);
            const result = yield respository.findOne(filter);
            return result;
        });
    }
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const result = yield connection.manager.find(this.model);
            return result;
        });
    }
    findAll(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = yield (0, typeorm_1.getRepository)(this.model);
            const result = yield repository.find(filter);
            return result;
        });
    }
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const respository = yield (0, typeorm_1.getRepository)(this.model);
            return yield respository.save(body);
        });
    }
    delete(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            const user = yield connection.manager.delete(this.model, filter);
            return user;
        });
    }
    update(body, filter) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield (0, typeorm_1.getConnection)();
            return yield connection.manager.update(this.model, filter, body);
        });
    }
}
exports.BaseRepository = BaseRepository;
