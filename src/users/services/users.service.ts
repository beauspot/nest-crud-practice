import {
  Injectable,
  InternalServerErrorException,
  ConflictException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as dotenv from "dotenv";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

dotenv.config();

import { User } from "../../typeorm/entities/users.entity";
import { createusersinterface } from "../utils/interface/createusers.interface";

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async fetchUsers() {}

  async createUsers(usersDetails: createusersinterface) {
    try {
      const existingUser = await this.userRepo.findOne({
        where: [
          { email: usersDetails.email },
          { phoneNumber: usersDetails.phoneNumber },
        ],
      });

      if (existingUser)
        throw new ConflictException(
          `User with email ${usersDetails.email} or phone number ${usersDetails.phoneNumber} already exists`
        );

      const hashedPwd = await bcrypt.hash(usersDetails.password, 10);
      const hashedConfirmPwd = await bcrypt.hash(
        usersDetails.confirmPassword,
        10
      );
      const hashedTransactionPin = await bcrypt.hash(
        usersDetails.transactionPin,
        10
      );
      const confirmTransactionPin = await bcrypt.hash(
        usersDetails.confirmTransactionPin,
        10
      );

      const newUsers = this.userRepo.create({
        ...usersDetails,
        password: hashedPwd,
        confirmPassword: hashedConfirmPwd,
        transactionPin: hashedTransactionPin,
        confirmTransactionPin: confirmTransactionPin,
        createdAt: new Date(),
      });

      const savedUsersData = await this.userRepo.save(newUsers);

      const token = this.generateJWT(
        savedUsersData.phoneNumber,
        savedUsersData.id
      );
      return {
        users_detail: {
          fullname: savedUsersData.fullName,
          email: savedUsersData.email,
          phoneno: savedUsersData.phoneNumber,
        },
        token,
      };
    } catch (error) {
      //  console.error("Error creating user:", error);
      throw new InternalServerErrorException(
        `Failed to create user: ${usersDetails.fullName}: ${error.message}`
      );
    }
  }

  private generateJWT(phoneNumber: string, id: string) {
    return jwt.sign(
      {
        phoneNumber,
        id,
      },
      process.env.JSON_TOKEN_KEY,
      {
        expiresIn: 3600000,
      }
    );
  }
}
