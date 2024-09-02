import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";


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

    @Prop()
    category : Category

}



export const BookSchema = SchemaFactory.createForClass(Book)