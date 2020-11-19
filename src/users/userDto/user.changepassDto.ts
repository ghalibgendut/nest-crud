import { IsNotEmpty } from "class-validator";


export class UserChangePassDto {
    @IsNotEmpty()
    oldPassword: string

    @IsNotEmpty()
    newPassword: string

    @IsNotEmpty()
    confirmPassword: string
}