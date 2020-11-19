import { Module } from '@nestjs/common';
import { BookModule } from "./books/books.module";
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
// import { MailService } from './mail/mail.service';

@Module({
  imports: [
    BookModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/books_db'), 
    UsersModule, 
    AuthModule,
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        port: 2020,
        ignoreTLS: true,
        secure: false,
        auth: {
          user: 'putrinining89@gmail.com',
          pass: 'Password@123',
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: false
        }
      }
    }),
  ],
  // providers: [MailService],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
