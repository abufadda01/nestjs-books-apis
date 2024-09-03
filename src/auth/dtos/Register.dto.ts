import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto {

    @IsString()
    @IsNotEmpty()
    readonly name : string

    @IsNotEmpty()
    @IsEmail({} , {message : "please enter a valid email strcture"})
    readonly email : string

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    readonly password : string

}