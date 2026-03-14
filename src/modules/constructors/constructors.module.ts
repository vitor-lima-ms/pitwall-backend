/* Controller imports */
import { ConstructorsController } from "./constructors.controller";
/* Nest.js imports */
import { Module } from "@nestjs/common";
/* Service imports */
import { ConstructorsService } from "./constructors.service";
/* ConstructorsModule */
@Module({
  controllers: [ConstructorsController],
  providers: [ConstructorsService],
})
export class ConstructorsModule {}
