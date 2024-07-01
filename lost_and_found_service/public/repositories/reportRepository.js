"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const report_1 = require("../entities/report");
class ReportRepository extends baseRepository_1.BaseRepository {
    constructor() {
        super(report_1.Report);
    }
}
exports.ReportRepository = ReportRepository;
