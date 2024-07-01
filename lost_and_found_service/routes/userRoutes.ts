import express from "express";
import { createUser, deleteUser, getUser, getUsers, login, udpateUser, updateUser } from "../controllers/userController";
import multer from "multer";

const router = express.Router();

router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.post("/update-user/:id", multer().any(), updateUser);
router.post("/login", login);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", udpateUser);


export default router;
