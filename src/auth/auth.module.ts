import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from '../users/users.module';
import { forwardRef } from "@nestjs/common";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({secret: "thisIsASecret"}), 
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
