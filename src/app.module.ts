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
        host: 'smtp.gmail.com',
        port: 465,
        ignoreTLS: true,
        secure: true, // use 465 for true
        auth: {
          type: 'OAuth2',
          user: 'putrinining89@gmail.com',
          clientId: '465429378024-0bacbkiqblsbhpevaasiv62d7mjno3ss.apps.googleusercontent.com',
          clientSecret: 'YtJs804Z2sC0oqpkJY-SKpCd',
          refreshToken: '1//04FKMbMNsJkaRCgYIARAAGAQSNwF-L9IrPiYIO7bITbEcaj31hTt2MElPVO35IOZB7hN3f9a3tdwCCyROYheRgR0kNv07pOZusl4',
          accessToken: 'ya29.a0AfH6SMCw_rUo8Ltok4idmTueYLTt6UJRdUkRQsjOEHT35SFiVQb3zmpr8qehfNDxk95ZKSZOiC6YOeLyt7l-ssGc3i6jzkw1GYWyhTaM-xw-o8_ImPr7niNM6yt4-d2ujndUJmvPhWY76bb8uQ3cQXz3B2yUSzSXa0PXu5XMjbc'
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
