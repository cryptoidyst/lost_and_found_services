import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { ReportRepository } from "../repositories/reportRepository";
import fs from 'fs'
import { ReportService } from "../services/reportService";
import _ from 'lodash'
import { ReportImageRepository } from "../repositories/reportImageRepository";
import { Report } from "../entities/report";
import { Like, getRepository } from "typeorm";

export const getReport: RequestHandler = async (request:any, response) => {  try {
    const reportRepository = getRepository(Report);

    const report = await reportRepository.createQueryBuilder('report')
    .leftJoinAndSelect('report.report_images', 'report_images')
    .leftJoinAndSelect('report.user', 'user')
    .where({id : request.params.id})
    .getOne();
    
    return response.status(200).send(report);
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const getReports: RequestHandler = async (request:any, response) => { 
  try {
    const reportRepository = getRepository(Report);
    const { current_page, limit } = request.query
    const _reportRepository = new ReportRepository()
    const pagination = await _reportRepository.getPagination(current_page, limit)
    
    const filter = {}

    if(request.query.status){
      Object.assign(filter, { status: request.query.status})
    }

    if(request.query.user_id){
      Object.assign(filter, { user_id: request.query.user_id})
    } 
    
    if (request.query.search) {
      Object.assign(filter, { item_name: Like(`%${request.query.search}%`) });
    }
    

    // const _reports = await reportRepository.findAll({ where: {...filter}, ...pagination, order : { updated_at : "DESC" } });
    const report = await reportRepository.createQueryBuilder('report')
      .leftJoinAndSelect('report.report_images', 'report_images')
      .leftJoinAndSelect('report.user', 'user')
      .where(filter)
      .skip(pagination.skip)
      .take(pagination.take)
      .getMany();

    const count = await reportRepository.createQueryBuilder('report')
    .leftJoinAndSelect('report.report_images', 'report_images')
    .leftJoinAndSelect('report.user', 'user')
    .where(filter)
    .getCount()
      
    const result = {
      data: report,
      current_page: current_page ?? 1,
      limit: limit ?? 5,
      total: count
    }
    
    return response.status(200).send(result);
  } catch (err) {
    console.log(err)
    return response.status(500).send(err);
  }
};

export const createReport_bak: RequestHandler = async (request:any, response:any) => {
  try {
    const reportRepository = new ReportRepository()

    const payload = {
      ...request?.body,
    };

    const result = await reportRepository.create(payload)

    const file:any = request?.body?.files;

    // Save file to disk
    fs.writeFile('uploaded_file.jpg', file, {encoding :"base64"}, (err) => {
      if (err) {
        console.error(err);
        return response.status(500).json({ message: 'Error saving file' });
      }
    })
    
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};

export const createReport: RequestHandler = async (request:any, response:any) => {
  try {
    const reportRepository = new ReportRepository()
    const reportImageRepository = new ReportImageRepository()
    const reportService = new ReportService()

    const payload = {
      ...request?.body,
      user_id: parseInt(request.body.user_id),
      report_date: new Date(request.body.report_date).toISOString(),
    };

    const result = await reportRepository.create(payload)

    const files:any = request?.files;
    const updateFileResponse:any = await reportService.uploadFiles(files)
    const reportImages = _.map(updateFileResponse, async (x) => {
      console.log({ image: x, report_id: result.id  })
      await reportImageRepository.create({ image: x, report_id: result.id  })
    })
  
    
    return response.status(200).send(result);
  } catch (err:any) {
    console.log(err)
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};

export const deleteReport: RequestHandler = async (request:any, response) => {  try {
  const reportRepository = new ReportRepository()
  const result = await reportRepository.delete(request.params.id);
  return response.status(200).send(result);
} catch (err) {
  return response.status(500).send(err);
}
};

export const updateReport: RequestHandler = async (request, response) => {
  try {
    const reportRepository = new ReportRepository()

    const payload = {
      ...request?.body,
      report_date: new Date(request.body.report_date).toISOString(),
    };

    const result = await reportRepository.update(payload, { id : request.params.id })

    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};