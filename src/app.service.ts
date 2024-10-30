import { Injectable } from "@nestjs/common";
import { ReportType, data } from "./data";
import {v4 as uuid} from "uuid";
import {ReportResponseDto} from "./dtos/report.dto"

interface Report {
  amount: number, 
  source: string
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllIncomeReports(type: ReportType):  ReportResponseDto[]{
    return data.report
    .filter((report) => report.type === type)
    .map((report) => new ReportResponseDto(report))
  }
  getIncomeReportById(type: ReportType, id: string):ReportResponseDto{
    const report =  data.report
    .filter((report) => report.type === type)
    .find((report) => report.id === id);

    if(!report) return;

    return new ReportResponseDto(report);
  }
  postIncome(type: ReportType, {amount, source}: Report):ReportResponseDto{
    const newReport = {
      id:uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    }
    data.report.push(newReport)
    return new ReportResponseDto(newReport);
  }
  putIncome(type:ReportType,id: string, body: UpdateReport): ReportResponseDto{
    const reporting = data.report.
    filter((report) => report.type === type)
    .find((report) => report.id === id);

    if(!reporting) return ;

    const reportIndex = data.report
    .findIndex((report) => report.id === id);

    data.report[reportIndex] ={
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }
    return new ReportResponseDto(data.report[reportIndex]);
  }
  deleteIncome(id:string){
    const reportIndex = data.report
    .findIndex((report) => report.id === id);

    if(reportIndex === -1) return ;

    data.report.splice(reportIndex,1);

    return;
  }
}