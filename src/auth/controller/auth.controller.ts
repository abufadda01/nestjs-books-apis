import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';
import { User } from '../schemas/user.schema';
import { AuthService } from './../services/auth.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';


@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post("/register")
    @UsePipes(new ValidationPipe())
    async register(@Body() registerDto : RegisterDto) : Promise<{ token: string; newUser: User }> {
        return await this.authService.register(registerDto);
    }

    @Post("/login")
    @UsePipes(new ValidationPipe())
    async login(@Body() loginDto : LoginDto) : Promise<{ token: string; user: User }> {
        return await this.authService.login(loginDto);
    }

}
