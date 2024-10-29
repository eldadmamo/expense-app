import {Controller, Delete, Get, Post, Put} from "@nestjs/common"

@Controller('report/income')
export class AppController {
  @Get()
  getAllIncomeReports(){
    return []
  }

  @Get(':id')
  getIncomeReportById(){
    return {"hello":"hi"}
  }

  @Post() 
  postIncome(){
    return ["POST"]
  }

  @Put(':id')
  putIncome(){
    return ["Put"]
  }

  @Delete(":id")
    deleteIncome(){
      return ["Delete"]
  }
}


