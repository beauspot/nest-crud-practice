import { Module } from "@nestjs/common";
import { TypeormConfig } from "./typeorm/typeorm.config";

@Module({
  imports: [TypeormConfig],
  controllers: [],
  providers: [],
})
export class AppModule {}
