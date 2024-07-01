import { Claim } from "../entities/claim";
import { BaseRepository } from "./baseRepository";

export class ClaimRepository extends BaseRepository {
    constructor(){
        super(Claim)
    }
}