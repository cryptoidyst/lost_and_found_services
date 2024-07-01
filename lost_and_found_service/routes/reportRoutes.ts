import express from "express";
import { createReport, deleteReport, getReport, getReports, updateReport } from "../controllers/reportController";
import multer from 'multer';
import { getReportImages } from "../controllers/reportImageController";

const router = express.Router();

router.get("/reports", getReports);
router.get("/report/:id", getReport);
router.post("/report", multer().any(), createReport);
router.delete("/report/:id", deleteReport);
router.put("/report/:id", updateReport);
router.get("/report-image/:reportId", getReportImages);



export default router;
