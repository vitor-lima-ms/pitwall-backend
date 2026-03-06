/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* ExternalApiService */
@Injectable()
export class ExternalApiService {
  private readonly baseUrl = "https://api.jolpi.ca/ergast/f1";

  getDrivers(year: number): string {
    return `${this.baseUrl}/${year}/drivers`;
  }
}
