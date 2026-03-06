/* DTO imports */
import { CreateUserDto } from "./dtos/create-us.dto";
import { FindUserDto } from "./dtos/find-us-dto";
import { UpdateUserEmailNameAndRoleDto } from "./dtos/update-us-email-name-and-role.dto";
/* Enum imports */
import { ControllersRoutePathPrefixesEnum } from "src/enums/controllers-route-path-prefixes.enum";
import { UserEntityPropertiesNamesEnum } from "./enums/us-entity-properties-names.enum";
/* Nest.js imports */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
/* Pipe imports */
import { CustomParseUuidPipe } from "src/nestjs-common-non-module/pipes/custom-parse-uuid.pipe";
import { CustomValidationPipe } from "src/nestjs-common-non-module/pipes/custom-validation.pipe";
/* Service imports */
import { UsersService } from "./providers/us.service";
/* UsersController */
@Controller(ControllersRoutePathPrefixesEnum.USER)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  create(
    @Body(CustomValidationPipe)
    createUserDto: CreateUserDto,
  ): Promise<string> {
    return this.usersService.create(createUserDto);
  }

  @Delete(`:${UserEntityPropertiesNamesEnum.ID}`)
  delete(
    @Param(UserEntityPropertiesNamesEnum.ID, CustomParseUuidPipe)
    usId: string,
  ): Promise<string> {
    return this.usersService.delete(usId);
  }

  @Get()
  findAll(): Promise<FindUserDto[]> {
    return this.usersService.findAll();
  }

  @Get(`:${UserEntityPropertiesNamesEnum.ID}`)
  findOneById(
    @Param(UserEntityPropertiesNamesEnum.ID, CustomParseUuidPipe)
    usId: string,
  ): Promise<FindUserDto> {
    return this.usersService.findOneById(usId);
  }

  @Patch(`:${UserEntityPropertiesNamesEnum.ID}`)
  updateEmailNameAndRole(
    @Param(UserEntityPropertiesNamesEnum.ID, CustomParseUuidPipe)
    usId: string,
    @Body(CustomValidationPipe) updateUserDto: UpdateUserEmailNameAndRoleDto,
  ): Promise<string> {
    return this.usersService.updateEmailNameAndRole(usId, updateUserDto);
  }
}
