/* Enum imports */
import { RolesEnum } from "src/nestjs-common-non-module/enums/roles.enum";
/* FindUserDto */
export class FindUserDto {
  usEmail: string;
  usId: string;
  usName: string;
  usRole: RolesEnum;

  constructor(
    usEmail: string,
    usId: string,
    usName: string,
    usRole: RolesEnum,
  ) {
    this.usEmail = usEmail;
    this.usId = usId;
    this.usName = usName;
    this.usRole = usRole;
  }
}
