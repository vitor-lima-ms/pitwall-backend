/* DTO imports */
import { GetConstructorsDto } from "./dtos/get-constructors.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/enums/controllers-route-path-prefixes.enum";
/* Nest.js imports */
import { Controller, Get, Param } from "@nestjs/common";
/* Service imports */
import { ConstructorsService } from "./constructors.service";
/* ConstructorsController */
@Controller(ControllersRoutePathPrefixesEnum.CONSTRUCTOR)
export class ConstructorsController {
  constructor(private constructorsService: ConstructorsService) {}

  @Get(":year")
  getConstructors(
    @Param("year") year: number,
  ): Promise<GetConstructorsDto> {
    return this.constructorsService.getConstructors(year);
  }
}
