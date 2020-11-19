import { IsNotEmpty} from "class-validator";

export class UserUpdateDTO {
    @IsNotEmpty()
    username: string

    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    name: string
}