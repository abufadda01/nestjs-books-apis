import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs";
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../dtos/Register.dto';
import { LoginDto } from '../dtos/Login.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name) private userModel: Model<User>, 
        private jwtService: JwtService
    ) {}


    async register(registerDto: RegisterDto): Promise<{ token: string; newUser: User }> {

        const { name, email, password } = registerDto;

        const isUserExist = await this.userModel.findOne({email}).select("+password")

        if(isUserExist){
            throw new HttpException("user already exist" , 400)
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new this.userModel({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        const token = this.jwtService.sign({ id: newUser._id });

        newUser.password = undefined

        return { token, newUser };
    }



    async login(loginDto: LoginDto): Promise<{ token: string; user: User }> {

        const { email, password } = loginDto;

        const user = await this.userModel.findOne({email}).select("+password")

        if(!user){
            throw new HttpException("Invalid Credentials" , 400)
        }

        const isPasswordMatch = await bcrypt.compare(password , user.password)

        if(!isPasswordMatch){
            throw new HttpException("Invalid Credentials" , 400)
        }

        const token = this.jwtService.sign({ id: user._id })

        user.password = undefined

        return { token, user }

    }


}
