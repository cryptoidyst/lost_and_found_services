import { object } from "joi";
import { getConnection } from "typeorm";
import { User } from "../entities/user";
import { BaseRepository } from "./baseRepository";

export class UserRepository extends BaseRepository {
    constructor(){
        super(User)
    }
}