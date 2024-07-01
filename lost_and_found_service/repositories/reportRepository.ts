import { BaseRepository } from "./baseRepository";
import { Report } from '../entities/report'

export class ReportRepository extends BaseRepository {
    constructor(){
        super(Report)
    }
}