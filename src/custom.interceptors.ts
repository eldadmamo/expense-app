import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { ReportResponseDto } from "./dtos/report.dto";

export class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        console.log("This is intercepting the request")
       
        return handler.handle().pipe(
            map((data) => {
                const response = {
                    ...data,
                    createdAt: data.created_at
                }
                delete response.updated_at
                delete response.created_at
                return response;
            })
        )
    }
}