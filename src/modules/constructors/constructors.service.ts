/* DTO imports */
import { GetConstructorsDto } from "./dtos/get-constructors.dto";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Service imports */
import { ExternalApiService } from "../external-api/external-api.service";
/* ConstructorsService */
@Injectable()
export class ConstructorsService {
  constructor(private externalApiService: ExternalApiService) {}

  async getConstructors(year: number): Promise<GetConstructorsDto> {
    const response = await fetch(
      this.externalApiService.getConstructors(year),
    );

    const constructors = (await response.json()) as GetConstructorsDto;

    if (Number(constructors.MRData.total) > Number(constructors.MRData.limit)) {
      const loopRange = parseInt(
        String(
          Number(constructors.MRData.total) /
            Number(constructors.MRData.limit),
        ),
      );

      for (let i = 1; i <= loopRange; i++) {
        const response = await fetch(
          this.externalApiService.getConstructors(year, 30 * i),
        );

        const offsetConstructors =
          (await response.json()) as GetConstructorsDto;

        offsetConstructors.MRData.ConstructorTable.Constructors.forEach(
          (value) =>
            constructors.MRData.ConstructorTable.Constructors.push(value),
        );
      }
    }

    return constructors;
  }
}
