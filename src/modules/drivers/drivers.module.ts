/* Controller imports */
import { DriversController } from "./drivers.controller";
/* Nest.js imports */
import { Module } from "@nestjs/common";
/* Service imports */
import { DriversService } from "./drivers.service";
/* DriversModule */
@Module({
  controllers: [DriversController],
  providers: [DriversService],
})
export class DriversModule {}
