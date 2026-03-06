/* Filter imports */
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
/* Interceptor imports */
import { TransformInterceptor } from "./common/interceptors/transform.interceptor";
/* Module imports */
import { DriversModule } from "./modules/drivers/drivers.module";
import { ExternalApiModule } from "./modules/external-api/external-api.module";
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
    DriversModule,
    ExternalApiModule,
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
