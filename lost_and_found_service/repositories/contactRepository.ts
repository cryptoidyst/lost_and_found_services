import { Claim } from "../entities/claim";
import { Contact } from "../entities/contact";
import { BaseRepository } from "./baseRepository";

export class ContactRepository extends BaseRepository {
    constructor(){
        super(Contact)
    }
}