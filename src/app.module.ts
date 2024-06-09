import { Module } from "@nestjs/common";
import { TypeormConfig } from "./typeorm/typeorm.config";
import { UsersModule } from './users/users.module';

@Module({
  imports: [TypeormConfig, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
