"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controllers/reportController");
const router = express_1.default.Router();
router.get("/reports", reportController_1.getReports);
router.get("/report/:id", reportController_1.getReport);
router.post("/report", reportController_1.createReport);
router.delete("/report/:id", reportController_1.deleteReport);
router.put("/report/:id", reportController_1.updateReport);
exports.default = router;
