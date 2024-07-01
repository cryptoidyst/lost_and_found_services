"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimRepository = void 0;
const claim_1 = require("../entities/claim");
const baseRepository_1 = require("./baseRepository");
class ClaimRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(claim_1.Claim);
    }
}
exports.ClaimRepository = ClaimRepository;
