"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const user_1 = require("../entities/user");
const baseRepository_1 = require("./baseRepository");
class UserRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(user_1.User);
    }
}
exports.UserRepository = UserRepository;
