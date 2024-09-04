import { BooksService } from './services/books.service';
import { BooksController } from './controllers/books.controller';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports : [
    AuthModule ,
    MongooseModule.forFeature([
      {
        name : Book.name ,
        schema : BookSchema
      }
    ])
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
