"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const reportRoutes_1 = __importDefault(require("./reportRoutes"));
const claimRoutes_1 = __importDefault(require("./claimRoutes"));
const router = express_1.default.Router();
router.use(userRoutes_1.default);
router.use(reportRoutes_1.default);
router.use(claimRoutes_1.default);
exports.default = router;
