"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
router.get("/users", userController_1.getUsers);
router.get("/user/:id", userController_1.getUser);
router.post("/user", userController_1.createUser);
router.post("/login", userController_1.login);
router.delete("/user/:id", userController_1.deleteUser);
router.put("/user/:id", userController_1.udpateUser);
exports.default = router;
