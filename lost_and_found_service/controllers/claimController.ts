import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { ClaimRepository } from "../repositories/claimRepository";
import { getRepository } from "typeorm";
import { Claim } from "../entities/claim";
import { ReportRepository } from "../repositories/reportRepository";
import { EmailService } from "../services/emailService";
import { UserRepository } from "../repositories/userRepository";

export const getClaim: RequestHandler = async (request:any, response) => {  try {
    const claimRepository = new ClaimRepository()
    const result = await claimRepository.findOne({ where : { id : request.params.id } })
    return response.status(200).send(result);
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const getClaims: RequestHandler = async (request:any, response) => {  try {
  const claimRepository = getRepository(Claim);

  const filter = {}
  if(request.query.claimer_id){
    Object.assign(filter,  { claimer_id : request.query.claimer_id })
  }

  if(request.query.report_id){
    Object.assign(filter,  { report_id : request.query.report_id })
  }

  const claims = await claimRepository.createQueryBuilder('claim')
    .leftJoinAndSelect('claim.report', 'report')
    .leftJoinAndSelect('report.reportImages', 'reportImage')
    .leftJoinAndSelect('claim.user', 'user')
    .where(filter)
    .getMany();
  return response.status(200).send(claims);
} catch (err) {
  return response.status(500).send(err);
}
};

export const createClaim: RequestHandler = async (request, response) => {
  try {
    const claimRepository = new ClaimRepository()
    const reportRepository = new ReportRepository()
    const emailServices = new EmailService()
    const userRepository = new UserRepository()
    // update report status
    const payload:any = {
      ...request?.body,
    };

    const existingClaim = await claimRepository.findOne({
      where: {
        claimer_id: payload.claimer_id,
        report_id: payload.report_id,
      },
    });

    if (existingClaim) {
      return response.status(400).send("Claim already exists for the given report and claimer.");
    }


    // await reportRepository.update({ status: "claimed" }, { id : request.body.report_id })
    const result = await claimRepository.create(payload)

    const user = await userRepository.findOne({ where : { id: payload.claimer_id } })
    console.log(user)

    emailServices.sendEmail("Owner might be found", `${user.full_name} might find her/his lost item that you reported`)
    return response.status(200).send("result");
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};

export const deleteClaim: RequestHandler = async (request:any, response) => {  try {
  const claimRepository = new ClaimRepository()
  const result = await claimRepository.delete(request.params.id);
  return response.status(200).send(result);
} catch (err) {
  return response.status(500).send(err);
}
};

export const updateClaim: RequestHandler = async (request, response) => {
  try {
    const claimRepository = new ClaimRepository()
    const reportRepository = new ReportRepository()
    // update report status when it's claimed
    const payload = {
      ...request?.body,
    };

    const result = await claimRepository.update(payload, { id: request.params.id})

    if(payload.status == 'claimed') await reportRepository.update({ status : 'claimed' },  { id : payload.report_id })
    
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};