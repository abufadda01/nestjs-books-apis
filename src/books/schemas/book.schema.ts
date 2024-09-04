import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


// ENUM WILL BE A SET OF CONSTANS AND A DATA TYPE ALSO
export enum Category {
    ADVENTURE = "Adventure" ,
    CLASSICS = "Classics" ,
    CRIME = "Crime" ,
    FANTASY = "Fantasy"
}



@Schema({timestamps : true})
export class Book {

    @Prop()
    title : string
    
    @Prop()
    description : string
    
    @Prop()
    author : string
    
    @Prop()
    price : string

    @Prop({enum : Category})
    category : Category

    @Prop({type : mongoose.Schema.Types.ObjectId , ref : "users"})
    user : User

}



export const BookSchema = SchemaFactory.createForClass(Book)