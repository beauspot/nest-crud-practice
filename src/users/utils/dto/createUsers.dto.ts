import { IsString, Length, IsNotEmpty, IsEmail } from "class-validator";

export class CreateUsersDTO {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
  
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @IsString()
  @Length(4, 4)
  transactionPin: string;

  @IsString()
  @Length(4, 4)
  confirmTransactionPin: string;
}
