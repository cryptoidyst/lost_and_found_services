"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const claimController_1 = require("../controllers/claimController");
const router = express_1.default.Router();
router.get("/claims", claimController_1.getClaims);
router.get("/claim/:id", claimController_1.getClaim);
router.post("/claim", claimController_1.createClaim);
router.delete("/claim/:id", claimController_1.deleteClaim);
router.put("/claim/:id", claimController_1.updateClaim);
exports.default = router;
