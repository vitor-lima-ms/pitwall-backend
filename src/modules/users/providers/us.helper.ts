/* DTO imports */
import { FindUserDto } from "../dtos/find-us-dto";
/* Entity imports */
import { UserEntity } from "../us.entity";
/* Nest.js imports */
import { Injectable } from "@nestjs/common";
/* UsersHelper */
@Injectable()
export class UsersHelper {
  generateFindUserDto(user: UserEntity): FindUserDto {
    const { usEmail, usId, usName, usRole } = user;

    const findUserDto = new FindUserDto(usEmail, usId, usName, usRole);

    return findUserDto;
  }

  generateFindUsersDto(users: UserEntity[]): FindUserDto[] {
    const findUsersDto: FindUserDto[] = users.map((user) =>
      this.generateFindUserDto(user),
    );

    return findUsersDto;
  }

  verifyIfConfirmPasswordEqualsToPassword(
    confirmPassword: string,
    password: string,
  ): boolean {
    if (confirmPassword === password) {
      return true;
    }

    return false;
  }
}
