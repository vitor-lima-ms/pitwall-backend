/* DTO imports */
import { GetCircuitsDto } from "./dtos/get-circuits.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import { Controller, Get } from "@nestjs/common";
/* Service imports */
import { CircuitsService } from "./circuits.service";
/* CircuitsController */
@Controller(ControllersRoutePathPrefixesEnum.CIRCUIT)
export class CircuitsController {
  constructor(private circuitsService: CircuitsService) {}

  @Get()
  getCircuits(): Promise<GetCircuitsDto> {
    return this.circuitsService.getCircuits();
  }
}
