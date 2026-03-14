/* DTO imports */
import { GetCircuitsDto } from "./dtos/get-circuits.dto";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* Service imports */
import { ExternalApiService } from "../external-api/external-api.service";
/* CircuitsService */
@Injectable()
export class CircuitsService {
  constructor(private externalApiService: ExternalApiService) {}

  async getCircuits(): Promise<GetCircuitsDto> {
    const response = await fetch(this.externalApiService.getCircuits());

    const circuits = (await response.json()) as GetCircuitsDto;

    if (Number(circuits.MRData.total) > Number(circuits.MRData.limit)) {
      const loopRange = parseInt(
        String(Number(circuits.MRData.total) / Number(circuits.MRData.limit)),
      );

      for (let i = 1; i <= loopRange; i++) {
        const response = await fetch(
          this.externalApiService.getCircuits(30 * i),
        );

        const offsetCircuits = (await response.json()) as GetCircuitsDto;

        offsetCircuits.MRData.CircuitTable.Circuits.forEach((value) =>
          circuits.MRData.CircuitTable.Circuits.push(value),
        );
      }
    }

    return circuits;
  }
}
