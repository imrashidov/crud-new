import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}
