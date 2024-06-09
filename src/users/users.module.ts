import { Module } from "@nestjs/common";
import { UsersController } from "./controllers/users.controller";
import { User } from "../typeorm/entities/users.entity";
import { UsersService } from "./services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
