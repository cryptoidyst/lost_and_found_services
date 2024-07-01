import { BaseRepository } from "./baseRepository";
import { Report } from '../entities/report'
import { ReportImage } from "../entities/reportImage";

export class ReportImageRepository extends BaseRepository {
    constructor(){
        super(ReportImage)
    }
}