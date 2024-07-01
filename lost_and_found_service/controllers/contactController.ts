import { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { ContactRepository } from "../repositories/contactRepository";
import fs from 'fs'
import _ from 'lodash'
import { getRepository } from "typeorm";
import { Contact } from "../entities/contact";
import { v4 } from 'uuid';

export const getContact: RequestHandler = async (request:any, response) => {  try {
    const contactRepository = new ContactRepository()
    const result = await contactRepository.findOne({ where : { id : request.params.id } })
    return response.status(200).send(result);
  } catch (err) {
    return response.status(500).send(err);
  }
};

export const getContactsUsers: RequestHandler = async (request: any, response) => {
  try {
    const contactRepository = getRepository(Contact);
    const { current_page = 1, limit = 10, user_id } = request.query;

    // Find distinct conversation_no, receiver_id, and sender_id for the given user_id
    const contacts = await contactRepository
      .createQueryBuilder('contact')
      .select('contact.conversation_no', 'conversation_no')
      .addSelect('contact.receiver_id', 'receiver_id')
      .addSelect('contact.sender_id', 'sender_id')
      .leftJoinAndSelect('contact.receiver', 'receiver')
      .leftJoinAndSelect('contact.sender', 'sender')
      .where('contact.sender_id = :user_id', { user_id })
      .orWhere('contact.receiver_id = :user_id', { user_id })
      .groupBy('contact.conversation_no')
      .addGroupBy('contact.receiver_id')
      .addGroupBy('contact.sender_id')
      .getRawMany();

    const result = {
      data: contacts
    };

    return response.status(200).send(result);
  } catch (err) {
    console.error('Error fetching contact users:', err);
    return response.status(500).send({ error: 'Internal server error' });
  }
};

export const getContacts: RequestHandler = async (request:any, response) => {  try {
  console.log("hello")
  const contactRepository = getRepository(Contact)
  const { current_page, limit, conversation_no } = request.query

    const contacts = await contactRepository
      .createQueryBuilder('contact')
      .select('contact')
      .addSelect('contact.receiver_id', 'receiver_id')
      .addSelect('contact.sender_id', 'sender_id')
      .leftJoinAndSelect('contact.receiver', 'receiver')
      .leftJoinAndSelect('contact.sender', 'sender')
      .where('contact.conversation_no = :conversation_no', { conversation_no })
      .getRawMany();
  
  const result = {
    data: contacts,
    current_page: current_page ?? 1,
    limit: limit ?? 10,
    count: 100
  }
  
  return response.status(200).send(result);
} catch (err) {
  console.log("err", err)
  return response.status(500).send(err);
}
};

export const createContact_bak: RequestHandler = async (request:any, response:any) => {
  try {
    const contactRepository = new ContactRepository()

    const payload = {
      ...request?.body,
    };

    const result = await contactRepository.create(payload)

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

export const createContact: RequestHandler = async (request: any, response: any) => {
  try {
    const contactRepository = new ContactRepository();
    const { sender_id, receiver_id, message } = request.body;

    let conversationId = v4()
    let conversation = await contactRepository.findOne({
      where: [
        { sender_id: sender_id, receiver_id: receiver_id },
        { sender_id: receiver_id, receiver_id: sender_id },
      ],
    });

    if(conversation) conversationId = conversation.conversation_no

    const contact = await contactRepository.create({
      conversation_no: conversationId,
      sender_id: sender_id,
      receiver_id: receiver_id,
      message: message,
      sent_date: new Date(),
    });

    return response.status(200).send(contact);
  } catch (err: any) {
    console.log(err);
    const error = err.message ?? err;
    return response.status(500).send(error);
  }
};

export const deleteContact: RequestHandler = async (request:any, response) => {  try {
  const contactRepository = new ContactRepository()
  const result = await contactRepository.delete(request.params.id);
  return response.status(200).send(result);
} catch (err) {
  return response.status(500).send(err);
}
};

export const updateContact: RequestHandler = async (request, response) => {
  try {
    const contactRepository = new ContactRepository()

    const userExist = await contactRepository.findOne({ where : {  id : request.params.id } })
    if(!userExist) throw new Error("user not exist")

    const payload = {
      ...request?.body,
    };

    const result = await contactRepository.update(payload, request.params.id)
    return response.status(200).send(result);
  } catch (err:any) {
    const error = err.message ?? err
    return response.status(500).send(error);
  }
};