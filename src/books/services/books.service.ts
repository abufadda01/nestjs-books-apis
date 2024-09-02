import { UpdateBookDto } from './../dtos/UpdateBook.dto';
import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import mongoose, { Model } from 'mongoose';
import { CreateBookDto } from '../dtos/CreateBook.dto';
 

@Injectable() 
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel : Model <Book>){}


    async findAllBooks() : Promise <Book[]>{
        const books = this.bookModel.find()
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
