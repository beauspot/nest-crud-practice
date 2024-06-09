import {
  Body,
  Controller,
  Get,
  Post,
  HttpException,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import { CreateUsersDTO } from "../utils/dto/createUsers.dto";
import { LoginUserDTO } from "../utils/dto/login_user.dto";
import { UsersService } from "../services/users.service";

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  async getUsers() {
    try {
      const users = await this.usersService.fetchUsers();
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Post("signup")
  async createUsers(@Body() createUsersDTO: CreateUsersDTO) {
    try {
      const newUsers = await this.usersService.createUsers(createUsersDTO);
      return newUsers;
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @Post("login")
  @HttpCode(200)
  async LoginUser(@Body() loginUserPayload: LoginUserDTO) {
    try {
      const user = await this.usersService.loginUser(loginUserPayload);
      return user;
    } catch (error) {}
  }
}
