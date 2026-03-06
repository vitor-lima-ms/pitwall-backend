/* DTO imports */
import { CreateUserDto } from "../dtos/create-us.dto";
import { FindUserDto } from "../dtos/find-us-dto";
import { UpdateUserEmailNameAndRoleDto } from "../dtos/update-us-email-name-and-role.dto";
/* Entity imports */
import { UserEntity } from "../us.entity";
/* Enum imports */
import { CreateUpdateAndDeleteEnum } from "src/modules/nestjs-common-module/utils/messages/enums/cud.enum";
import { EntitiesPtBrNamesEnum } from "src/enums/entities-ptbr-names.enum";
import { HttpExceptionMessageContextsEnum } from "src/modules/nestjs-common-module/utils/messages/enums/http-exception-message-contexts.enum";
import { UserEntityPropertiesPtBrNamesEnum } from "../enums/us-entity-properties-ptbr-names.enum";
/* Helper imports */
import { UsersHelper } from "./us.helper";
/* Nest.js imports */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
/* Other libraries imports */
import { FindOperator, Repository } from "typeorm";
/* Service imports */
import { MessagesUtilsService } from "src/modules/nestjs-common-module/utils/messages/providers/messages-utils.service";
import { StringUtilsService } from "src/modules/nestjs-common-module/utils/string/providers/string-utils.service";
/* UsersService */
@Injectable()
export class UsersService {
  constructor(
    private messagesUtils: MessagesUtilsService,
    private stringUtils: StringUtilsService,
    private usersHelper: UsersHelper,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<string> {
    const { usConfirmPassword, usEmail, usName, usPassword, usRole } =
      createUserDto;

    const existingUser = await this.findOneByEmail(usEmail);

    if (existingUser) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.USER,
          HttpExceptionMessageContextsEnum.UNIQUE_ERROR,
          [UserEntityPropertiesPtBrNamesEnum.EMAIL],
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    const passwordVerification =
      this.usersHelper.verifyIfConfirmPasswordEqualsToPassword(
        usConfirmPassword,
        usPassword,
      );

    if (!passwordVerification) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.USER,
          HttpExceptionMessageContextsEnum.CONFIRM_PASSWORD_ERROR,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersRepository.save({
      usEmail,
      usName:
        this.stringUtils.trimAndRemoveExtraBlankSpacesBetweenChars(usName),
      usPassword,
      usRole,
    });

    return this.messagesUtils.generateCudSuccessMessage(
      CreateUpdateAndDeleteEnum.CREATE,
      EntitiesPtBrNamesEnum.USER,
    );
  }

  async delete(usId: string): Promise<string> {
    await this.findOneById(usId);

    await this.usersRepository.delete({ usId });

    return this.messagesUtils.generateCudSuccessMessage(
      CreateUpdateAndDeleteEnum.DELETE,
      EntitiesPtBrNamesEnum.USER,
    );
  }

  async findAll(): Promise<FindUserDto[]> {
    const users = await this.usersRepository.find({ order: { usName: "asc" } });

    const findUsersDto = this.usersHelper.generateFindUsersDto(users);

    return findUsersDto;
  }

  async findOneById(usId: string): Promise<FindUserDto> {
    const user = await this.usersRepository.findOneBy({ usId });

    if (!user) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.USER,
          HttpExceptionMessageContextsEnum.NOT_FOUND,
        ),
        HttpStatus.NOT_FOUND,
      );
    }

    const findUserDto = this.usersHelper.generateFindUserDto(user);

    return findUserDto;
  }

  async findOneByEmail(usEmail: string): Promise<FindUserDto | null> {
    const user = await this.usersRepository.findOneBy({ usEmail });

    if (!user) {
      return null;
    }

    const findUserDto = this.usersHelper.generateFindUserDto(user);

    return findUserDto;
  }

  async updateEmailNameAndRole(
    usId: string,
    updateUserDto: UpdateUserEmailNameAndRoleDto,
  ): Promise<string> {
    const { usEmail, usName, usRole } = updateUserDto;

    await this.findOneById(usId);

    const existingUser = await this.usersRepository.findOneBy({
      usEmail,
      usId: new FindOperator("not", usId),
    });

    if (existingUser) {
      throw new HttpException(
        this.messagesUtils.generateHttpExceptionErrorMessage(
          EntitiesPtBrNamesEnum.USER,
          HttpExceptionMessageContextsEnum.UNIQUE_ERROR,
          [UserEntityPropertiesPtBrNamesEnum.EMAIL],
        ),
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersRepository.update(
      { usId },
      {
        usEmail,
        usName:
          this.stringUtils.trimAndRemoveExtraBlankSpacesBetweenChars(usName),
        usRole,
      },
    );

    return this.messagesUtils.generateCudSuccessMessage(
      CreateUpdateAndDeleteEnum.UPDATE,
      EntitiesPtBrNamesEnum.USER,
    );
  }
}
