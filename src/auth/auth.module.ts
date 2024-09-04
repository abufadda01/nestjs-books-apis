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
          signOptions : {expiresIn : config.get<string | number>("JWT_EXPIRE")}
        }
      }
    }) ,
    MongooseModule.forFeature([{name : User.name , schema : UserSchema}]) ,
  ],
  controllers: [AuthController],
  providers: [AuthService , JwtStrategy] ,
  exports : [JwtStrategy , PassportModule] // exports is array that have modules that i want to use it in other modules when i import this module in other places
})


export class AuthModule {}






// PassportModule: Passport.js integration for NestJS. It allows you to easily implement different authentication strategies.
// JwtModule: Module for JSON Web Token (JWT) integration. It helps in creating and verifying JWT tokens.
// ConfigService: Service provided by @nestjs/config to easily access environment variables and application configuration