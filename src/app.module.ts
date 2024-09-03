import { Module } from '@nestjs/common';

import { BooksModule } from './books/books.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    // config our .env file to access secrets var inside it
    ConfigModule.forRoot({
      envFilePath : ".env" ,
      isGlobal : true
    }),
    // connect to our db
    MongooseModule.forRoot(process.env.MONGO_DB_URL),
    BooksModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})


export class AppModule {}
