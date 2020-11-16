import { IsNotEmpty } from "class-validator";

export class UpdateBookDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string

    @IsNotEmpty()
    price: number
}