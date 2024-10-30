import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import {CustomInterceptor} from "./custom.interceptors"

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    AppService,
    {
    provide: APP_INTERCEPTOR,
    useClass: CustomInterceptor
  },
],
})
export class AppModule {}
