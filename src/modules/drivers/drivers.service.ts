/* DTO imports */
import { GetDriversDto } from "./dtos/get-drivers.dto";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Service imports */
import { ExternalApiService } from "../external-api/external-api.service";
/* DriversService */
@Injectable()
export class DriversService {
  constructor(private externalApiService: ExternalApiService) {}

  async getDrivers(year: number): Promise<GetDriversDto> {
    const response = await fetch(this.externalApiService.getDrivers(year));

    const drivers = (await response.json()) as GetDriversDto;

    return drivers;
  }
}
