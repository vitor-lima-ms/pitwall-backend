/* Controller imports */
import { CircuitsController } from "./circuits.controller";
/* Nest.js imports */
import { Module } from "@nestjs/common";
/* Service imports */
import { CircuitsService } from "./circuits.service";
/* CircuitsModule */
@Module({
  controllers: [CircuitsController],
  providers: [CircuitsService],
})
export class CircuitsModule {}
