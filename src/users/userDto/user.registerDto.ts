import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class UserRegisterDto {
    @IsNotEmpty()
    username: string
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    @MinLength(8)
    password: string
    @IsNotEmpty()
    name: string
}