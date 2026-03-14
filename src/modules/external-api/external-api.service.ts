/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* ExternalApiService */
@Injectable()
export class ExternalApiService {
  private readonly baseUrl = "https://api.jolpi.ca/ergast/f1";

  getCircuits(offset?: number): string {
    if (offset) {
      return `${this.baseUrl}/circuits/?offset=${offset}`;
    }

    return `${this.baseUrl}/circuits`;
  }

  getConstructors(year: number, offset?: number): string {
    if (offset) {
      return `${this.baseUrl}/${year}/constructors/?offset=${offset}`;
    }

    return `${this.baseUrl}/${year}/constructors`;
  }

  getDrivers(year: number, offset?: number): string {
    if (offset) {
      return `${this.baseUrl}/${year}/drivers/?offset=${offset}`;
    }

    return `${this.baseUrl}/${year}/drivers`;
  }
}
