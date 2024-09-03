import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Category } from "../schemas/book.schema"


export class CreateBookDto {

    @IsString()
    @IsNotEmpty()
    readonly title : string
    
    @IsString()
    @IsNotEmpty()
    readonly description : string
    
    @IsString()
    @IsNotEmpty()
    readonly author : string
    
    @IsNumber()
    @IsNotEmpty()
    readonly price : number

    @IsEnum(Category , {message : "please enter a valid category"})
    @IsNotEmpty()
    readonly category : Category

}