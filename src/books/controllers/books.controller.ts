import { AuthGuard } from '@nestjs/passport';
import { CreateBookDto } from '../dtos/CreateBook.dto';
import { UpdateBookDto } from '../dtos/UpdateBook.dto';
import { Book } from '../schemas/book.schema';
import { BooksService } from './../services/books.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import {Query as ExpressQuery , Request} from "express-serve-static-core"
import { User } from 'src/auth/schemas/user.schema';
import { RequestInterface } from 'src/interfaces/Request.interface';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';



@Controller('books')
export class BooksController {

    // inject our service in the controller to access the full logic imp
    constructor(private booksService : BooksService){}


    @Get()
    @Roles(Role.Moderator , Role.Admin) // @Roles decorator attach the required roles to the route , THIS ROUTE REQUIRED : Moderator , Admin as required roles to access it
    @UseGuards(AuthGuard() , RolesGuard) // First, authentication is checked, then authorization
    async getAllBooks (@Query() query : ExpressQuery) : Promise <Book[]> { // ExpressQuery will be the data type of the req query object , more type validation
        return this.booksService.findAllBooks(query)
    }


    @Post()
    @UseGuards(AuthGuard()) // now this route will be protected so only logged users that pass the auth bearer token will access this route
    @UsePipes(new ValidationPipe())
    async createBook(@Body() createBookDto : CreateBookDto , @Req() req : RequestInterface) : Promise <Book> {
        return this.booksService.createBook(createBookDto , req.user) // WE COULD SEND THE req.user key here because the @UseGuards(AuthGuard()) validate our user so we ensure that we have user key in our request
    }


    @Get("/:id")
    async findBookById (@Param("id") id : string) : Promise <Book> {
        return this.booksService.findBookById(id)
    }


    @Patch("/:id")
    async updateBook(@Param("id") id : string , @Body() updateBookDto: UpdateBookDto){
        return this.booksService.updateBook(id , updateBookDto)
    }


    @Delete("/:id")
    async deleteBook(@Param("id") id : string){
        return this.booksService.deleteBook(id) 
    }

}
