/* DTO imports */
import { GetDriversDto } from "./dtos/get-drivers.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import { Controller, Get, Param } from "@nestjs/common";
/* Service imports */
import { DriversService } from "./drivers.service";
/* DriversController */
@Controller(ControllersRoutePathPrefixesEnum.DRIVER)
export class DriversController {
  constructor(private driversService: DriversService) {}

  @Get(":year")
  getDrivers(@Param("year") year: number): Promise<GetDriversDto> {
    return this.driversService.getDrivers(year);
  }
}
