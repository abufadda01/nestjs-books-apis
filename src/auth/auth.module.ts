import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AuthService } from './services/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';


@Module({
  imports : [
    PassportModule.register({defaultStrategy : "jwt"}), // register our passport module in the auth module and its default behavior will be jwt , Registers the Passport module with a specific configuration  , Sets the default authentication strategy to JWT (JSON Web Tokens). This means that by default, Passport will use the JWT strategy for all authentication requests
    JwtModule.registerAsync({ // register our jwt module in the auth module , JwtModule: A module that helps in creating and verifying JWTs. , registerAsync: This method allows you to register the JWT module asynchronously. This is useful when you need to fetch configuration settings dynamically, for example, from environment variables.
      inject : [ConfigService] , // to could access the env var and get them we inject the configService , is used to access environment variables and configuration settings.
      useFactory : (config : ConfigService) => { // A factory function that returns the configuration object for the JWT module
        return {
          secret : config.get<string>("JWT_SECRET") ,
          signOptions : {
            expiresIn : config.get<string | number>("JWT_EXPIRE")
          }
        }
      }
    }) ,
    MongooseModule.forFeature([{name : User.name , schema : UserSchema}]) ,
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy] , // i add JwtStrategy in the providers to could use in any related field and inject it
  exports : [JwtStrategy , PassportModule] // exports is array that have modules that i want to use it in other modules when i import this module in other places
})


export class AuthModule {}






// PassportModule: Passport.js integration for NestJS. It allows you to easily implement different authentication strategies.
// JwtModule: Module for JSON Web Token (JWT) integration. It helps in creating and verifying JWT tokens.
// ConfigService: Service provided by @nestjs/config to easily access environment variables and application configuration






// first step register our PassportModule , JwtModule in our module , second step we define new instance (private jwtService: JwtService) in our serivce to create our token and our payload object
// third step we define our jwtStrategy file to extract the Bearer token from the auth header and verify it by the validate() function to add the user key in our req object
// we add our JwtStrategy in the providers[] , exports[] array in our module class  , and add the PassportModule in our exports[] array
// then we can use the built in AuthGuard() , @UseGuards(AuthGuard()) in any of our other modules by import the AuthModule class in other module imports[] array that we want to use this authentication logic inside it , then we can use the AuthGuard() as a guard to protect our route methods and not access it until the user is logged in and send the bearer token in the auth header
