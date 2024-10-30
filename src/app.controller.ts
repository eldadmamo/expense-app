import {Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe} from "@nestjs/common"
import {data, ReportType} from "src/data"
import {v4 as uuid} from "uuid";
import { AppService } from "./app.service";
import { CreateReportDto, ReportResponseDto, UpdateReportDto } from "./dtos/report.dto";

@Controller('report/:type')
export class AppController {

  constructor(
    private readonly appSerivce: AppService
  ){}

  @Get()
  getAllIncomeReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string 
  ): ReportResponseDto[]{
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE; 
    return this.appSerivce.getAllIncomeReports(reportType);
  }

  @Get(':id')
  getIncomeReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ):ReportResponseDto {
    console.log(id, typeof id);
    const reportType = 
    type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appSerivce.getIncomeReportById(reportType, id);
  }

  @Post() 
  postIncome(
    @Body() {amount, source}: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: string
  ):ReportResponseDto{
    const reportType = 
    type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appSerivce.postIncome(reportType, {amount, source});
  }

  @Put(':id')
  putIncome(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', new ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto 
  ):ReportResponseDto{
    const reportType = 
    type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appSerivce.putIncome(reportType, id, body)
  }


  @HttpCode(204)
  @Delete(":id")
    deleteIncome(
      @Param('id') id: string,
    ){
      return this.appSerivce.deleteIncome(id);
  }
}


