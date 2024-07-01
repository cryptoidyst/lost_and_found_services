import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { UserRepository } from "../repositories/userRepository";
import jwt from 'jsonwebtoken'
import { Not, getRepository } from "typeorm";
import { User } from "../entities/user";
import { isNull } from "lodash";
import { EmailService } from "../services/emailService";
import { ReportService } from "../services/reportService";

export const getUser: RequestHandler = async (request:any, response) => {  try {
    const userRepository = new UserRepository()
    const result = await userRepository.findOne({ where : { id : request.params.id } })
    return response.status(200).send(result);
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const getUsers: RequestHandler = async (request:any, response) => {  try {
  const userRepository = new UserRepository()

  const filter = {}
  const result = await userRepository.findAll(filter);

  console.log(filter)

  return response.status(200).send(result);
} catch (err) {
  return response.status(500).send(err);
}
};

export const createUser: RequestHandler = async (request, response) => {
  try {
    const userRepository = new UserRepository()
    const emailService = new EmailService()

    const userExist = await userRepository.findOne({ where : {  username : request.body.username, email : request.body.email  } })
    if(userExist) throw new Error("user already exist")

    const passwordHash = await bcrypt.hash(request.body.password, 10);
    const payload = {
      ...request?.body,
      password: passwordHash
    };

   
    const result = await userRepository.create(payload)
    emailService.sendEmail("Successfully Registered", "You have successfully registered an account in Lost and Found App")
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};

export const deleteUser: RequestHandler = async (request:any, response) => {  try {
  const userRepository = new UserRepository()
  const result = await userRepository.delete(request.params.id);
  return response.status(200).send(result);
} catch (err) {
  return response.status(500).send(err);
}
};

export const udpateUser: RequestHandler = async (request, response) => {
  try {
    const userRepository = new UserRepository()

    const userExist = await userRepository.findOne({ where : {  id : request.params.id } })
    if(!userExist) throw new Error("user not exist")

    const payload = {
      ...request?.body,
    };

    const result = await userRepository.update(payload, request.params.id)
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};

export const updateUser: RequestHandler = async (request, response) => {
  try {
    const userRepository = new UserRepository()
    const reportService = new ReportService()

    const payload = {
      ...request?.body,
    };

    console.log(request)
    const files:any = request?.files;

    console.log("files", files)

    if(files){
      const updateFileResponse:any = await reportService.uploadFiles(files)
      Object.assign(payload, { avatar_url: updateFileResponse[0] })
    }

    const result = await userRepository.update(payload, request.params.id)
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};


export const login: RequestHandler = async (request, response) => {
  try {
    console.log("heloo")
    const userRepository = new UserRepository()
    const { username, password } = request.body;

    const user = await userRepository.findOne({ where: [{ username }, { email: username }] });

    if (!user) return response.status(401).json({ message: "Authentication failed" });


    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }


    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, '__2H8-I81e3noxyppQuibiZro7NsvT1JD9TSU0WFCOxs2MIdFeVh2kDIk8oU86DX', { expiresIn: '7d' }); // Change 'your-secret-key' to your actual secret key

    return response.status(200).send({ token, user })
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const getUserByUsername: RequestHandler = async (request:any, response) => {  try {
  const userRepository = new UserRepository()
 
  const result = await userRepository.findAll({ where : { username : request.query.username } });

  return response.status(200).send(result);
} catch (err) {
  return response.status(500).send(err);
}
};