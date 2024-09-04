import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";



@Schema({timestamps : true})
// we extends the Document class to allow us to direct access the _id key in any of the user document objects
export class User extends Document {

    @Prop()
    name : string

    @Prop({unique : [true , "Duplicated email entered"]})
    email : string

    @Prop({select : false})
    password : string

}


export const UserSchema = SchemaFactory.createForClass(User)


