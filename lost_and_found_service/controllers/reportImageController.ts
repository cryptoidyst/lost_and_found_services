import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { ReportRepository } from "../repositories/reportRepository";
import fs from 'fs'
import { ReportService } from "../services/reportService";
import _ from 'lodash'
import { ReportImageRepository } from "../repositories/reportImageRepository";

export const getReportImages: RequestHandler = async (request:any, response) => {  try {
    const reportImageRepository = new ReportImageRepository()
    const result = await reportImageRepository.findAll({ where : { report_id : request.query.reportId } })
    return response.status(200).send(result);
  } catch (err) {
    return response.status(500).send(err);
  }
};
