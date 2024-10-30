import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";

export class CustomInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler<any>): Observable<any> | Promise<Observable<any>> {

        console.log("This is intercepting the request")
       
        return handler.handle().pipe(
            map((data) => {
                console.log("This is intercepting the response")
                console.log({data})
                return data;
            })
        )
    }
}