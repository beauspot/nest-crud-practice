import { IsNotEmpty, IsString } from "class-validator";

export class LoginUserDTO {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
