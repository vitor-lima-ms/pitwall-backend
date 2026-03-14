/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* ExternalApiService */
@Injectable()
export class ExternalApiService {
  private readonly baseUrl = "https://api.jolpi.ca/ergast/f1";

  getDrivers(year: number, offset?: number): string {
    if (offset) {
      return `${this.baseUrl}/${year}/drivers/?offset=${offset}`;
    }

    return `${this.baseUrl}/${year}/drivers`;
  }
}
