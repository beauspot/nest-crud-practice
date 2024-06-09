import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { CreateUsersDTO } from "../utils/dto/createUsers.dto";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers() {}

  @Post()
  async createUsers(@Body() createUsersDTO: CreateUsersDTO) {
    try {
      const newUsers = await this.usersService.createUsers(createUsersDTO);
      return newUsers;
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }
}
