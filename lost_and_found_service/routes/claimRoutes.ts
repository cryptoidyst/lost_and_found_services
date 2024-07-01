import express from "express";
import { createClaim, deleteClaim, getClaim, getClaims, updateClaim } from "../controllers/claimController";

const router = express.Router();

router.get("/claims", getClaims);
router.get("/claim/:id", getClaim);
router.post("/claim", createClaim);
router.delete("/claim/:id", deleteClaim);
router.put("/claim/:id", updateClaim);


export default router;
