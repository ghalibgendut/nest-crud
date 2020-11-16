import { IsNotEmpty } from "class-validator";

export class AddBooksDto {
    @IsNotEmpty()
    title: string

    @IsNotEmpty()
    description: string
    
    @IsNotEmpty()
    price: number
}