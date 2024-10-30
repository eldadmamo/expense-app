import {Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe} from "@nestjs/common"
import {data, ReportType} from "src/data"
import {v4 as uuid} from "uuid";
import { ReportService } from "./report.service";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "src/dtos/report.dto";

@Controller('report/:type')
export class ReportController {
  constructor(
    private readonly reportSerivce: ReportService
  ){}

  @Get()
  getAllIncomeReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string 
  ): ReportResponseDto[]{
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE; 
    return this.reportSerivce.getAllIncomeReports(reportType);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ):ReportResponseDto {
    console.log(id, typeof id);
    const reportType = 
    type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportSerivce.getIncomeReportById(reportType, id);
  }

  @Post() 
  postIncome(
    @Body() {amount, source}: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ):ReportResponseDto{
    const reportType = 
    type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportSerivce.postIncome(reportType, {amount, source});
  }

  @Put(':id')
  putIncome(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', new ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto 
  ):ReportResponseDto{
    const reportType = 
    type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportSerivce.putIncome(reportType, id, body)
  }


  @HttpCode(204)
  @Delete(":id")
    deleteIncome(
      @Param('id') id: string,
    ){
      return this.reportSerivce.deleteIncome(id);
  }
}


