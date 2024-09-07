import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "../enums/role.enum";



@Schema({timestamps : true})
// we extends the Document class to allow us to direct access the _id key in any of the user document objects
export class User extends Document {

    @Prop()
    name : string

    @Prop({unique : [true , "Duplicated email entered"]})
    email : string

    @Prop({select : false})
    password : string

    @Prop({ type : [{type : String , enum : Role}] , default : [Role.User] }) // this key will be array of strings each string will be one of the Role enum and the default value will be user
    role : Role[]

}


export const UserSchema = SchemaFactory.createForClass(User)


