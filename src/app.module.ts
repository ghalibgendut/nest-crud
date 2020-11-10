import { Module } from '@nestjs/common';
import { BookModule } from "./books/books.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';

@Module({
  imports: [BookModule, MongooseModule.forRoot('mongodb://localhost:27017/books_db'), UsersModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
