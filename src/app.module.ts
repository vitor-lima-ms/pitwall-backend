/* Filter imports */
import { HttpExceptionFilter } from "./nestjs-common-non-module/exceptions/filters/http-exception.filter";
/* Interceptor imports */
import { TransformInterceptor } from "./nestjs-common-non-module/interceptors/transform.interceptor";
/* Module imports */
import { DbUtilsModule } from "./modules/nestjs-common-module/utils/db/db-utils.module";
import { MessagesUtilsModule } from "./modules/nestjs-common-module/utils/messages/messages-utils.module";
import { NumberUtilsModule } from "./modules/nestjs-common-module/utils/number/number-utils.module";
import { StringUtilsModule } from "./modules/nestjs-common-module/utils/string/string-utils.module";
/* Nest.js imports */
import { APP_FILTER } from "@nestjs/core";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
/* App module */
@Module({
  imports: [
    /* Config module */
    ConfigModule.forRoot({
      cache: true,
      envFilePath: [".env"],
    }),
    DbUtilsModule,
    MessagesUtilsModule,
    NumberUtilsModule,
    StringUtilsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
