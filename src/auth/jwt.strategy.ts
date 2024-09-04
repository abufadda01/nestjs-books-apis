import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy , ExtractJwt } from "passport-jwt";
import { User } from "./schemas/user.schema";
import { Model } from "mongoose";
import { JwtPayload } from "src/interfaces/JwtPayload.interface";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
    constructor(@InjectModel(User.name) private userModel : Model <User>){
        // super() will call and invoke the parent class constructor (the extended one) , which requires a configuration object
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() , // to extract the bearer token from the authorization header and pass it to the super() , is used to extract the token from the Authorization header in the form of Bearer <token>
            secretOrKey : process.env.JWT_SECRET
        }) 
    }


    async validate(payload : JwtPayload) { // this function will retrun user key in the req object if the user is valid user and logged in and send the authorization header with bearer token

        const {id} = payload

        const user = await this.userModel.findById(id)

        if(!user){
            throw new UnauthorizedException("Not authorized to access this route")
        }

        return user //If a user is found, the method returns the user. This user object is then attached to the request object, making it available in your request handling logic (e.g., in your controllers).

    }

}


// The validate method is a core part of the strategy. It’s automatically called by the framework after the JWT is decoded and verified. The purpose of this method is to validate that the token is associated with an actual user.