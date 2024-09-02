import { UpdateBookDto } from './../dtos/UpdateBook.dto';
import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBookDto } from '../dtos/CreateBook.dto';
import {Query as ExpressQuery} from "express-serve-static-core"



@Injectable() 
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel : Model <Book>){}


    // query parameter will be an object that have all req qureies keys&values that came from the controller
    async findAllBooks(query : ExpressQuery) : Promise <Book[]>{
        
        const limit = 10
        const page = Number(query.page) || 1
        const skip = (page - 1) * limit

        // get the qurey object as parameter from the controller then check if i have keyword key inside it make the filter obj contains title key from the key_from_db and regex operator else we dont have it make it empty
        const filterObj = query.keyword ? {title : {$regex : query.keyword , $options : "i"}} : {}

        const books = this.bookModel.find({...filterObj}).skip(skip).limit(limit)

        return books
    }



    async createBook(createBookDto : CreateBookDto) : Promise <Book> {
        const newBook = new this.bookModel(createBookDto)
        await newBook.save()
        return newBook
    }



    async findBookById(id : string) : Promise <Book>{
        
        const foundBook = await this.bookModel.findById(id)
        
        if(!foundBook){
            throw new NotFoundException(`Book with this ${id} not found`)
        } 

        return foundBook
         
    }



    async updateBook(id : string , updateBookDto : UpdateBookDto){

        const isValidId = mongoose.Types.ObjectId.isValid(id)

        if(!isValidId){
            throw new InternalServerErrorException(`invalid ${id} format`)
        }
        
        const foundBook = await this.bookModel.findById(id)
        
        if(!foundBook){
            throw new NotFoundException(`Book with this ${id} not found`)
        }
        
        const updatedBook = await this.bookModel.findByIdAndUpdate(id , updateBookDto , {new : true , runValidators : true})

        return updatedBook
    }



    async deleteBook(id : string){
        
        const isValidId = mongoose.Types.ObjectId.isValid(id)

        if(!isValidId){
            throw new InternalServerErrorException(`invalid ${id} format`)
        }
        
        const foundBook = await this.bookModel.findById(id)
        
        if(!foundBook){
            throw new NotFoundException(`Book with this ${id} not found`)
        }

        await this.bookModel.findByIdAndDelete(id)

        return {msg : "book deleted successfully"}

    }

}
