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

    if (Number(drivers.MRData.total) > Number(drivers.MRData.limit)) {
      const loopRange = parseInt(
        String(Number(drivers.MRData.total) / Number(drivers.MRData.limit)),
      );

      for (let i = 1; i <= loopRange; i++) {
        const response = await fetch(
          this.externalApiService.getDrivers(year, 30 * i),
        );

        const offsetDrivers = (await response.json()) as GetDriversDto;

        offsetDrivers.MRData.DriverTable.Drivers.forEach((value) =>
          drivers.MRData.DriverTable.Drivers.push(value),
        );
      }
    }

    return drivers;
  }
}
