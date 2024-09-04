import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(@InjectModel(User.name) private userModel : Model <User>){
        // super() will call and invoke the parent class constructor (the extended one)
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() , // to extract the bearer token from the authorization header and pass it to the super()
            secretOrKey : process.env.JWT_SECRET
        }) 
    }


    async validate(payload) { // this function will retrun user key in the req object if the user is valid user and looged in and send the authorization header with bearer token

        const {id} = payload

        const user = await this.userModel.findById(id)

        if(!user){
            throw new UnauthorizedException("Not authorized to access this route")
        }

        return user

    }

}