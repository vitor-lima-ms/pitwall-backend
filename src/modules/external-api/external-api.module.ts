/* Nest.js imports */
import { Global, Module } from "@nestjs/common";
/* Service imports */
import { ExternalApiService } from "./external-api.service";
/* ExternalApiModule */
@Global()
@Module({
  exports: [ExternalApiService],
  providers: [ExternalApiService],
})
export class ExternalApiModule {}
