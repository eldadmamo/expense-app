import {Controller, Delete, Get, Post, Put, Param} from "@nestjs/common"

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(
    @Param('type') type: string
  ){
    console.log(type)
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


